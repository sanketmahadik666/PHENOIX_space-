import { motion } from "framer-motion";
import { Monitor, Users, PlayCircle } from "lucide-react";

const modes = [
  {
    icon: Monitor,
    title: "Live Online Courses",
    description: "Join our live sessions to stay motivated, ask questions, and collaborate with peers.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
  },
  {
    icon: Users,
    title: "Offline Courses",
    description: "Experience hands-on learning with expert instructors in interactive, in-person sessions.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80",
  },
  {
    icon: PlayCircle,
    title: "Self Paced Courses",
    description: "Learn at your own pace with our comprehensive self-paced learning modules.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80",
  },
];

export const TrainingModes = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Training Options
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Premier Training Institute in Dubai
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Approved by KHDA and Autodesk Authorized Training Center, we provide flexible learning
            options to suit your schedule.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={mode.image}
                  alt={mode.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <mode.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{mode.title}</h3>
                <p className="text-muted-foreground">{mode.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};