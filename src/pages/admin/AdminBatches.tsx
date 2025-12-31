import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockBatches, mockCourses, Batch } from "@/data/mockAdminData";
import { Plus, Edit, Trash2, Search, Calendar, Users } from "lucide-react";
import { toast } from "sonner";

const AdminBatches = () => {
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [formData, setFormData] = useState({
    courseId: "",
    startDate: "",
    endDate: "",
    instructor: "",
    maxSeats: "",
    status: "upcoming" as Batch["status"],
  });

  const filteredBatches = batches.filter((batch) =>
    batch.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (batch?: Batch) => {
    if (batch) {
      setEditingBatch(batch);
      setFormData({
        courseId: batch.courseId,
        startDate: batch.startDate,
        endDate: batch.endDate,
        instructor: batch.instructor,
        maxSeats: batch.maxSeats.toString(),
        status: batch.status,
      });
    } else {
      setEditingBatch(null);
      setFormData({
        courseId: "",
        startDate: "",
        endDate: "",
        instructor: "",
        maxSeats: "",
        status: "upcoming",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const course = mockCourses.find((c) => c.id === formData.courseId);
    
    if (editingBatch) {
      setBatches(
        batches.map((b) =>
          b.id === editingBatch.id
            ? {
                ...b,
                ...formData,
                courseName: course?.name || "",
                maxSeats: parseInt(formData.maxSeats),
              }
            : b
        )
      );
      toast.success("Batch updated successfully!");
    } else {
      const newBatch: Batch = {
        id: (batches.length + 1).toString(),
        ...formData,
        courseName: course?.name || "",
        maxSeats: parseInt(formData.maxSeats),
        enrolledSeats: 0,
      };
      setBatches([...batches, newBatch]);
      toast.success("Batch added successfully!");
    }
    
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setBatches(batches.filter((b) => b.id !== id));
    toast.success("Batch deleted successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Manage Batches</h1>
            <p className="text-muted-foreground">Schedule and manage training batches.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Batch
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingBatch ? "Edit Batch" : "Add New Batch"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select
                    value={formData.courseId}
                    onValueChange={(value) => setFormData({ ...formData, courseId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input
                      id="instructor"
                      value={formData.instructor}
                      onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                      placeholder="Instructor name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxSeats">Max Seats</Label>
                    <Input
                      id="maxSeats"
                      type="number"
                      value={formData.maxSeats}
                      onChange={(e) => setFormData({ ...formData, maxSeats: e.target.value })}
                      placeholder="25"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as Batch["status"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">
                    {editingBatch ? "Update Batch" : "Add Batch"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search batches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Batches Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground">Course</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground">Dates</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground">Instructor</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground">Seats</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBatches.map((batch) => (
                    <tr key={batch.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-medium">{batch.courseName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {new Date(batch.startDate).toLocaleDateString()} - {new Date(batch.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm">{batch.instructor}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{batch.enrolledSeats}</span>
                          <span className="text-muted-foreground">/ {batch.maxSeats}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`capitalize ${getStatusColor(batch.status)}`}>
                          {batch.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDialog(batch)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(batch.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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

export default AdminBatches;