export default function ChatPage({ params }: { params: { id: string } }) {
    const { id } = params;
  return (
    <div>
      <h1>Chat</h1>
      <p>Chat Page {id}</p>
    </div>
  );
}
