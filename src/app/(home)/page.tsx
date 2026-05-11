"use client";

import MorphCode from "@/components/Morph";
import { NewspaperIcon, RocketIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const mistShowcase = [
  {
    title: "Rust.. With ergonomics?",
    description:
      "C/C++ style syntax for comfort. Mist is designed for fast, readable systems code with minimal friction compared to raw Rust.",
    code: `void main() {
    println!("Hello, World!");

    greet("Developer");
}

public void greet(str* name) {
  // Familiar pointer ergonomics with Rust safety
  String greeting = name.to_string();
  println!("Hello, {}!", greeting);
}`,
    cta: true,
  },

  {
    title: "Fast and works with Rust",
    description:
      "All of your favorite Rust libraries work with Mist. It compiles directly into efficient Rust code with zero-cost abstractions and no runtime overhead.",
    code: `use <std::vec::Vec>;
use <external_lib>;

void process_data() {
    var list = new Vec(); // Zero-cost abstraction
    external_lib::perform_task(list);
}`,
  },

  {
    title: "Class and Type System",
    description:
      "Classes are syntactic sugar for Rust structs. Using 'extends' provides inheritance-style syntax over struct composition, compiling into the underlying Rust type system.",
    code: `public class Entity {
    u32 id;
}

// Compiles to struct composition in Rust
public struct Player extends Entity {
    String username;

    public constructor(u32 id, str* name) {
        self.id = id;
        self.username = name.to_string();
    }
}`,
  },

  {
    title: "Explicit Mutability",
    description:
      "Mist maintains memory intent through explicit self pointers and mutability modifiers.",
    code: `public void update_id(self mut*, u32 new_id) {
    self.id = new_id;
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
      <h1 className="text-5xl bg-linear-to-r from-fd-primary to-fd-muted-foreground bg-clip-text text-transparent h-13">
        {show.title}
      </h1>
      <p className="text-xl text-zinc-400 text-center">{show.description}</p>
      {show.cta && (
        <div className="mt-3 lg:mt-1 flex gap-6">
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
        <div className="md:w-full md:pl-14 overflow-hidden">
          <div className="w-max h-auto border border-fd-border p-5 rounded-xl min-h-24 backdrop-blur bg-black/20">
            <MorphCode code={currentText} />
          </div>
        </div>
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
