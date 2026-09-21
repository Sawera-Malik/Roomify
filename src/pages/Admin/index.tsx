import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminUsers } from '../../hooks/useAdminUsers';
import AdminStats from './components/AdminStats';
import UserTable from './components/UserTable';
import type { AdminUser } from './components/adminTypes';

type Tab = 'users' | 'activity' | 'analytics';

function formatDate(value: unknown, fallback = 'Unknown') {
  if (!value) return fallback;
  const date = typeof value === 'object' && value !== null && 'toDate' in value
    ? (value as { toDate: () => Date }).toDate()
    : new Date(value as string | number);
  return Number.isNaN(date.getTime()) ? fallback : date.toLocaleDateString();
}

function getStatus(user: { lastLoginAt: unknown; isBlocked: boolean }): AdminUser['status'] {
  if (user.isBlocked || !user.lastLoginAt) return 'offline';
  const lastLogin = typeof user.lastLoginAt === 'object' && user.lastLoginAt !== null && 'toDate' in user.lastLoginAt
    ? (user.lastLoginAt as { toDate: () => Date }).toDate().getTime()
    : new Date(user.lastLoginAt as string | number).getTime();
  const hoursSinceLogin = (Date.now() - lastLogin) / 3_600_000;
  return hoursSinceLogin < 1 ? 'online' : hoursSinceLogin < 24 ? 'away' : 'offline';
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const { users, loading, error, toggleBlockStatus } = useAdminUsers();
  const [activeTab, setActiveTab] = useState<Tab>('users');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const adminUsers = useMemo<AdminUser[]>(() => users.map((user) => ({
    uid: user.uid,
    name: user.displayName || user.email?.split('@')[0] || 'Unnamed user',
    email: user.email || 'No email',
    role: 'User',
    plan: 'Free',
    designs: 0,
    joined: formatDate(user.createdAt),
    lastActive: formatDate(user.lastLoginAt, 'Never'),
    status: getStatus(user),
    country: 'Unknown',
    img: user.photoURL,
    isBlocked: user.isBlocked,
  })), [users]);

  const handleToggleBlock = async (user: AdminUser) => {
    await toggleBlockStatus(user.uid, user.isBlocked);
    if (selectedUser?.uid === user.uid) {
      setSelectedUser({ ...selectedUser, isBlocked: !user.isBlocked });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] dark:bg-[#1A1814] flex">
      <aside className="w-60 flex-shrink-0 bg-[#252525] dark:bg-[#1A1814] border-r border-white/10 hidden lg:flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <p className="text-white font-display font-semibold">Roomify</p>
          <p className="text-white/40 text-[10px] tracking-wider uppercase">Admin Panel</p>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {[
            ['⊞', 'Dashboard', 'analytics'],
            ['👥', 'All Users', 'users'],
            ['📊', 'Activity', 'activity'],
          ].map(([icon, label, tab]) => (
            <button key={label} onClick={() => setActiveTab(tab as Tab)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${activeTab === tab ? 'bg-[#B08D57]/20 text-[#B08D57]' : 'text-white/50 hover:text-white hover:bg-white/10'}`}>
              <span>{icon}</span>{label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={() => navigate('/')} className="w-full text-left px-3 py-2.5 text-sm text-white/50 hover:text-white">← Back to App</button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-[#252220] border-b border-[#E0D9CE] dark:border-[#3A3530] px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-semibold text-[#252525] dark:text-[#F7F5F0]">{activeTab === 'users' ? 'User Management' : activeTab === 'activity' ? 'Activity Feed' : 'Overview'}</h1>
            <p className="text-xs text-[#777777] mt-0.5">{activeTab === 'users' ? `${adminUsers.length} users found` : 'Real-time platform activity'}</p>
          </div>
          <button onClick={() => navigate('/')} className="lg:hidden text-sm text-[#777777]">← App</button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {loading && <div className="py-16 text-center text-sm text-[#777777]">Loading users from Firebase...</div>}
          {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
          {!loading && activeTab === 'analytics' && <div className="space-y-6"><AdminStats users={adminUsers} /><div className="bg-white dark:bg-[#252220] rounded-2xl border border-[#E0D9CE] dark:border-[#3A3530] p-5"><h2 className="font-semibold text-sm text-[#252525] dark:text-[#F7F5F0] mb-2">User data overview</h2><p className="text-sm text-[#777777]">Statistics are calculated from the users currently stored in Firebase.</p></div></div>}
          {!loading && activeTab === 'users' && <UserTable users={adminUsers} onSelectUser={setSelectedUser} onToggleBlock={handleToggleBlock} />}
          {!loading && activeTab === 'activity' && <div className="max-w-3xl bg-white dark:bg-[#252220] rounded-2xl border border-[#E0D9CE] dark:border-[#3A3530] p-5"><h2 className="font-semibold text-sm text-[#252525] dark:text-[#F7F5F0] mb-2">Live Activity Feed</h2><p className="text-sm text-[#777777]">User activity will appear here as activity records are added to Firebase.</p></div>}
        </main>
      </div>

      {selectedUser && <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40" onClick={() => setSelectedUser(null)}>
        <aside className="w-full max-w-sm h-full bg-white dark:bg-[#252220] p-6 overflow-y-auto" onClick={(event) => event.stopPropagation()}>
          <div className="flex items-center justify-between mb-8"><h2 className="font-semibold text-[#252525] dark:text-[#F7F5F0]">User Profile</h2><button onClick={() => setSelectedUser(null)} className="text-[#777777]">✕</button></div>
          <div className="text-center mb-8">{selectedUser.img ? <img src={selectedUser.img} alt={selectedUser.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-3" /> : <div className="w-20 h-20 rounded-2xl bg-[#E8E1D5] flex items-center justify-center mx-auto mb-3 text-xl font-semibold text-[#777777]">{selectedUser.name.slice(0, 2).toUpperCase()}</div>}<h3 className="font-display text-xl font-semibold text-[#252525] dark:text-[#F7F5F0]">{selectedUser.name}</h3><p className="text-sm text-[#777777]">{selectedUser.email}</p></div>
          <div className="space-y-3 mb-8">{[['Joined', selectedUser.joined], ['Last Active', selectedUser.lastActive], ['Status', selectedUser.isBlocked ? 'Blocked' : selectedUser.status]].map(([label, value]) => <div key={label} className="flex justify-between border-b border-[#E0D9CE] dark:border-[#3A3530] py-2.5"><span className="text-xs text-[#777777]">{label}</span><span className="text-xs font-semibold text-[#252525] dark:text-[#F7F5F0]">{value}</span></div>)}</div>
          <button onClick={() => void handleToggleBlock(selectedUser)} className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600">{selectedUser.isBlocked ? 'Unblock User' : 'Block User'}</button>
        </aside>
      </div>}
    </div>
  );
}
