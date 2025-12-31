import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  BookOpen,
  Calendar,
  Users,
  MessageSquare,
  DollarSign,
  UserPlus,
  TrendingUp,
  ArrowRight,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  dashboardStats,
  mockEnquiries,
  mockCourses,
  mockBatches,
  mockRevenueData,
} from "@/data/mockAdminData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const statCards = [
  { title: "Total Courses", value: dashboardStats.totalCourses, icon: BookOpen, color: "text-primary" },
  { title: "Active Batches", value: dashboardStats.activeBatches, icon: Calendar, color: "text-green-600" },
  { title: "Total Students", value: dashboardStats.totalStudents.toLocaleString(), icon: Users, color: "text-blue-600" },
  { title: "Pending Enquiries", value: dashboardStats.pendingEnquiries, icon: MessageSquare, color: "text-orange-600" },
  { title: "Revenue (AED)", value: `${(dashboardStats.revenueThisMonth / 1000).toFixed(0)}K`, icon: DollarSign, color: "text-emerald-600" },
  { title: "Enrolled This Mo.", value: dashboardStats.studentsEnrolledThisMonth, icon: UserPlus, color: "text-purple-600" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "contacted":
      return "bg-blue-100 text-blue-800";
    case "converted":
      return "bg-green-100 text-green-800";
    case "closed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AdminDashboard = () => {
  const recentEnquiries = mockEnquiries.slice(0, 7);
  const topCourses = [...mockCourses].sort((a, b) => b.registrations - a.registrations).slice(0, 5);
  const upcomingBatches = mockBatches.filter((b) => b.status === "upcoming" || b.status === "active").slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at Elegant Training.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-card transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enquiries and Top Courses */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Enquiries */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg">Recent Enquiries</CardTitle>
              <Link to="/admin/enquiries">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{enquiry.name}</p>
                      <p className="text-xs text-muted-foreground">{enquiry.course}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {new Date(enquiry.date).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(enquiry.status)}`}>
                        {enquiry.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Courses */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Top Performing Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{course.name}</p>
                      <p className="text-xs text-muted-foreground">{course.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{course.registrations}</p>
                      <p className="text-xs text-muted-foreground">registrations</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Revenue Overview (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis
                    className="text-xs"
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value.toLocaleString()} AED`, "Revenue"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Batches */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg">Upcoming Batches</CardTitle>
            <Link to="/admin/batches">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Course</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Start Date</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Seats</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Instructor</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingBatches.map((batch) => (
                    <tr key={batch.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4 text-sm font-medium">{batch.courseName}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(batch.startDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className="font-medium">{batch.enrolledSeats}</span>
                        <span className="text-muted-foreground">/{batch.maxSeats}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{batch.instructor}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={batch.status === "active" ? "default" : "secondary"}
                          className="capitalize"
                        >
                          {batch.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
