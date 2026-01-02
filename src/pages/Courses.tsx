import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Clock, Star, Users, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const allCourses = [
  {
    id: 1,
    title: "Digital Marketing Course",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    duration: "30 Hours",
    rating: 5,
    students: 450,
    category: "Marketing",
    price: "2,500 AED",
  },
  {
    id: 2,
    title: "CMA Certification Training",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
    duration: "50 Days",
    rating: 5,
    students: 320,
    category: "Finance",
    price: "8,500 AED",
  },
  {
    id: 3,
    title: "Graphic Design Course",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80",
    duration: "42 Hours",
    rating: 5,
    students: 280,
    category: "Design",
    price: "3,000 AED",
  },
  {
    id: 4,
    title: "IELTS Exam Preparation",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80",
    duration: "24 Days",
    rating: 5,
    students: 520,
    category: "Language",
    price: "1,800 AED",
  },
  {
    id: 5,
    title: "Microsoft Power BI Training",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    duration: "15 Hours",
    rating: 5,
    students: 380,
    category: "Technology",
    price: "999 AED",
  },
  {
    id: 6,
    title: "Leadership & Management Skills",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
    duration: "8 Hours",
    rating: 5,
    students: 200,
    category: "Business",
    price: "1,500 AED",
  },
  {
    id: 7,
    title: "AutoCAD Certification",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80",
    duration: "40 Hours",
    rating: 5,
    students: 250,
    category: "Engineering",
    price: "4,500 AED",
  },
  {
    id: 8,
    title: "Advanced Excel Training",
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=400&q=80",
    duration: "20 Hours",
    rating: 5,
    students: 600,
    category: "Technology",
    price: "750 AED",
  },
  {
    id: 9,
    title: "Video Editing Masterclass",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=80",
    duration: "38 Hours",
    rating: 5,
    students: 180,
    category: "Design",
    price: "3,500 AED",
  },
];

const categories = ["All", "Marketing", "Finance", "Design", "Language", "Technology", "Business", "Engineering"];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center will-change-transform"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Explore Our <span className="text-primary">Courses</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Browse our comprehensive collection of professional training courses
              </p>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 bg-card"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Course Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Link to={`/courses/${course.id}`}>
                    <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2">
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <span className="absolute top-4 right-4 px-3 py-1 bg-card/90 backdrop-blur-sm text-foreground text-xs font-medium rounded-full">
                          {course.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <div className="text-xl font-bold text-primary mb-4">{course.price}</div>
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

            {filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No courses found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;