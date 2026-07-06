import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogsData } from './blogData'

export default function Blogs() {
  const blogsPerPage = 4
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const sentinelRef = useRef(null)

  const visibleBlogs = useMemo(
    () => blogsData.slice(0, page * blogsPerPage),
    [page]
  )

  const hasMore = visibleBlogs.length < blogsData.length

  useEffect(() => {
    if (!sentinelRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasMore && !isLoading) {
          setIsLoading(true)
          setTimeout(() => {
            setPage((currentPage) => currentPage + 1)
            setIsLoading(false)
          }, 250)
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.2,
      }
    )

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasMore, isLoading])

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Latest Blogs
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Explore our latest articles, tutorials, and developer insights.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleBlogs.map((blog) => (
            <article
              key={blog.id}
              className="rounded-3xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="inline-block rounded-full bg-slate-100 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-700">
                {blog.category}
              </span>

              <h2 className="mt-3 text-lg font-semibold text-slate-900">
                {blog.title}
              </h2>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>{blog.author}</span>
                <span className="mx-1">•</span>
                <span>{blog.date}</span>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {blog.excerpt}
              </p>

              <Link
                to={`/blogs/${blog.id}`}
                className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-white transition hover:bg-slate-700"
              >
                Read More
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-sm text-slate-600">
          {isLoading && <span>Loading more blogs…</span>}
          {!hasMore && <span>No more blogs to load.</span>}
          <div ref={sentinelRef} className="h-2 w-full" />
        </div>
      </div>
    </div>
  )
}
