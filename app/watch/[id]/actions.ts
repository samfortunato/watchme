'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '@vercel/postgres';

export async function postComment(formData: FormData, videoId: string) {
	const body = formData.get('body') as string;

	const { rows: [{ comment_id: commentId }] } = await sql`
		insert into comments (body)
		values (${body})
		returning id as comment_id;
	`;

	await sql`
		insert into video_comments (comment_id, video_id)
		values (${commentId}, ${videoId});
	`;

	revalidatePath(`/watch/${videoId}`);
}
