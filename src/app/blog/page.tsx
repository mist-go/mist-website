import Link from "next/link";
import { blog } from "@/lib/source";
import { Calendar, ArrowRight } from "lucide-react";

export default function Blog() {
  // Sort posts by date (descending) so the newest is always first
  const posts = [...blog.getPages()].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  return (
    <main className="container max-w-5xl py-12 lg:py-20 mx-auto">
      <div className="flex flex-col items-start gap-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Writing & Insights
        </h1>
        <p className="text-xl text-fd-muted-foreground">
          Thoughts on software, design, and building for the web.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="group relative flex flex-col space-y-3 rounded-2xl border border-fd-border bg-fd-card p-5 transition-all hover:bg-fd-accent/50 hover:shadow-xl"
          >
            {/* Date Tag */}
            <div className="flex items-center gap-2 text-xs font-medium text-fd-muted-foreground">
              <Calendar className="h-3 w-3" />
              {new Date(post.data.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>

            {/* Title & Description */}
            <div className="flex-1">
              <h2 className="text-xl font-bold leading-snug group-hover:text-fd-primary transition-colors">
                {post.data.title}
              </h2>
              <p className="line-clamp-3 text-sm leading-relaxed text-fd-muted-foreground">
                {post.data.description}
              </p>
            </div>

            {/* "Read More" Footer */}
            <div className="flex items-center text-sm font-semibold text-fd-primary">
              Read Article
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
