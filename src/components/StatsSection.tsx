import { motion } from "framer-motion";
import { GraduationCap, Award, Building2, Users } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: "10,000+", label: "Students Trained" },
  { icon: Award, value: "150+", label: "Professional Courses" },
  { icon: Building2, value: "500+", label: "Corporate Clients" },
  { icon: Users, value: "50+", label: "Expert Trainers" },
];

export const StatsSection = () => {
  return (
    <section className="py-20 gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary-foreground rounded-full" />
        <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-primary-foreground rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-primary-foreground rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Upgrade Your Skills with Dubai's Leading Training Institute
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of professionals who have advanced their careers with our expert-led training programs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-foreground/10 rounded-2xl flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};