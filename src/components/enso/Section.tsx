import { ReactNode } from "react";

export const Section = ({ children, className = "", id = "" }: { children: ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-24 px-8 md:px-24 max-w-[1600px] mx-auto ${className}`}>
    {children}
  </section>
);
