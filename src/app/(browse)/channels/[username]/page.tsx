export default function ChannelPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  return (
    <div>
      <h1>Channel</h1>
      <p>Username: {username}</p>
    </div>
  );
}
