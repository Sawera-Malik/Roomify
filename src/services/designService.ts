import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import type { User } from 'firebase/auth';
import { auth, db, storage } from '../firebase/config';
import { generateRoomPreview } from './imageGenerationService';

import type { Design } from '../types';

const designsCollection = collection(db, 'designs');

function removeUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => removeUndefined(item)).filter((item) => item !== undefined) as T;
  }

  if (value && typeof value === 'object') {
    const cleaned = Object.entries(value as Record<string, unknown>).reduce<Record<string, unknown>>((result, [key, item]) => {
      if (item !== undefined) result[key] = removeUndefined(item);
      return result;
    }, {});
    return cleaned as T;
  }

  return value;
}

export async function loadCurrentUserDesigns(userId: string): Promise<Design[]> {
  const snapshot = await getDocs(query(designsCollection, where('userId', '==', userId)));
  return snapshot.docs.map((designDoc) => ({
    ...(designDoc.data() as Omit<Design, 'id'>),
    id: designDoc.id,
  }));
}

export async function saveCompleteDesign(design: Design): Promise<Design> {
  const user = auth.currentUser;
  if (!user) throw new Error('Please sign in before saving your design.');

  const designRef = design.id && design.id !== 'preview'
    ? doc(designsCollection, design.id)
    : doc(designsCollection);
  const designId = designRef.id;
  let previewImageUrl = '';

  if (import.meta.env.VITE_STORAGE_UPLOADS !== 'false') {
    const previewBlob = await generateRoomPreview(design);
    const previewRef = ref(storage, `designs/${user.uid}/${designId}/preview.jpg`);
    try {
      await uploadBytes(previewRef, previewBlob, { contentType: 'image/jpeg' });
      previewImageUrl = await getDownloadURL(previewRef);
    } catch (error) {
      console.error('Firebase Storage upload failed', error);
      throw new Error('Firebase Storage is not ready. Enable Storage and apply cors.json, or set VITE_STORAGE_UPLOADS=false for local development.', { cause: error });
    }
  }

  const savedDesign = removeUndefined({
    ...design,
    id: designId,
    userId: user.uid,
    userEmail: user.email,
    userName: user.displayName,
    roomType: design.roomType ?? design.room,
    wall: design.wall ?? design.wallColor,
    previewImageUrl,
    previewProvider: 'demo' as const,
    updatedAt: serverTimestamp(),
  });

  if (design.id && design.id !== 'preview') {
    await updateDoc(designRef, savedDesign);
  } else {
    await setDoc(designRef, { ...savedDesign, createdAt: serverTimestamp() });
  }

  return savedDesign as Design;
}

export async function deleteCurrentUserDesign(designId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error('Please sign in before deleting a design.');
  await deleteDoc(doc(designsCollection, designId));
}

export function getAuthenticatedUser(): User | null {
  return auth.currentUser;
}
