'use server';

import { redirect } from 'next/navigation';
import { put } from '@vercel/blob';
import { sql } from '@vercel/postgres';

export async function uploadVideo(formData: FormData) {
	const file = formData.get('video') as File;
	const title = formData.get('title') as string;
	const description = formData.get('description') as string;

	const blob = await put(file.name, file, {
		access: 'public',
		contentType: file.type,
		addRandomSuffix: true,
	});

	const { rows: [{ id }] } = await sql`
		insert into videos (url, title, description)
		values (${blob.url}, ${title}, ${description})
		returning id;
	`;

	redirect(`watch/${id}`);
}
