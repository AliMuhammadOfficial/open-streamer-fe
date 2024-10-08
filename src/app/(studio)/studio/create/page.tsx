import CreatePage from "@/components/studio/CreatePage";


export default function StudioCreatePage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Create New Stream {id}</h1>
      <CreatePage />
    </div>
  );
}
