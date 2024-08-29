export default function StudioPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <h1>Studio</h1>
      <p>Studio Page {id}</p>
    </div>
  );
}
