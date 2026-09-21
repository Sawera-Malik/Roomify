import type { AdminUser } from './adminTypes';

interface AdminStatsProps {
  users: AdminUser[];
}

export default function AdminStats({ users }: AdminStatsProps) {
  const proUsers = users.filter((user) => user.plan === 'Pro').length;
  const designs = users.reduce((total, user) => total + user.designs, 0);
  const stats = [
    { label: 'Total Users', value: users.length.toLocaleString(), delta: 'Live', icon: '👥' },
    { label: 'Active Today', value: users.filter((user) => user.status === 'online').length.toLocaleString(), delta: 'Live', icon: '🟢' },
    { label: 'Pro Members', value: proUsers.toLocaleString(), delta: `${users.length ? Math.round((proUsers / users.length) * 100) : 0}%`, icon: '⭐' },
    { label: 'Designs Created', value: designs.toLocaleString(), delta: 'Live', icon: '🛋️' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white dark:bg-[#252220] rounded-2xl p-5 border border-[#E0D9CE] dark:border-[#3A3530]">
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl">{stat.icon}</span>
            <span className="text-xs font-semibold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">{stat.delta}</span>
          </div>
          <p className="font-display text-2xl font-semibold text-[#252525] dark:text-[#F7F5F0]">{stat.value}</p>
          <p className="text-xs text-[#777777] mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}