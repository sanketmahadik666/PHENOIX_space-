import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  Calculator, 
  Palette, 
  Code, 
  TrendingUp, 
  Languages,
  Building2,
  FileSpreadsheet 
} from "lucide-react";

const categories = [
  { 
    name: "Business & Management", 
    icon: Briefcase, 
    courses: 25,
    color: "bg-blue-500/10 text-blue-600" 
  },
  { 
    name: "Finance & Accounting", 
    icon: Calculator, 
    courses: 32,
    color: "bg-green-500/10 text-green-600" 
  },
  { 
    name: "Graphic Design", 
    icon: Palette, 
    courses: 18,
    color: "bg-pink-500/10 text-pink-600" 
  },
  { 
    name: "Web Development", 
    icon: Code, 
    courses: 15,
    color: "bg-purple-500/10 text-purple-600" 
  },
  { 
    name: "Digital Marketing", 
    icon: TrendingUp, 
    courses: 22,
    color: "bg-orange-500/10 text-orange-600" 
  },
  { 
    name: "Languages", 
    icon: Languages, 
    courses: 12,
    color: "bg-cyan-500/10 text-cyan-600" 
  },
  { 
    name: "Architecture & CAD", 
    icon: Building2, 
    courses: 20,
    color: "bg-yellow-500/10 text-yellow-600" 
  },
  { 
    name: "MS Office", 
    icon: FileSpreadsheet, 
    courses: 10,
    color: "bg-red-500/10 text-red-600" 
  },
];

export const CourseCategories = () => {
  return (
    <section className="py-20 gradient-hero">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Course Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Our Training Programs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wide range of professional courses tailored to meet industry demands
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to="/courses"
                className="block bg-card rounded-xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 group hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">{category.courses} Courses</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};