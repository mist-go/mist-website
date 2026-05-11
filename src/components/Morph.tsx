import { motion, AnimatePresence } from "framer-motion";

interface MorphTextProps {
  text: string;
}

const tokenize = (str: string) => {
  const counts: Record<string, number> = {};
  return str.split("").map((char) => {
    const displayChar = char === " " ? "\u00A0" : char;
    counts[char] = (counts[char] || 0) + 1;
    return { char: displayChar, id: `${char}-${counts[char]}` };
  });
};

export default function MorphText({ text }: MorphTextProps) {
  const activeTokens = tokenize(text);

  return (
    <div className="flex flex-wrap gap-x-[0.1em] font-mono text-5xl font-black text-indigo-400 p-10 bg-black rounded-2xl">
      <AnimatePresence mode="popLayout">
        {activeTokens.map(({ char, id }) => (
          <motion.span
            key={id}
            layoutId={id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              type: "tween",
              stiffness: 200,
              damping: 20,
              duration: 1,
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
