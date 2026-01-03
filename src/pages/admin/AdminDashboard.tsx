import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatsChart } from "@/components/StatsChart";
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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  Legend,
} from "recharts";
import {
  dashboardStats,
  mockEnquiries,
  mockCourses,
  mockBatches,
} from "@/data/mockAdminData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAnalyticsData } from "@/hooks/useSupabaseQuery";


const statCards = [
  { title: "Total Courses", value: dashboardStats.totalCourses, icon: BookOpen, color: "text-primary" },
  { title: "Active Batches", value: dashboardStats.activeBatches, icon: Calendar, color: "text-green-600" },
  { title: "Total Students", value: dashboardStats.totalStudents.toLocaleString(), icon: Users, color: "text-blue-600" },
  { title: "Pending Enquiries", value: dashboardStats.pendingEnquiries, icon: MessageSquare, color: "text-orange-600" },
  { title: "Revenue (AED)", value: `${(dashboardStats.revenueThisMonth / 1000).toFixed(0)}K`, icon: DollarSign, color: "text-emerald-600" },
  { title: "Enrolled This Mo.", value: dashboardStats.studentsEnrolledThisMonth, icon: UserPlus, color: "text-purple-600" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
  const { data: analyticsData, isLoading } = useAnalyticsData();
  
  const recentEnquiries = mockEnquiries.slice(0, 7);
  const topCourses = [...mockCourses].sort((a, b) => b.registrations - a.registrations).slice(0, 5);
  // Fallback to mock batches if hook data is loading or empty, but ideally we use the hook data for the event list
  const upcomingBatches = analyticsData?.upcomingBatches.length ? analyticsData.upcomingBatches : mockBatches.filter((b) => b.status === "upcoming" || b.status === "active").slice(0, 5);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">Loading dashboard analytics...</div>
      </AdminLayout>
    );
  }

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

        {/* Analytics Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Time Series: Enquiries Over Time */}
          <StatsChart />

          {/* Pie Chart: Enquiry Status Distribution */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Enquiry Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData?.enquiryStatusData || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData?.enquiryStatusData.map((_entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Courses */}
        <div className="grid lg:grid-cols-1 gap-6">
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

        <div className="grid lg:grid-cols-2 gap-6">
           {/* Scatter Plot: Course Price vs Batches */}
           <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Course Insights (Price vs Popularity)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                     <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="price" name="Price" unit=" AED" className="text-xs" />
                    <YAxis type="number" dataKey="batches" name="Batches" className="text-xs" />
                    <ZAxis dataKey="z" range={[64, 144]} name="Score" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Courses" data={analyticsData?.courseMetrics || []} fill="#8884d8">
                      {analyticsData?.courseMetrics.map((_entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Event Series: Upcoming Batches Timeline */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg">Upcoming Batches Timeline</CardTitle>
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
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingBatches.map((batch: any, i: number) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-secondary/30">
                        <td className="py-3 px-4 text-sm font-medium">{batch.courseName || batch.course_name}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {new Date(batch.startDate || batch.start_date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className="font-medium">{batch.enrolledSeats || batch.enrolled_seats}</span>
                          <span className="text-muted-foreground">/{batch.maxSeats || batch.max_seats}</span>
                        </td>
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

        {/* Recent Enquiries (Lower priority) */}
        <div className="grid lg:grid-cols-1 gap-6">
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
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
