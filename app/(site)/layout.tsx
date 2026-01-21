export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-24">{children}</div>;
}
