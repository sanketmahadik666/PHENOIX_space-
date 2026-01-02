import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  duration: text("duration").notNull(),
  price: integer("price"),
  active: boolean("active").default(true),
});

export const insertCourseSchema = createInsertSchema(courses).omit({ id: true });
export type InsertCourse = typeof insertCourseSchema._type;
export type Course = typeof courses.$inferSelect;

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  courseId: integer("course_id"),
  message: text("message").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertEnquirySchema = createInsertSchema(enquiries).omit({ id: true, createdAt: true });
export type InsertEnquiry = typeof insertEnquirySchema._type;
export type Enquiry = typeof enquiries.$inferSelect;
