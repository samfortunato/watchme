import Link from 'next/link';
import { sql } from '@vercel/postgres';

export default async function Home() {
  const { rows: videos } = await sql`
    select *
    from videos
    order by created_at desc;
  `;

  return (
    <main>
      {videos.map((video) => (
        <article key={video.id}>
          <h2>{video.title}</h2>

          <Link href={`watch/${video.id}`}>
            <video
              src={video.url}
              muted
              disablePictureInPicture
              disableRemotePlayback
            ></video>
          </Link>
        </article>
      ))}
    </main>
  );
}
