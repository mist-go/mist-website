"use client";

import MorphCode from "@/components/Morph";
import { ChevronsDownIcon, NewspaperIcon, RocketIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

import "./Home.css";

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

    void log(self*, LogLevel level, str* message) {
        println!("{level} {} {}", self.prefix, message);
    }

    impl fmt::Display {
        std::fmt::Result fmt(self*, std::fmt::Formatter<'_> mut* f) {
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
      className="h-svh p-10 md:p-20 w-full flex flex-col items-center justify-center snap-center"
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
              href="/docs"
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
    /* 
       1. Move overflow-y-auto and snap-y to the ROOT div. 
       Now the entire screen is the scrollable "track".
    */
    <div className="h-svh overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar relative flex flex-col xl:flex-row">
      {/* 
         THE RIGHT SIDE (MorphCode)
         Using 'sticky' instead of 'fixed'. It will stay pinned to the 
         top/center while you scroll through the sections.
      */}
      <div className="pointer-events-none sticky top-0 right-0 z-50 flex order-first xl:order-last w-full xl:w-[40vw] h-svh items-center justify-center p-10">
        <div className="w-full max-w-2xl overflow-hidden">
          <motion.div
            className="will-change-transform transform-gpu w-full h-auto border border-fd-border p-5 rounded-xl min-h-24 backdrop-blur bg-black dark:bg-black/20 pointer-events-auto"
            variants={item}
            initial="hidden"
            animate="show"
          >
            {/* 
               We use a key here to help React/Framer distinguish 
               morphing vs unmounting if needed 
            */}
            <MorphCode code={currentText} key="morph-code-logic" />
          </motion.div>
        </div>
      </div>

      {/* 
         THE SECTIONS 
         They now live in the main scroll flow. 
      */}
      <div className="flex-1 w-full xl:w-[60vw]">
        {mistShowcase.map((show) => (
          <ShowSection
            key={show.title}
            show={show}
            setActiveCode={setCurrentText}
          />
        ))}
      </div>

      {/* Scroll Indicator - Use fixed so it stays relative to screen */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-50"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <ChevronsDownIcon
            className="h-6 w-6 text-fd-primary"
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
