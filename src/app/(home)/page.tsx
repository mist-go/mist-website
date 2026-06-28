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
    title: "Rust.. With classes?",
    description:
      "C++ style syntax for comfort. Mist is designed for fast, readable systems code with minimal friction compared to raw Rust.",
    code: `pub class Player
{
    pub String name;
    pub i32 hp;

    pub constructor(str& name)
    {
        self.name = name.to_string();
        self.hp = 100;
    }
    
    pub bool is_dead(&self)
    {
        self.hp <= 0
    }
}`,
    cta: true,
  },

  {
    title: "Fast and works with Rust",
    description:
      "All of your favorite Rust libraries work with Mist. It compiles directly into efficient Rust code with zero-cost abstractions and no runtime overhead.",
    code: `use serde::Deserialize;

#[Deserialize]
pub struct MyJsonComponent
{
    pub String name,
}`,
  },

  {
    title: "Class and Type System",
    description:
      "Classes work similarly to c++ inheritance, with safety ensuring that fields are initialized",
    code: `pub class Car : Vehicle
{
    pub i32 horse_power;

    constructor()
    {
        super = Super::new();
        self.horse_power = 300;
    }

    pub void accelerate() override
    {
      // speed inherited from Vehicle (via DerefMut)
      self.speed *= horse_power;
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
    <div className="h-[calc(100vh-58px)] overflow-auto snap-y snap-mandatory scroll-smooth no-scrollbar relative flex flex-col xl:flex-row">
      <div className="hidden pointer-events-none sticky top-0 right-0 z-50 md:flex order-first xl:order-last w-full xl:w-[40vw] h-svh items-center justify-center p-10 no-scrollbar">
        <div className="w-full max-w-2xl overflow-hidden no-scrollbar">
          <motion.div
            className="will-change-transform transform-gpu w-full h-auto border border-fd-border p-5 rounded-xl min-h-24 backdrop-blur bg-black dark:bg-black/20 pointer-events-auto"
            variants={item}
            initial="hidden"
            animate="show"
          >
            <MorphCode code={currentText} key="morph-code-logic" />
          </motion.div>
        </div>
      </div>

      <div className="flex-1 w-full xl:w-[60vw]">
        {mistShowcase.map((show) => (
          <ShowSection
            key={show.title}
            show={show}
            setActiveCode={setCurrentText}
          />
        ))}
      </div>

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
