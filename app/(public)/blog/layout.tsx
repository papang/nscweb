export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-3">
        {/* Main content area */}
        {children}
      </div>
      <div className="md:col-span-1">
        {/* Blog sidebar */}
        <div className="bg-slate-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
          <ul className="space-y-2">
            <li><a href="/blog/getting-started" className="text-blue-600 hover:underline">Getting Started with Next.js</a></li>
            <li><a href="/blog/server-components" className="text-blue-600 hover:underline">Understanding Server Components</a></li>
            <li><a href="/blog/data-fetching" className="text-blue-600 hover:underline">Data Fetching Strategies</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}