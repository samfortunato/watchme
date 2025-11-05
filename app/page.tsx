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

          <h3>Description</h3>
          <p>{video.description}</p>

          <video src={video.url} controls></video>
        </article>
      ))}
    </main>
  );
}
