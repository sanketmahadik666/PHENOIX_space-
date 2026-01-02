import { motion } from "framer-motion";
import { useAnnouncements } from "@/hooks/useSupabaseQuery";

export const AnnouncementBar = () => {
  const { data: announcements = [], isLoading } = useAnnouncements(true);

  if (isLoading || announcements.length === 0) {
    return null;
  }

  return (
    <div className="bg-primary overflow-hidden">
      <div className="relative flex py-2">
        <motion.div
          className="flex gap-8 whitespace-nowrap will-change-transform"
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...announcements, ...announcements].map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex items-center gap-4">
              <span className="text-sm text-primary-foreground">{item.text}</span>
              {item.link_url && item.link_url !== "#" && (
                <a
                  href={item.link_url}
                  className="text-xs font-semibold bg-primary-foreground/20 text-primary-foreground px-3 py-1 rounded-full hover:bg-primary-foreground/30 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Now
                </a>
              )}
              <span className="text-primary-foreground/50">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};