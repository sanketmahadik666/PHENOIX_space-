import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const calendarEvents = [
  {
    id: 1,
    course: "Digital Marketing Course",
    date: "Jan 5, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Dubai Campus",
    mode: "Classroom",
    seats: 12,
  },
  {
    id: 2,
    course: "CMA Part 1 Training",
    date: "Jan 8, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Online",
    mode: "Live Online",
    seats: 25,
  },
  {
    id: 3,
    course: "AutoCAD Certification",
    date: "Jan 10, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Dubai Campus",
    mode: "Classroom",
    seats: 8,
  },
  {
    id: 4,
    course: "Advanced Excel Training",
    date: "Jan 12, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Online",
    mode: "Live Online",
    seats: 30,
  },
  {
    id: 5,
    course: "IELTS Preparation",
    date: "Jan 15, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Dubai Campus",
    mode: "Classroom",
    seats: 15,
  },
  {
    id: 6,
    course: "Graphic Design Masterclass",
    date: "Jan 18, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Dubai Campus",
    mode: "Classroom",
    seats: 10,
  },
];

const months = ["January 2025", "February 2025", "March 2025"];

const TrainingCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState("January 2025");

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
                Training <span className="text-primary">Calendar</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                View our upcoming courses and register for the batch that suits your schedule
              </p>
            </motion.div>
          </div>
        </section>

        {/* Month Filter */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedMonth === month
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Calendar Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-4">
              {calendarEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{event.course}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.mode === "Live Online" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {event.mode}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {event.seats} seats left
                    </span>
                    <Button size="sm">Register</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TrainingCalendar;