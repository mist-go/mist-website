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
  const lines = text.split("\n"); // 👈 split by newline

  return (
    <div className="flex flex-col">
      <AnimatePresence mode="popLayout">
        {lines.map((line, lineIndex) => {
          const tokens = tokenize(line);

          // 👇 empty line = real vertical space
          if (line === "") {
            return (
              <div
                key={lineIndex}
                className="h-4" // adjust spacing as needed
              />
            );
          }

          return (
            <div key={lineIndex} className="flex flex-wrap">
              {tokens.map(({ char, id }) => (
                <motion.span
                  key={`${lineIndex}-${id}`}
                  layoutId={`${lineIndex}-${id}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    type: "tween",
                    duration: 1,
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
