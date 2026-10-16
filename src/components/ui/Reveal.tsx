"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  immediate = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  immediate?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  const visible = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      {...(immediate
        ? { animate: visible }
        : { whileInView: visible, viewport: { once: true, margin: "-80px" } })}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
