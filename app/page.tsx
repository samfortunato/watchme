export default function Home() {
  return (
    <main>
      <article className="video flex flex-col gap-1">
        <h2 className="order-2 font-bold">Test</h2>

        <h3 className="order-3 text-sm">Description</h3>
        <p className='order-4 text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis veniam eligendi est eius cupiditate illum nulla, atque sit eveniet. Ab delectus eveniet exercitationem corrupti assumenda, neque voluptates fugit consequatur officia!</p>

        <video className="order-first" src="./test.mp4" controls></video>
      </article>
    </main>
  );
}
