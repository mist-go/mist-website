"use client";

import MorphText from "@/components/Morph";
import { Card } from "fumadocs-ui/components/card";
import { useEffect, useRef, useState } from "react";

export const mistShowcase = [
  {
    title: "Hello World",
    description:
      "Mist starts with familiar syntax, designed to feel immediately readable while compiling into efficient Rust code.",
    code: `fn main() {
    println("Hello, world!");
}`,
  },

  {
    title: "Rust Compatibility",
    description:
      "Mist compiles directly into Rust, meaning you can use existing Rust libraries without breaking your workflow.",
    code: `use std::fs;

fn main() {
    let data = fs::read_to_string("file.txt");
    println(data);
}`,
  },

  {
    title: "Structs",
    description:
      "Mist keeps Rust’s struct model intact while making declaration more ergonomic.",
    code: `struct User {
    name: String,
    age: int
}`,
  },

  {
    title: "Classes (Syntax Sugar)",
    description:
      "Classes provide a familiar authoring style over Rust structs without introducing a runtime object model.",
    code: `class Logger {
    String prefix;

    fn info(self, msg: String) {
        println(self.prefix + msg);
    }
}`,
  },

  {
    title: "Inheritance-style Composition",
    description:
      "Extends provides inheritance-like syntax while compiling down to Rust-style composition.",
    code: `struct B extends A {
    extra: String
}`,
  },

  {
    title: "Zero-cost Abstractions",
    description:
      "Mist preserves Rust’s performance model — abstractions compile away entirely at runtime.",
    code: `fn map<T, U>(arr: Vec<T>, f: fn(T) -> U) -> Vec<U> {
    let mut out = Vec::new();
    for x in arr {
        out.push(f(x));
    }
    out
}`,
  },

  {
    title: "Ecosystem Integration",
    description:
      "All Rust crates work directly in Mist, keeping the ecosystem fully intact.",
    code: `use serde_json::json;

fn main() {
    let data = json!({ "hello": "mist" });
    println(data);
}`,
  },
];

// Sub-component to handle individual section observation
function ShowSection({
  show,
  setActiveCode,
}: {
  show: { title: string; description: string; code: string };
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
      className="h-svh p-20 flex flex-col gap-2 items-center justify-center"
    >
      <h1 className="text-5xl bg-linear-to-r from-fd-primary to-fd-muted-foreground bg-clip-text text-transparent">
        {show.title}
      </h1>
      <p className="text-xl text-zinc-400">{show.description}</p>
    </section>
  );
}

export default function HomePage() {
  const [currentText, setCurrentText] = useState(mistShowcase[0]?.code || "");

  return (
    <div className="flex w-full">
      <div className="flex-1">
        {mistShowcase.map((show) => (
          <ShowSection
            key={show.title}
            show={show}
            setActiveCode={setCurrentText}
          />
        ))}
      </div>

      <div className="w-[40vw] h-svh sticky top-0 flex items-center justify-center">
        <Card className="w-full max-w-md h-[calc(100vh-300px)]" title>
          <code className="whitespace-pre-wrap">
            <MorphText text={currentText} />
          </code>
        </Card>
      </div>
    </div>
  );
}
