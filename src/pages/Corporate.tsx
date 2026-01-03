import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Users, Building2, Target, ArrowRight } from "lucide-react";

const benefits = [
  "Customized training programs tailored to your organization",
  "Flexible scheduling - on-site or virtual training",
  "Industry-recognized certifications for employees",
  "Dedicated account manager for your company",
  "Progress tracking and performance reports",
  "Post-training support and resources",
];

const services = [
  {
    icon: Users,
    title: "Team Training",
    description: "Upskill your entire team with group training sessions designed to boost productivity.",
  },
  {
    icon: Target,
    title: "Custom Programs",
    description: "Tailored training solutions aligned with your specific business objectives and goals.",
  },
  {
    icon: Building2,
    title: "On-Site Training",
    description: "Bring the training to your office with our convenient on-site programs.",
  },
];

const Corporate = () => {
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
                className="will-change-transform"
              >
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                  Corporate Training
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Empower Your <span className="text-primary">Workforce</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Transform your organization with our comprehensive corporate training solutions.
                  We partner with leading companies to develop their most valuable asset – their people.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="xl">
                    Request a Quote
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="xl">
                    Download Brochure
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
                  alt="Corporate training"
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Corporate Solutions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Flexible training programs designed for businesses of all sizes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-8 rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Why Choose Us for Corporate Training?
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-2xl shadow-card"
              >
                <h3 className="text-2xl font-bold text-foreground mb-6">Request a Quote</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    aria-label="Company Name"
                    placeholder="Company Name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="text"
                    aria-label="Contact Person"
                    placeholder="Contact Person"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="email"
                    aria-label="Email Address"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="tel"
                    aria-label="Phone Number"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <select 
                    aria-label="Number of Employees"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent text-muted-foreground"
                  >
                    <option>Number of Employees</option>
                    <option>1-10</option>
                    <option>11-50</option>
                    <option>51-200</option>
                    <option>200+</option>
                  </select>
                  <textarea
                    aria-label="Training Requirements"
                    placeholder="Training Requirements"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button variant="hero" size="lg" className="w-full">
                    Submit Request
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-12">
              Trusted by Leading Organizations
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {["ENBD", "ADNOC", "Emaar", "DP World", "Etisalat", "DAMAC"].map((company) => (
                <div
                  key={company}
                  className="w-32 h-16 bg-secondary rounded-lg flex items-center justify-center"
                >
                  <span className="text-lg font-bold text-muted-foreground">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Corporate;