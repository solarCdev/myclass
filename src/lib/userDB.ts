import { DocumentSnapshot, doc, getDoc, type DocumentData } from 'firebase/firestore';
import { db } from './fbase.client';
import type { SessionState, User } from './session';

export const useUser = async (uid: string): Promise<DocumentData | undefined> => {
	const userRef = doc(db, 'user', uid);
	const res = await getDoc(userRef);
	return res.data();
};
