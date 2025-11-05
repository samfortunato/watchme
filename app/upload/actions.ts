'use server';

import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';
import { sql } from '@vercel/postgres';

export async function uploadVideo(formData: FormData) {
	const file = formData.get('video') as File;
	const title = formData.get('title') as string;
	const description = formData.get('description') as string;

	const blob = await put(file.name, file, {
		access: 'public',
		contentType: file.type,
	});

	await sql`
		insert into videos (url, title, description)
		values (${blob.url}, ${title}, ${description});
	`;

	revalidatePath('/');
}
