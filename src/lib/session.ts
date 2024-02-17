import { writable, type Writable } from 'svelte/store';

export type SNS = {
	X: string | null;
	call: string | null;
	etc: string | null;
	instargram: string | null;
};

export type User = {
	ban?: string | null;
	emoji?: string | null;
	gender?: string | null;
	grade?: string | null;
	name?: string | null;
	school?: string | null;
	profileInfo?: SNS | null;
};

export type SessionState = {
	user: User | null;
};

export const session = <Writable<SessionState>>writable();
