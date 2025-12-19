export default async function Home() {
  // const response = await fetch("http://localhost:3000/api/timer", {
  //   // cache:"force-cache"
  //   cache: "no-cache" // default
  // })
  // const result = await response.json();

  // REVALIDATE
  // const response = await fetch("http://localhost:3000/api/timer", {
  //   next: {
  //     revalidate: 10, // cache for 10sec, after that fetch fresh data
  //   },
  // });
  // const result = await response.json();

  const [fresh, cached, revalidated] = await Promise.all([
    // Always fresh
    fetch("http://localhost:3000/api/timer/utc", {
      cache: "no-store", // or no-cache
    }).then((res) => res.json()),

    // Permanently cache
    fetch("http://localhost:3000/api/timer/iso", {
      cache: "force-cache",
    }).then((res) => res.json()),

    // Revalidate
    fetch("http://localhost:3000/api/timer/local", {
      next: {
        revalidate: 5,
      },
    }).then((res) => res.json()),
  ]);

  return (
    <div className="p-4">
      <h1>Timer Comparison</h1>

      <div style={{ border: "1px solid red", padding: "10px", margin: "10px" }}>
        <h3>Cached Timer (no-store)</h3>
        <p>Time: {fresh?.time}</p>
        <p>Request ID: {fresh?.requestId}</p>
      </div>

      <div
        style={{ border: "1px solid blue", padding: "10px", margin: "10px" }}
      >
        <h3>Cached Timer (force-cache)</h3>
        <p>Time: {cached?.time}</p>
        <p>Request ID: {cached?.requestId}</p>
      </div>

      <div
        style={{ border: "1px solid green", padding: "10px", margin: "10px" }}
      >
        <h3>Cached Timer (5-second Revalidate)</h3>
        <p>Time: {revalidated?.time}</p>
        <p>Request ID: {revalidated?.requestId}</p>
      </div>
    </div>
  );
}
