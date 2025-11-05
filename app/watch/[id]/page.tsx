import { notFound, redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

import { auth } from '@/lib/auth';

import { postComment } from './actions';

type WatchParams = {
	params: Promise<{ id: string }>,
};

export default async function Watch({ params }: WatchParams) {
	const { id } = await params;

	const { rows: [video] } = await sql`
		select *
		from videos
		where id = ${id};
	`;

	const { rows: comments } = await sql`
		select *
		from comments
		join video_comments
			on comments.id = video_comments.id
		where video_comments.video_id = ${id};
	`

	async function handlePostComment(formData: FormData) {
		'use server';

		const session = await auth();

		if (!session) redirect('/sign-in');

		await postComment(formData, video.id);
	}

	if (!video) notFound();

	return (
		<main>
			<section id="player">
				<h2>{video.title}</h2>
				<h3>Description</h3>
				<p>{video.description}</p>

				<video src={video.url} controls></video>
			</section>

			<section id="comments">
				<form action={handlePostComment}>
					<label htmlFor="body">Comment</label>
					<input type="text" name="body" id="body" />

					<input type="submit" value="Submit" />
				</form>

				<ul>
					{comments.map((comment) => (
						<li key={comment.id}>
							<time dateTime={comment.created_at.toLocaleDateString()}>{comment.created_at.toLocaleDateString()}</time>
							<p>{comment.body}</p>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
