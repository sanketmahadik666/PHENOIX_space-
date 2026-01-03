import { useState, useEffect } from "react";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Send, X } from "lucide-react";
import { toast } from "sonner";

interface ComposeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientEmail: string;
  recipientName: string;
}

export const ComposeEmailModal = ({
  isOpen,
  onClose,
  recipientEmail,
  recipientName,
}: ComposeEmailModalProps) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSubject(`Re: Enquiry from ${recipientName}`);
      setMessage("");
    }
  }, [isOpen, recipientName]);

  const handleSend = () => {
    if (!subject || !message) {
      toast.error("Please fill in both subject and message");
      return;
    }

    // Strip HTML tags for mailto body compatibility (basic version)
    // For a real production app, you'd likely use a backend service like SendGrid/AWS SES
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = message;
    const plainTextBody = tempDiv.textContent || tempDiv.innerText || "";

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(plainTextBody)}`;

    window.location.href = mailtoLink;
    toast.success("Opening default email client...");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Compose Email</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="to" className="text-right">
              To
            </Label>
            <Input
              id="to"
              value={recipientEmail}
              disabled
              className="col-span-3 bg-muted"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Subject
            </Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="space-y-2">
            <Label>Message</Label>
            <div className="h-60 mb-12">
              <ReactQuill
                theme="snow"
                value={message}
                onChange={setMessage}
                className="h-48"
                placeholder="Type your message here..."
              />
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between w-full">
          <Button variant="ghost" onClick={onClose} className="mr-auto">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSend}>
            <Send className="w-4 h-4 mr-2" />
            Send Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
