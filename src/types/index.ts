export interface FurnitureItem {
  id: string;
  name: string;
  emoji: string;
  imageUrl?: string;
  x: number;
  y: number;
  rotation: number;
  scale?: number;
}

export interface Design {
  id: string;
  name: string;
  room: string;
  style: string;
  edited: string;
  img: string;
  userId?: string;
  userEmail?: string | null;
  userName?: string | null;
  roomType?: string;
  wall?: string;
  previewImageUrl?: string;
  previewProvider?: 'demo' | 'ai';
  createdAt?: unknown;
  updatedAt?: unknown;
  wallColor?: string;
  floor?: string;
  brightness?: number;
  warmth?: number;
  ambient?: boolean;
  furniture?: FurnitureItem[];
}
