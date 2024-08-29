export default function StudioAnalyticsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return (
    <div>
      <h1>Analytics</h1>
      <p>Analytics Page {id}</p>
    </div>
  );
}
