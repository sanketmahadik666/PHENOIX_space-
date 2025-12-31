import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Award, Users, Target, Heart } from "lucide-react";

const features = [
  "KHDA Approved Training Center",
  "Autodesk Authorized Partner",
  "Expert Industry Trainers",
  "Flexible Learning Options",
  "Career Support Services",
  "Industry-Recognized Certifications",
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, delivering world-class training programs.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork and collaborative learning environments.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously innovate our training methods to stay ahead of industry trends.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Our trainers are passionate about empowering individuals to achieve their goals.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                  About Us
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Dubai's Leading <span className="text-primary">Training Institute</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Elegant Training Center has been at the forefront of professional education in Dubai
                  since 2010. We are committed to providing high-quality training programs that help
                  individuals and organizations achieve their full potential.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button variant="hero" size="xl">
                  Contact Us
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80"
                  alt="Training session"
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-2xl shadow-card"
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  To empower individuals and organizations with the knowledge and skills they need to
                  succeed in today's competitive business environment. We are committed to delivering
                  high-quality training programs that are practical, relevant, and aligned with
                  industry standards.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-2xl shadow-card"
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground">
                  To be the leading training center in the UAE, recognized for our commitment to
                  excellence, innovation, and the success of our students. We aim to create a
                  community of lifelong learners who are equipped to drive positive change in their
                  industries.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-6 rounded-2xl shadow-soft text-center hover:shadow-hover transition-all duration-300"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 gradient-primary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary-foreground mb-2">14+</div>
                <div className="text-primary-foreground/80">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-foreground mb-2">10,000+</div>
                <div className="text-primary-foreground/80">Students Trained</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-foreground mb-2">150+</div>
                <div className="text-primary-foreground/80">Courses Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-foreground mb-2">50+</div>
                <div className="text-primary-foreground/80">Expert Trainers</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;