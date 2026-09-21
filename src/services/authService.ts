import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

async function setAuthPersistence(remember: boolean) {
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
}

export async function syncUserToFirestore(user: User) {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email?.split('@')[0] || 'User',
      photoURL: user.photoURL || null,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      isBlocked: false,
    });
  } else {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      lastLoginAt: serverTimestamp(),
      displayName: user.displayName || userSnap.data()?.displayName || user.email?.split('@')[0] || 'User',
      photoURL: user.photoURL || userSnap.data()?.photoURL || null,
    }, { merge: true });
  }
}

export async function registerWithEmail(email: string, password: string, remember: boolean) {
  await setAuthPersistence(remember);
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred;
}

export async function signInWithEmail(email: string, password: string, remember: boolean) {
  await setAuthPersistence(remember);
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle(remember: boolean) {
  await setAuthPersistence(remember);
  const cred = await signInWithPopup(auth, new GoogleAuthProvider());
  return cred;
}

export function subscribeToAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export function clearSession() {
  return signOut(auth);
}