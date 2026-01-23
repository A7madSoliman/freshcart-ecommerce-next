export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-28">{children}</div>;
}
