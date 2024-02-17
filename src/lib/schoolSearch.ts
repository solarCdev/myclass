import { doc, getDoc, query, type DocumentData, DocumentReference } from 'firebase/firestore';
import { db } from './fbase.client';

// export type useSearch = (school: string, grade: string, ban: string) => Object;

export const useSearch = async (school = 'school', grade = '1', ban = '1') => {
	const schoolRef: DocumentReference = doc(db, 'school', school, grade, ban);
	const data: DocumentData | undefined = (await getDoc(schoolRef)).data();
	if (data) {
		return data;
	} else {
		return [];
	}
};
