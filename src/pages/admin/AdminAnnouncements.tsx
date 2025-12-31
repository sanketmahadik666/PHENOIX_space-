import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockAnnouncements, Announcement } from "@/data/mockAdminData";
import { Plus, Edit, Trash2, Megaphone, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState({
    text: "",
    link: "",
    isActive: true,
  });

  const handleOpenDialog = (announcement?: Announcement) => {
    if (announcement) {
      setEditingAnnouncement(announcement);
      setFormData({
        text: announcement.text,
        link: announcement.link,
        isActive: announcement.isActive,
      });
    } else {
      setEditingAnnouncement(null);
      setFormData({
        text: "",
        link: "",
        isActive: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAnnouncement) {
      setAnnouncements(
        announcements.map((a) =>
          a.id === editingAnnouncement.id
            ? { ...a, ...formData }
            : a
        )
      );
      toast.success("Announcement updated successfully!");
    } else {
      const newAnnouncement: Announcement = {
        id: (announcements.length + 1).toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      toast.success("Announcement added successfully!");
    }
    
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
    toast.success("Announcement deleted successfully!");
  };

  const toggleActive = (id: string) => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === id ? { ...a, isActive: !a.isActive } : a
      )
    );
  };

  const activeCount = announcements.filter((a) => a.isActive).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Promo Bar Announcements</h1>
            <p className="text-muted-foreground">
              Manage the scrolling announcements shown at the top of your website.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingAnnouncement ? "Edit Announcement" : "Add New Announcement"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Announcement Text</Label>
                  <Input
                    id="text"
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    placeholder="e.g., CMA Course - 50% Discount on running batch"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="link">Link URL (optional)</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="active"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label htmlFor="active">Show on website</Label>
                  </div>
                  <Button type="submit">
                    {editingAnnouncement ? "Update" : "Add Announcement"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{announcements.length}</p>
                  <p className="text-xs text-muted-foreground">Total Announcements</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{activeCount}</p>
                  <p className="text-xs text-muted-foreground">Active on Website</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-primary rounded-lg p-3 overflow-hidden">
              <div className="flex gap-8 animate-marquee whitespace-nowrap">
                {announcements
                  .filter((a) => a.isActive)
                  .map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <span className="text-sm text-primary-foreground">{item.text}</span>
                      <span className="text-xs font-semibold bg-primary-foreground/20 text-primary-foreground px-3 py-1 rounded-full">
                        Register Now
                      </span>
                      <span className="text-primary-foreground/50">•</span>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <Card>
          <CardHeader>
            <CardTitle>All Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    announcement.isActive ? "bg-secondary/30" : "bg-muted/30 opacity-60"
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="font-medium text-sm truncate">{announcement.text}</p>
                    {announcement.link && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <LinkIcon className="w-3 h-3" />
                        <span className="truncate">{announcement.link}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={announcement.isActive ? "default" : "secondary"}>
                      {announcement.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Switch
                      checked={announcement.isActive}
                      onCheckedChange={() => toggleActive(announcement.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDialog(announcement)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(announcement.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnnouncements;