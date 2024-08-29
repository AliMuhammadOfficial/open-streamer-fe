export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  return (
    <div>
      <h1>Category</h1>
      <p>Category: {category}</p>
    </div>
  );
}
