import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

import { uploadVideo } from './actions';

export default async function Upload() {
	const session = await auth();

	if (!session) redirect('/sign-in');

	return (
		<main>
			<h2>Upload</h2>

			<form action={uploadVideo}>
				<label htmlFor="video">Video</label>
				<input type="file" name="video" id="video" />

				<label htmlFor="title">Title</label>
				<input type="text" name="title" id="title" />

				<label htmlFor="description">description</label>
				<input type="text" name="description" id="description" />

				<input type="submit" value="Upload" />
			</form>
		</main>
	);
}
