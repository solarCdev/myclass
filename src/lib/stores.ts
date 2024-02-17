import { writable } from 'svelte/store';

export type SignUpInfo = {
	email: string;
	password: string;
	passwordRe: string;
	name: string;
	gender: string;
	school: string;
	grade?: number;
	ban?: number;
};

export let signUpInfo = writable<SignUpInfo>({
	email: '',
	password: '',
	passwordRe: '',
	name: '',
	gender: 'male',
	school: '',
	grade: undefined,
	ban: undefined
});
