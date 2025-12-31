// Mock data for admin dashboard (will be replaced with Supabase)

export interface Course {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  image: string;
  description: string;
  isActive: boolean;
  registrations: number;
}

export interface Batch {
  id: string;
  courseId: string;
  courseName: string;
  startDate: string;
  endDate: string;
  instructor: string;
  maxSeats: number;
  enrolledSeats: number;
  status: "upcoming" | "active" | "completed";
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  date: string;
  status: "pending" | "contacted" | "converted" | "closed";
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrolledCourses: string[];
  joinDate: string;
}

export interface Announcement {
  id: string;
  text: string;
  link: string;
  isActive: boolean;
  createdAt: string;
}

export const mockCourses: Course[] = [
  { id: "1", name: "Revit MEP", category: "BIM & CAD", price: 2500, duration: "40 hours", image: "/placeholder.svg", description: "Master Revit MEP for mechanical, electrical, and plumbing design", isActive: true, registrations: 85 },
  { id: "2", name: "CMA Part 1", category: "Finance", price: 4500, duration: "60 hours", image: "/placeholder.svg", description: "Certified Management Accountant preparation course", isActive: true, registrations: 72 },
  { id: "3", name: "Microsoft Power BI", category: "Data Analytics", price: 999, duration: "20 hours", image: "/placeholder.svg", description: "Business intelligence and data visualization", isActive: true, registrations: 65 },
  { id: "4", name: "Adobe Photoshop", category: "Design", price: 1200, duration: "25 hours", image: "/placeholder.svg", description: "Professional photo editing and design", isActive: true, registrations: 58 },
  { id: "5", name: "Advanced Excel", category: "Office Applications", price: 750, duration: "15 hours", image: "/placeholder.svg", description: "Advanced formulas, macros, and data analysis", isActive: true, registrations: 52 },
  { id: "6", name: "AutoCAD 2D & 3D", category: "BIM & CAD", price: 2000, duration: "35 hours", image: "/placeholder.svg", description: "Complete AutoCAD training for professionals", isActive: true, registrations: 48 },
  { id: "7", name: "Python Programming", category: "IT & Programming", price: 1800, duration: "30 hours", image: "/placeholder.svg", description: "Learn Python from basics to advanced", isActive: true, registrations: 45 },
  { id: "8", name: "CISI UAE Regulations", category: "Finance", price: 1260, duration: "20 hours", image: "/placeholder.svg", description: "UAE Financial Rules and Regulations certification", isActive: true, registrations: 38 },
];

export const mockBatches: Batch[] = [
  { id: "1", courseId: "1", courseName: "Revit MEP", startDate: "2024-01-15", endDate: "2024-02-15", instructor: "John Smith", maxSeats: 25, enrolledSeats: 8, status: "upcoming" },
  { id: "2", courseId: "2", courseName: "CMA Part 1", startDate: "2024-01-18", endDate: "2024-03-18", instructor: "Sarah Jones", maxSeats: 30, enrolledSeats: 12, status: "upcoming" },
  { id: "3", courseId: "7", courseName: "Python Basics", startDate: "2024-01-20", endDate: "2024-02-20", instructor: "Ahmed Hassan", maxSeats: 20, enrolledSeats: 15, status: "upcoming" },
  { id: "4", courseId: "3", courseName: "Microsoft Power BI", startDate: "2024-01-10", endDate: "2024-01-25", instructor: "Maria Garcia", maxSeats: 25, enrolledSeats: 22, status: "active" },
  { id: "5", courseId: "5", courseName: "Advanced Excel", startDate: "2024-01-08", endDate: "2024-01-20", instructor: "David Lee", maxSeats: 30, enrolledSeats: 28, status: "active" },
];

export const mockEnquiries: Enquiry[] = [
  { id: "1", name: "John Doe", email: "john@email.com", phone: "+971-50-123-4567", course: "AutoCAD", message: "Interested in weekend batch", date: "2024-01-12", status: "pending" },
  { id: "2", name: "Sarah Khan", email: "sarah@email.com", phone: "+971-55-234-5678", course: "Python", message: "Need corporate training for team", date: "2024-01-10", status: "contacted" },
  { id: "3", name: "Ahmed Ali", email: "ahmed@email.com", phone: "+971-50-345-6789", course: "BIM Fundamentals", message: "When is the next batch?", date: "2024-01-09", status: "pending" },
  { id: "4", name: "Lisa Wong", email: "lisa@email.com", phone: "+971-55-456-7890", course: "Power BI", message: "Can I get course syllabus?", date: "2024-01-08", status: "converted" },
  { id: "5", name: "Mohammed Hassan", email: "moh@email.com", phone: "+971-50-567-8901", course: "CMA", message: "Looking for online classes", date: "2024-01-07", status: "pending" },
  { id: "6", name: "Emma Wilson", email: "emma@email.com", phone: "+971-55-678-9012", course: "Photoshop", message: "Any discounts available?", date: "2024-01-06", status: "contacted" },
  { id: "7", name: "Ali Raza", email: "ali@email.com", phone: "+971-50-789-0123", course: "Revit MEP", message: "Need placement assistance", date: "2024-01-05", status: "pending" },
  { id: "8", name: "Fatima Zahra", email: "fatima@email.com", phone: "+971-55-890-1234", course: "Excel Advanced", message: "Corporate enquiry for 10 people", date: "2024-01-04", status: "converted" },
  { id: "9", name: "James Brown", email: "james@email.com", phone: "+971-50-901-2345", course: "Python", message: "Beginner friendly?", date: "2024-01-03", status: "closed" },
  { id: "10", name: "Noor Ahmed", email: "noor@email.com", phone: "+971-55-012-3456", course: "CISI", message: "Need exam preparation tips", date: "2024-01-02", status: "pending" },
];

export const mockStudents: Student[] = [
  { id: "1", name: "Abdullah Khan", email: "abdullah@email.com", phone: "+971-50-111-2222", enrolledCourses: ["Revit MEP", "AutoCAD"], joinDate: "2023-09-15" },
  { id: "2", name: "Priya Sharma", email: "priya@email.com", phone: "+971-55-222-3333", enrolledCourses: ["Python", "Power BI"], joinDate: "2023-10-20" },
  { id: "3", name: "Omar Youssef", email: "omar@email.com", phone: "+971-50-333-4444", enrolledCourses: ["CMA Part 1"], joinDate: "2023-11-05" },
];

export const mockAnnouncements: Announcement[] = [
  { id: "1", text: "CISI-UAE Financial Rules and Regulations - 1260 AED for new batch", link: "#", isActive: true, createdAt: "2024-01-10" },
  { id: "2", text: "CMA Course - 50% Discount on running batch", link: "#", isActive: true, createdAt: "2024-01-09" },
  { id: "3", text: "Microsoft Power BI - Only 999 AED for Next week batch", link: "#", isActive: true, createdAt: "2024-01-08" },
  { id: "4", text: "Advanced MS Office - 750 AED only - Special offer", link: "#", isActive: true, createdAt: "2024-01-07" },
];

export const mockRevenueData = [
  { month: "Aug", revenue: 320000 },
  { month: "Sep", revenue: 380000 },
  { month: "Oct", revenue: 420000 },
  { month: "Nov", revenue: 395000 },
  { month: "Dec", revenue: 480000 },
  { month: "Jan", revenue: 450000 },
];

export const dashboardStats = {
  totalCourses: 45,
  activeBatches: 12,
  totalStudents: 1250,
  pendingEnquiries: 28,
  revenueThisMonth: 450000,
  studentsEnrolledThisMonth: 350,
};