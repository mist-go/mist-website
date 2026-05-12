"use client";

import { BundledLanguage, codeToTokens } from "shiki";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  code: string;
  lang?: BundledLanguage;
}

export default function MorphCode({ code, lang = "rust" }: Props) {
  const [lines, setLines] = useState<any[][]>([]);

  useEffect(() => {
    async function run() {
      const result = await codeToTokens(code, {
        lang,
        theme: "github-dark",
      });

      const rawLines = code.split("\n");

      const fixed = rawLines.map((_, i) => {
        return (
          result.tokens[i] ?? [
            {
              content: "\n",
              color: undefined,
            },
          ]
        );
      });

      setLines(fixed);
    }

    run();
  }, [code, lang]);

  return (
    <pre className="text-sm overflow-x-scroll overflow-y-hidden">
      <code>
        <AnimatePresence mode="popLayout">
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="flex min-h-[1em]">
              {line.map((token, tokenIndex) => (
                <motion.span
                  key={`${lineIndex}-${tokenIndex}`}
                  layoutId={`${lineIndex}-${tokenIndex}`}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    color: token.color,
                    whiteSpace: "pre",
                  }}
                >
                  {token.content}
                </motion.span>
              ))}
            </div>
          ))}
        </AnimatePresence>
      </code>
    </pre>
  );
}
