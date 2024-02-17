import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (params) {
		return {uid: params.uid};
	}

	error(404, 'Not found');
}
