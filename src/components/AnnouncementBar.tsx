import { motion } from "framer-motion";

const announcements = [
  { text: "CISI-UAE Financial Rules and Regulations - 1260 AED for new batch", link: "#" },
  { text: "CMA Course - 50% Discount on running batch", link: "#" },
  { text: "Microsoft Power BI - Only 999 AED for Next week batch", link: "#" },
  { text: "Advanced MS Office - 750 AED only - Special offer", link: "#" },
];

export const AnnouncementBar = () => {
  return (
    <div className="bg-primary overflow-hidden">
      <div className="relative flex py-2">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...announcements, ...announcements].map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="text-sm text-primary-foreground">{item.text}</span>
              <a
                href={item.link}
                className="text-xs font-semibold bg-primary-foreground/20 text-primary-foreground px-3 py-1 rounded-full hover:bg-primary-foreground/30 transition-colors"
              >
                Register Now
              </a>
              <span className="text-primary-foreground/50">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};