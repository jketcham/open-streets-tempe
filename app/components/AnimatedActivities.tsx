import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useTheme } from "~/components/ThemeProvider";

export const activities = [
  "Bike and Explore",
  "Discover Local Art",
  "Walk with Friends",
  "Play and Connect",
  "Dance with Joy",
  "Run and Relax",
  "Transform the Streets",
  "Create and Imagine",
  "Celebrate Community",
  "Laugh and Play",
  "Take it Easy",
  "Ride and Roam",
  "Share the Moment",
  "Skate and Stroll",
];

export function AnimatedActivities() {
  const [index, setIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={activities[index]}
        className={`mb-4 text-4xl font-bold italic sm:text-5xl ${theme.textOnLight} ml-[10px] overflow-visible`}
        style={{ paddingRight: "0.1em" }}
      >
        <div className="overflow-visible">
          {activities[index].split(" ").map((word, wordIndex, words) => (
            <span
              key={wordIndex}
              className="overflow-visible whitespace-nowrap"
            >
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.3,
                    delay: (wordIndex * word.length + charIndex) * 0.03,
                    ease: "easeOut",
                  }}
                  className="relative ml-[-10px] inline-block overflow-visible pr-[10px]"
                  style={{ transform: "translateZ(0)" }}
                >
                  {char}
                </motion.span>
              ))}
              {wordIndex < words.length - 1 && (
                <motion.span
                  key={`${wordIndex}-space`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: (wordIndex * word.length + word.length) * 0.03,
                    ease: "easeOut",
                  }}
                  className="inline-block overflow-visible"
                >
                  {"\u00A0"}
                </motion.span>
              )}
            </span>
          ))}
        </div>
      </motion.h1>
    </AnimatePresence>
  );
}
