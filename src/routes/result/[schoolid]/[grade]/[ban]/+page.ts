import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (params.schoolid && params.grade && params.ban) {
		return params;
	}

	error(404, 'Not found');
}
