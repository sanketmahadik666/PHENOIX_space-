import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateEnquiry, useCoursesAdmin } from "@/hooks/useSupabaseQuery";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AddEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddEnquiryModal = ({ isOpen, onClose }: AddEnquiryModalProps) => {
  const { data: courses = [] } = useCoursesAdmin();
  const createEnquiryMutation = useCreateEnquiry();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interested_course: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.interested_course) {
        toast.error("Please select a course");
        return;
    }

    try {
      await createEnquiryMutation.mutateAsync({
        ...formData,
        status: "pending",
        enquiry_date: new Date().toISOString()
      });
      toast.success("Enquiry created successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        interested_course: "",
        message: "",
      });
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to create enquiry");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Enquiry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Student Name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+971..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Interested Course</Label>
            <Select 
                value={formData.interested_course} 
                onValueChange={(val) => setFormData({ ...formData, interested_course: val })}
            >
            <SelectTrigger>
                <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
                {courses.map((course: any) => (
                <SelectItem key={course.id} value={course.name}>
                    {course.name}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message / Notes</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Any specific requirements..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createEnquiryMutation.isPending}>
              {createEnquiryMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Enquiry
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
