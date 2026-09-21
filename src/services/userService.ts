import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string | null;
  createdAt: unknown;
  lastLoginAt: unknown;
  isBlocked: boolean;
}

export async function fetchAllUsers(): Promise<UserData[]> {
  const snapshot = await getDocs(collection(db, 'users'));
  const users = snapshot.docs.map((userDoc) => ({
    uid: userDoc.id,
    ...userDoc.data(),
  })) as UserData[];
  return users.sort((first, second) => {
    const firstDate = getTimestamp(first.createdAt);
    const secondDate = getTimestamp(second.createdAt);
    return secondDate - firstDate;
  });
}

function getTimestamp(value: unknown): number {
  if (!value) return 0;
  if (typeof value === 'object' && value !== null && 'toMillis' in value) {
    return (value as { toMillis: () => number }).toMillis();
  }
  const timestamp = new Date(value as string | number).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export async function updateUserBlockStatus(uid: string, isBlocked: boolean): Promise<void> {
  await updateDoc(doc(db, 'users', uid), {
    isBlocked,
  });
}
