"use client";

import MorphCode from "@/components/Morph";
import { NewspaperIcon, RocketIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

const MotionLink = motion(Link);

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
    code: `public struct PluginInfo {
    public String name,
    public String version,
}
  
public class PluginRegistry<T> {
    T plugins;

    public constructor(T plugins) {
        self.plugins = plugins;
    }

    public T plugins(self) {
        return self.plugins;
    }
}`,
  },

  {
    title: "Better Developer Experience",
    description:
      "While Rust can already be a great DX, Mist implements concepts that are proven to improve structure.",
    code: `public class Logger {
    String prefix;

    public constructor(str* prefix) {
        self.prefix = prefix.to_string();
    }

    public void log(self*, LogLevel level, str* message) {
        match(level) {
            LogLevel::Info => {
                println!("{level} {} {}", self.prefix, message);
            }

            LogLevel::Warning => {
                println!("{level} {} {}", self.prefix, message);
            }

            LogLevel::Error => {
                println!("{level} {} {}", self.prefix, message);
            }
        }
    }

    impl fmt::Display {
        fmt::Result fmt(self*, std::fmt::Formatter<'_> mut* f) {
            return write!(f, "logger ({})", self.prefix);
        }
    }
}`,
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

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
    <motion.section
      ref={ref}
      className="h-svh p-10 md:p-20 w-full flex flex-col items-center justify-center"
    >
      <motion.div
        className="flex flex-col gap-2 items-center justify-center"
        variants={container}
        initial="hidden"
        whileInView="show"
      >
        <motion.h1
          className="text-5xl bg-linear-to-r from-fd-primary to-fd-muted-foreground bg-clip-text text-transparent p-1"
          variants={item}
        >
          {show.title}
        </motion.h1>

        <motion.p className="text-xl text-zinc-400 text-center" variants={item}>
          {show.description}
        </motion.p>
        {show.cta && (
          <motion.div className="mt-3 lg:mt-1 flex gap-6">
            <MotionLink
              variants={item}
              className="bg-fd-primary/15 text-fd-primary/90 p-3 px-4.5 rounded-xl cursor-pointer hover:bg-fd-primary/20 hover:text-fd-primary flex gap-2 items-center"
              href="/docs/get-started"
            >
              <RocketIcon className="w-5 h-5" />
              Get Started
            </MotionLink>

            <MotionLink
              variants={item}
              className="bg-fd-card-foreground/13 text-fd-card-foreground/80 p-3 px-4.5 rounded-xl cursor-pointer hover:bg-fd-card-foreground/16 hover:text-fd-card-foreground/83 flex gap-2 items-center"
              href="/blog"
            >
              <NewspaperIcon className="w-5 h-5" />
              View Blog
            </MotionLink>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
}

export default function HomePage() {
  const [currentText, setCurrentText] = useState(mistShowcase[0]?.code || "");

  return (
    <div className="flex w-full flex-col xl:flex-row">
      <div className="flex fixed xl:top-0 xl:right-0 w-svw xl:w-[40vw] h-svh xl:items-center mt-10 justify-center z-50 pointer-events-none">
        <div className="xl:w-full overflow-hidden">
          <motion.div
            className="w-max h-auto border border-fd-border p-5 rounded-xl min-h-24 backdrop-blur bg-black dark:bg-black/20"
            variants={item}
            initial="hidden"
            animate="show"
          >
            <MorphCode code={currentText} />
          </motion.div>
        </div>
      </div>

      <div className="flex-1">
        <div className="mt-10 xl:mt-0">
          {mistShowcase.map((show) => (
            <ShowSection
              key={show.title}
              show={show}
              setActiveCode={setCurrentText}
            />
          ))}
        </div>
      </div>
      <div className="xl:w-[40vw]" />
    </div>
  );
}
