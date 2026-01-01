import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Search, BookOpen } from "lucide-react";
import { toast } from "sonner";
import {
  useCoursesAdmin,
  useAddCourse,
  useUpdateCourse,
  useDeleteCourse,
} from "@/hooks/useSupabaseQuery";

interface Course {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  image_url: string;
  description: string;
  is_active: boolean;
  registrations_count: number;
}

const categories = [
  "BIM & CAD",
  "Finance",
  "Data Analytics",
  "Design",
  "Office Applications",
  "IT & Programming",
];

const AdminCourses = () => {
  const { data: courses = [], isLoading } = useCoursesAdmin();
  const addCourseMutation = useAddCourse();
  const updateCourseMutation = useUpdateCourse();
  const deleteCourseMutation = useDeleteCourse();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    duration: "",
    description: "",
    is_active: true,
  });

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        name: course.name,
        category: course.category,
        price: course.price.toString(),
        duration: course.duration,
        description: course.description,
        is_active: course.is_active,
      });
    } else {
      setEditingCourse(null);
      setFormData({
        name: "",
        category: "",
        price: "",
        duration: "",
        description: "",
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const courseData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      duration: formData.duration,
      description: formData.description,
      is_active: formData.is_active,
    };

    if (editingCourse) {
      await updateCourseMutation.mutateAsync({
        id: editingCourse.id,
        updates: courseData,
      });
      toast.success("Course updated successfully!");
    } else {
      await addCourseMutation.mutateAsync({
        ...courseData,
        image_url: "/placeholder.svg",
      });
      toast.success("Course added successfully!");
    }

    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteCourseMutation.mutateAsync(id);
    toast.success("Course deleted successfully!");
  };

  const toggleActive = async (id: string) => {
    const course = courses.find((c) => c.id === id);
    if (course) {
      await updateCourseMutation.mutateAsync({
        id,
        updates: { is_active: !course.is_active },
      });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading courses...</p>
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
            <h1 className="text-2xl font-bold">Manage Courses</h1>
            <p className="text-muted-foreground">Add, edit, or remove courses from your catalog.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingCourse ? "Edit Course" : "Add New Course"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Course Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Advanced Excel"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (AED)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="999"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 20 hours"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief course description..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>
                  <Button type="submit">
                    {editingCourse ? "Update Course" : "Add Course"}
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
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <Card key={course.id} className={`${!course.is_active ? "opacity-60" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={course.is_active}
                      onCheckedChange={() => toggleActive(course.id)}
                    />
                  </div>
                </div>
                <CardTitle className="text-lg mt-3">{course.name}</CardTitle>
                <Badge variant="secondary" className="w-fit">
                  {course.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-muted-foreground">{course.duration}</span>
                  <span className="font-bold text-primary">{course.price} AED</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                    onClick={() => handleOpenDialog(course)}
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleDelete(course.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCourses;