import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-card rounded-3xl overflow-hidden shadow-card"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
          </div>







          <div className="relative z-10 p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Learn & Grow with Experts!
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore our diverse range of professional courses in Dubai and take your career
              to the next level. Learn from industry experts with flexible learning options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl">
                Browse All Courses
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="xl">
                <Phone className="w-5 h-5" />
                Call Us Now
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Or call us directly at{" "}
              <a href="tel:+971547495664" className="text-primary font-semibold hover:underline">
                +971 54 749 5664
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};