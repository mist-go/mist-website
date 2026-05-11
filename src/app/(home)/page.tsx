"use client";

import MorphText from "@/components/Morph";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNext(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const text = showNext ? "world hello i32(" : "(hello i32 world";

  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <MorphText text={text} />
    </div>
  );
}
