import { motion } from "framer-motion";
import { ReactNode } from "react";

export const FadeIn = ({ children, delay = 0, index = 0, baseDelay = 0.1 }: { children: ReactNode, delay?: number, index?: number, baseDelay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ 
        duration: 1.2, 
        delay: delay + (index * baseDelay), 
        ease: [0.22, 1, 0.36, 1] 
    }}
  >
    {children}
  </motion.div>
);
