import { notFound } from 'next/navigation';
import { sql } from '@vercel/postgres';

type WatchParams = {
	params: Promise<{ id: string }>,
};

export default async function Watch({ params }: WatchParams) {
	const { id } = await params;

	const { rows } = await sql`
		select *
		from videos
		where id = ${id};
	`;

	const video = rows[0];

	if (!video) notFound();

	return (
		<main>
			<h2>{video.title}</h2>
			<h3>Description</h3>
			<p>{video.description}</p>

			<video src={video.url} controls></video>
		</main>
	);
}
