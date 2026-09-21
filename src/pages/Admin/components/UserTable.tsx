import { useMemo, useState } from 'react';
import type { AdminUser } from './adminTypes';

interface UserTableProps {
  users: AdminUser[];
  onSelectUser: (user: AdminUser) => void;
  onToggleBlock: (user: AdminUser) => void;
}

const planColors: Record<string, string> = {
  Pro: 'bg-[#B08D57]/15 text-[#B08D57]',
  Free: 'bg-[#E8E1D5] dark:bg-[#2E2B27] text-[#777777]',
};

const statusColors: Record<AdminUser['status'], string> = {
  online: 'bg-green-400',
  away: 'bg-yellow-400',
  offline: 'bg-gray-300 dark:bg-gray-600',
};

export default function UserTable({ users, onSelectUser, onToggleBlock }: UserTableProps) {
  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'designs' | 'joined'>('name');

  const filteredUsers = useMemo(() => users
    .filter((user) => {
      const query = search.toLowerCase();
      return (!query || user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query) || user.role.toLowerCase().includes(query))
        && (filterPlan === 'All' || user.plan === filterPlan)
        && (filterStatus === 'All' || user.status === filterStatus);
    })
    .sort((first, second) => {
      if (sortBy === 'designs') return second.designs - first.designs;
      if (sortBy === 'joined') return second.joined.localeCompare(first.joined);
      return first.name.localeCompare(second.name);
    }), [filterPlan, filterStatus, search, sortBy, users]);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search users by name, email or role..." className="flex-1 min-w-[200px] px-4 py-2.5 bg-white dark:bg-[#252220] border border-[#E0D9CE] dark:border-[#3A3530] rounded-xl text-sm text-[#252525] dark:text-[#F7F5F0] focus:outline-none focus:border-[#B08D57]" />
        <select value={filterPlan} onChange={(event) => setFilterPlan(event.target.value)} className="px-3 py-2.5 bg-white dark:bg-[#252220] border border-[#E0D9CE] dark:border-[#3A3530] rounded-xl text-sm text-[#252525] dark:text-[#F7F5F0]">
          {['All', 'Pro', 'Free'].map((option) => <option key={option} value={option}>Plan: {option}</option>)}
        </select>
        <select value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)} className="px-3 py-2.5 bg-white dark:bg-[#252220] border border-[#E0D9CE] dark:border-[#3A3530] rounded-xl text-sm text-[#252525] dark:text-[#F7F5F0]">
          {['All', 'online', 'away', 'offline'].map((option) => <option key={option} value={option}>Status: {option}</option>)}
        </select>
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value as typeof sortBy)} className="px-3 py-2.5 bg-white dark:bg-[#252220] border border-[#E0D9CE] dark:border-[#3A3530] rounded-xl text-sm text-[#252525] dark:text-[#F7F5F0]">
          <option value="name">Sort: Name</option>
          <option value="designs">Sort: Designs</option>
          <option value="joined">Sort: Joined</option>
        </select>
      </div>

      <div className="bg-white dark:bg-[#252220] rounded-2xl border border-[#E0D9CE] dark:border-[#3A3530] overflow-hidden">
        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-[#E0D9CE] dark:border-[#3A3530] bg-[#F7F5F0] dark:bg-[#1F1C18]">
          {['User', 'Contact', 'Plan', 'Designs', 'Actions'].map((heading) => <p key={heading} className="text-[10px] font-semibold uppercase tracking-wider text-[#777777]">{heading}</p>)}
        </div>
        {filteredUsers.length === 0 ? <div className="py-16 text-center text-sm text-[#777777]">No users found.</div> : <div className="divide-y divide-[#E0D9CE] dark:divide-[#3A3530]">
          {filteredUsers.map((user) => <div key={user.uid} className="grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] gap-4 items-center px-5 py-3.5 hover:bg-[#F7F5F0] dark:hover:bg-[#1F1C18] group">
            <div className="flex items-center gap-3 min-w-0"><div className="relative flex-shrink-0">{user.img ? <img src={user.img} alt={user.name} className="w-9 h-9 rounded-full object-cover" /> : <div className="w-9 h-9 rounded-full bg-[#E8E1D5] flex items-center justify-center text-xs font-semibold text-[#777777]">{user.name.slice(0, 2).toUpperCase()}</div>}<span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#252220] ${statusColors[user.status]}`} /></div><div className="min-w-0"><p className="text-sm font-semibold text-[#252525] dark:text-[#F7F5F0] truncate">{user.name}</p><p className="text-xs text-[#777777] truncate">{user.role} · {user.country}</p></div></div>
            <div className="min-w-0"><p className="text-xs text-[#252525] dark:text-[#F7F5F0] truncate">{user.email}</p><p className="text-[10px] text-[#999390] mt-0.5">{user.lastActive}</p></div>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${planColors[user.plan] || planColors.Free}`}>{user.plan === 'Pro' && '⭐ '}{user.plan}</span>
            <div className="flex items-center gap-2"><div className="w-16 h-1.5 bg-[#E8E1D5] dark:bg-[#2E2B27] rounded-full overflow-hidden"><div className="h-full bg-[#B08D57]" style={{ width: `${Math.min((user.designs / 70) * 100, 100)}%` }} /></div><span className="text-xs font-semibold text-[#252525] dark:text-[#F7F5F0]">{user.designs}</span></div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100"><button onClick={() => onSelectUser(user)} className="px-2.5 py-1.5 text-xs font-medium text-[#B08D57] bg-[#B08D57]/10 rounded-lg">View</button><button onClick={() => onToggleBlock(user)} className="px-2.5 py-1.5 text-xs font-medium text-[#777777] hover:text-red-500 rounded-lg">{user.isBlocked ? 'Unblock' : 'Ban'}</button></div>
          </div>)}
        </div>}
      </div>
      <p className="text-xs text-[#777777] mt-4">Showing {filteredUsers.length} of {users.length} users</p>
    </div>
  );
}