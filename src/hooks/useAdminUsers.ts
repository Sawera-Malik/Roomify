import { useState, useEffect, useCallback } from 'react';
import { fetchAllUsers, updateUserBlockStatus, type UserData } from '../services/userService';

export function useAdminUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await fetchAllUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      console.error('Failed to fetch users', err);
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const toggleBlockStatus = async (uid: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      await updateUserBlockStatus(uid, newStatus);
      setUsers((prev) => prev.map(u => u.uid === uid ? { ...u, isBlocked: newStatus } : u));
    } catch (err) {
      console.error('Failed to update block status', err);
      alert('Error updating block status. Check console.');
    }
  };

  return {
    users,
    loading,
    error,
    toggleBlockStatus,
    refreshUsers: loadUsers,
  };
}
