export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Browse</h1>
      {children}
    </div>
  );
}
