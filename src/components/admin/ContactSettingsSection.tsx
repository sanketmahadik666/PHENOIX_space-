import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Trash2, Plus, Eye, EyeOff } from "lucide-react";
import {
  useContactSettings,
  useAddContactSetting,
  useUpdateContactSetting,
  useDeleteContactSetting,
  ContactSetting,
} from "@/hooks/useContactSettings";
import { toast } from "sonner";

export const ContactSettingsSection = () => {
  const { data: settings, isLoading } = useContactSettings();
  const addMutation = useAddContactSetting();
  const updateMutation = useUpdateContactSetting();
  const deleteMutation = useDeleteContactSetting();

  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newType, setNewType] = useState<ContactSetting["type"]>("link");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!newLabel || !newValue) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await addMutation.mutateAsync({
        label: newLabel,
        value: newValue,
        type: newType,
        is_visible: true,
      });
      toast.success("Contact method added");
      setNewLabel("");
      setNewValue("");
      setIsAdding(false);
    } catch (error) {
      toast.error("Failed to add contact method");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Contact method deleted");
    } catch (error) {
      toast.error("Failed to delete contact method");
    }
  };

  const handleToggleVisibility = async (setting: ContactSetting) => {
    try {
      await updateMutation.mutateAsync({
        id: setting.id,
        updates: { is_visible: !setting.is_visible },
      });
      toast.success(`Visibility ${!setting.is_visible ? "enabled" : "disabled"}`);
    } catch (error) {
      toast.error("Failed to update visibility");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Contact Methods</CardTitle>
        </div>
        <CardDescription>
          Manage contact links displayed in the "Reach Us" modal.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* List of existing settings */}
        <div className="space-y-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : settings?.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              No contact methods added yet.
            </div>
          ) : (
            settings?.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{setting.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground uppercase">
                      {setting.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{setting.value}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleVisibility(setting)}
                    title={setting.is_visible ? "Hide" : "Show"}
                  >
                    {setting.is_visible ? (
                      <Eye className="w-4 h-4 text-primary" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(setting.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add new setting form */}
        {isAdding ? (
          <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Label</Label>
                <Input
                  placeholder="e.g. Support Phone"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={newType} onValueChange={(v: any) => setNewType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="link">Other Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Value</Label>
                <Input
                  placeholder="e.g. +971-50... or https://..."
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>Save</Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full border-dashed"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Contact Method
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
