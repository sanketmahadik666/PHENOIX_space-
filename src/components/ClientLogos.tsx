import { motion } from "framer-motion";

const logos = [
  { name: "Emirates NBD", initials: "ENBD" },
  { name: "ADNOC", initials: "AD" },
  { name: "Dubai Holdings", initials: "DH" },
  { name: "Emaar", initials: "EM" },
  { name: "DP World", initials: "DP" },
  { name: "Etisalat", initials: "ET" },
  { name: "Dubai Duty Free", initials: "DDF" },
  { name: "Majid Al Futtaim", initials: "MAF" },
  { name: "Al Tayer", initials: "AT" },
  { name: "DAMAC", initials: "DM" },
];

export const ClientLogos = () => {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-lg font-semibold text-foreground mb-8"
        >
          Our Learners Work at Global Companies & Startups
        </motion.p>

        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-marquee">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-16 bg-secondary rounded-lg flex items-center justify-center hover:shadow-soft transition-shadow"
              >
                <span className="text-lg font-bold text-muted-foreground">{logo.initials}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};