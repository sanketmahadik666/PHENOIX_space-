import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ShojiCardProps {
    title: string;
    desc: string;
    icon: LucideIcon;
    delay: number;
}

export const ShojiCard = ({ title, desc, icon: Icon, delay }: ShojiCardProps) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
        className="group relative bg-[#F5F5F0] p-10 border-l mb-8 md:mb-0 hover:shadow-xl transition-all duration-700 ease-out border-[#E5E5E5] hover:border-[#8DA399]"
    >
        <div className="absolute top-0 left-0 w-[2px] h-0 bg-[#8DA399] group-hover:h-full transition-all duration-1000 ease-in-out"></div>
        <Icon className="w-8 h-8 text-[#8DA399] mb-6 opacity-80 group-hover:scale-110 transition-transform duration-700" strokeWidth={1.5} />
        <h3 className="font-serif text-2xl text-[#2C2C2C] mb-4 tracking-tight">{title}</h3>
        <p className="font-sans text-[#5c5c5c] leading-relaxed font-light">{desc}</p>
    </motion.div>
);
