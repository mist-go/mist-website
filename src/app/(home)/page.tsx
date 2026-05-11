"use client";

import MorphText from "@/components/Morph";
import { Card } from "fumadocs-ui/components/card";
import { BookOpenIcon, NewspaperIcon, RocketIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const mistShowcase = [
  {
    title: "Hello World",
    description:
      "Mist starts with familiar syntax, designed to feel immediately readable while compiling into efficient Rust code.",
    code: `void main() {
    println!("Hello, world!");
}`,
    cta: true,
  },

  {
    title: "C-Style Pointers & Strings",
    description:
      "Mist introduces ergonomics for string handling and pointers while maintaining Rust's underlying safety.",
    code: `public void greet(str* name) {
    String greeting = name.to_string();
    println!("Hello, {}!", greeting);
}`,
  },

  {
    title: "Modern Classes",
    description:
      "Classes provide a familiar authoring style with explicit visibility modifiers and constructor logic.",
    code: `public class User {
    String name;
    i32 age;

    public constructor(str* name, i32 age) {
        self.name = name.to_string();
        self.age = age;
    }
}`,
  },

  {
    title: "Explicit Self & Mutability",
    description:
      "Method signatures clearly define access patterns using self pointers, making memory intent obvious.",
    code: `public void update_age(self mut*, i32 new_age) {
    self.age = new_age;
    self.logger.info("Age updated");
}`,
  },

  {
    title: "Pattern Matching",
    description:
      "Full support for Rust-style enums and pattern matching for robust control flow.",
    code: `void handle_event(self*, event::Event e) {
    match(e) {
        event::Event::Startup => self.boot(),
        event::Event::Error(msg) => println!("Error: {}", msg),
        _ => {}
    }
}`,
  },

  {
    title: "Type Inference & Vectors",
    description:
      "Mist combines strong typing with keyword-based inference for a streamlined developer experience.",
    code: `public void init_system(self mut*) {
    var task = task::create_task("init");
    self.tasks = new Vec();
    self.tasks.push(task);
}`,
  },

  {
    title: "Module Interop",
    description:
      "Use super-relative imports to easily navigate project hierarchies and external crates.",
    code: `use <super::logger>;
use <std::fs>;

public void log_to_file(logger::Logger log) {
    let data = fs::read_to_string("log.txt");
    log.info(data);
}`,
  },
];

// Sub-component to handle individual section observation
function ShowSection({
  show,
  setActiveCode,
}: {
  show: { title: string; description: string; code: string; cta?: boolean };
  setActiveCode: (v: string) => void;
}) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveCode(show.code);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [show.code, setActiveCode]);

  return (
    <section
      ref={ref}
      className="h-svh p-10 md:p-20 flex flex-col gap-2 items-center justify-center"
    >
      <h1 className="text-5xl bg-linear-to-r from-fd-primary to-fd-muted-foreground bg-clip-text text-transparent">
        {show.title}
      </h1>
      <p className="text-xl text-zinc-400">{show.description}</p>
      {show.cta && (
        <div className="mt-3 lg:mt-0 flex gap-6">
          <Link
            className="bg-fd-primary/15 text-fd-primary/90 p-3 px-4.5 rounded-xl cursor-pointer hover:bg-fd-primary/20 hover:text-fd-primary flex gap-2 items-center"
            href="/docs/get-started"
          >
            <RocketIcon className="w-5 h-5" />
            Get Started
          </Link>

          <Link
            className="bg-fd-card-foreground/13 text-fd-card-foreground/80 p-3 px-4.5 rounded-xl cursor-pointer hover:bg-fd-card-foreground/16 hover:text-fd-card-foreground/83 flex gap-2 items-center"
            href="/blog"
          >
            <NewspaperIcon className="w-5 h-5" />
            View Blog
          </Link>
        </div>
      )}
    </section>
  );
}

export default function HomePage() {
  const [currentText, setCurrentText] = useState(mistShowcase[0]?.code || "");

  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="order-1 md:order-2 w-full md:w-[40vw] md:h-svh sticky top-20 md:top-0 flex items-center justify-center z-10 bg-background pb-4 md:pb-0">
        <Card className="w-full max-w-md h-auto md:h-100" title>
          <code className="whitespace-pre-wrap">
            <MorphText text={currentText} />
          </code>
        </Card>
      </div>

      <div className="flex-1 order-2 md:order-1">
        <div className="-mt-30 md:mt-0">
          {mistShowcase.map((show) => (
            <ShowSection
              key={show.title}
              show={show}
              setActiveCode={setCurrentText}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
