import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Phone, Mail, MessageSquare, Clock, Download } from "lucide-react";
import { toast } from "sonner";
import { useEnquiries, useUpdateEnquiry } from "@/hooks/useSupabaseQuery";
import { downloadCSV } from "@/utils/exportUtils";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  interested_course: string;
  message: string;
  enquiry_date: string;
  status: "pending" | "contacted" | "converted" | "closed";
}

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "contacted", label: "Contacted" },
  { value: "converted", label: "Converted" },
  { value: "closed", label: "Closed" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "contacted":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "converted":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "closed":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AdminEnquiries = () => {
  const { data: enquiries = [], isLoading } = useEnquiries();
  const updateEnquiryMutation = useUpdateEnquiry();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.interested_course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (id: string, newStatus: Enquiry["status"]) => {
    await updateEnquiryMutation.mutateAsync({
      id,
      updates: { status: newStatus },
    });
    toast.success(`Enquiry marked as ${newStatus}`);
  };

  const pendingCount = enquiries.filter((e) => e.status === "pending").length;

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading enquiries...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Enquiries</h1>
            <p className="text-muted-foreground">
              Manage and respond to customer enquiries.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadCSV(enquiries, "enquiries-export")}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Badge variant="secondary" className="text-base px-4 py-2">
              {pendingCount} Pending
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Enquiries List */}
        <div className="space-y-4">
          {filteredEnquiries.map((enquiry) => (
            <Card key={enquiry.id}>
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {enquiry.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{enquiry.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Interested in: <span className="font-medium text-foreground">{enquiry.interested_course}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {enquiry.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {enquiry.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(enquiry.enquiry_date).toLocaleDateString()}
                      </div>
                    </div>

                    {enquiry.message && (
                      <div className="flex items-start gap-2 p-3 bg-secondary/30 rounded-lg mt-2">
                        <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <p className="text-sm">{enquiry.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Select
                      value={enquiry.status}
                      onValueChange={(value) => updateStatus(enquiry.id, value as Enquiry["status"])}
                    >
                      <SelectTrigger className={`w-[140px] ${getStatusColor(enquiry.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEnquiries.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No enquiries found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEnquiries;