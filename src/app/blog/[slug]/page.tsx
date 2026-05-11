import { notFound } from "next/navigation";
import Link from "next/link";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { blog } from "@/lib/source";
import { ChevronLeft, Calendar, User, Clock } from "lucide-react";
import { calculateReadingTime } from "@/lib/utils/reading-time";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();

  const text = await page.data.getText("raw");

  const Mdx = page.data.body;

  const readingTime = calculateReadingTime(text);

  return (
    <main className="container max-w-4xl py-10 lg:py-16 mx-auto">
      {/* Navigation & Breadcrumbs */}
      <Link
        href="/blog"
        className="group mb-8 flex items-center text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors"
      >
        <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Link>

      {/* Header Section */}
      <header className="mb-10 space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {page.data.title}
        </h1>
        <p className="text-xl text-fd-muted-foreground leading-relaxed">
          {page.data.description}
        </p>

        <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-fd-muted-foreground border-b border-fd-border pb-8">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="font-medium text-fd-foreground">
              {page.data.author}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={page.data.date.toString()}>
              {new Date(page.data.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readingTime}</span>
          </div>
        </div>
      </header>

      {/* Content Layout */}
      <div className="flex flex-col lg:flex-row gap-12">
        <article className="prose prose-fd min-w-0 flex-1">
          <Mdx components={{ ...defaultMdxComponents }} />
        </article>

        {/* Optional Sidebar (TOC or Newsletter) */}
        {/* <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-8">
            <div className="rounded-lg border bg-fd-card p-6">
              <h4 className="mb-2 font-semibold">Join the newsletter</h4>
              <p className="text-xs text-fd-muted-foreground mb-4">
                Get the latest updates directly in your inbox.
              </p>
              <button className="w-full bg-fd-primary text-fd-primary-foreground text-xs py-2 rounded-md font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </aside> */}
      </div>
    </main>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}
