import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Star, Users, ArrowRight } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Digital Marketing Course in Dubai",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    duration: "30 Hours",
    rating: 5,
    students: 450,
    category: "Marketing",
    isNew: true,
  },
  {
    id: 2,
    title: "CMA Certification Training Course",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
    duration: "50 Days",
    rating: 5,
    students: 320,
    category: "Finance",
    isNew: true,
  },
  {
    id: 3,
    title: "Graphic Design Course in Dubai",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80",
    duration: "42 Hours",
    rating: 5,
    students: 280,
    category: "Design",
    isNew: true,
  },
  {
    id: 4,
    title: "IELTS Exam Preparation",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80",
    duration: "24 Days",
    rating: 5,
    students: 520,
    category: "Language",
    isNew: true,
  },
  {
    id: 5,
    title: "Microsoft Power BI Training",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    duration: "15 Hours",
    rating: 5,
    students: 380,
    category: "Technology",
    isNew: true,
  },
  {
    id: 6,
    title: "Leadership & Management Skills",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
    duration: "8 Hours",
    rating: 5,
    students: 200,
    category: "Business",
    isNew: true,
  },
];

export const FeaturedCourses = memo(() => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Featured Courses
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Explore Our Live Online Courses
            </h2>
          </div>
          <Link to="/courses">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/courses/${course.id}`}>
                <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    {course.isNew && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                        New Course
                      </span>
                    )}
                    <span className="absolute top-4 right-4 px-3 py-1 bg-card/90 backdrop-blur-sm text-foreground text-xs font-medium rounded-full">
                      {course.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-foreground">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {course.students}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturedCourses.displayName = "FeaturedCourses";