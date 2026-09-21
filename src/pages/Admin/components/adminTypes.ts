export interface AdminUser {
  uid: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  designs: number;
  joined: string;
  lastActive: string;
  status: 'online' | 'away' | 'offline';
  country: string;
  img: string | null;
  isBlocked: boolean;
}