import { motion } from "framer-motion";
import { ReactNode } from "react";

export const FadeIn = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }} // Custom "soft" easing
  >
    {children}
  </motion.div>
);
