import { browser } from '$app/environment';
import { auth, initializeFirebase } from '$lib/fbase.client';
import { onAuthStateChanged } from 'firebase/auth';

export const load = async () => {
	if (browser) {
		try {
			initializeFirebase();
		} catch (err) {
			console.log(err);
		}
	}
};
