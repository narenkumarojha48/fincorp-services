import { Link, useParams } from 'react-router-dom'
import { blogsData } from './blogData'

export default function BlogDetail() {
  const { id } = useParams()

  const blog = blogsData.find((item) => item.id.toString() === id)

  const topics = [
    {
      id: 'introduction',
      title: 'Introduction',
      content:
        'This section explains the introduction and overview of the blog topic in detail.',
    },
    {
      id: 'concepts',
      title: 'Key Concepts',
      content:
        'Here you can describe the main concepts, principles, and important ideas related to the topic.',
    },
    {
      id: 'implementation',
      title: 'Implementation',
      content:
        'This section can contain implementation steps, examples, or practical usage instructions.',
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      content:
        'Mention recommended approaches, optimization tips, and coding best practices here.',
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content:
        'Summarize the blog topic and provide final thoughts or next learning steps.',
    },
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  if (!blog) {
    return (
      <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-lg font-semibold text-slate-900">
          Blog not found.
        </p>

        <Link
          to="/blogs"
          className="mt-4 inline-block rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Back to blogs
        </Link>
      </div>
    )
  }

  return (
    <section className="mt-10 rounded-3xl bg-white p-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
            {blog.category}
          </span>

          <h1 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
            {blog.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            By {blog.author} · {blog.date}
          </p>
        </div>

        <Link
          to="/blogs"
          className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Back to blogs
        </Link>
      </div>

      {/* Layout */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="sticky top-24 h-fit rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Topics
          </h2>

          <div className="space-y-2">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => scrollToSection(topic.id)}
                className="w-full rounded-xl bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                {topic.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Right Content */}
        <div className="space-y-10">
          {topics.map((topic) => (
            <section
              key={topic.id}
              id={topic.id}
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h2 className="text-2xl font-semibold text-slate-900">
                {topic.title}
              </h2>

              <div className="mt-4 space-y-4 text-slate-600">
                <p>{topic.content}</p>

                <p>{blog.body}</p>

                <p>
                  This section belongs to <strong>{topic.title}</strong>.
                  Clicking the sidebar item smoothly scrolls to this content
                  section.
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}