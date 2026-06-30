export default function BlogIndexPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-6">
        {/* Blog post previews */}
        <article className="border-b pb-6">
          <h2 className="text-2xl font-bold mb-2">
            <a href="/blog/getting-started" className="text-blue-600 hover:underline">
              Getting Started with Next.js
            </a>
          </h2>
          <p className="text-slate-600 mb-2">Published on March 15, 2025</p>
          <p>Learn how to set up your first Next.js project and understand the basics of the framework.</p>
        </article>
        <article className="border-b pb-6">
          <h2 className="text-2xl font-bold mb-2">
            <a href="/blog/server-components" className="text-blue-600 hover:underline">
              Understanding Server Components
            </a>
          </h2>
          <p className="text-slate-600 mb-2">Published on March 10, 2025</p>
          <p>Dive deep into React Server Components and how they change the way we build applications.</p>
        </article>
        <article className="border-b pb-6">
          <h2 className="text-2xl font-bold mb-2">
            <a href="/blog/data-fetching" className="text-blue-600 hover:underline">
              Data Fetching Strategies
            </a>
          </h2>
          <p className="text-slate-600 mb-2">Published on March 5, 2025</p>
          <p>Explore different ways to fetch data in Next.js and choose the right approach for your needs.</p>
        </article>
      </div>
    </div>
  );
}