import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useContactSettings } from "@/hooks/useContactSettings";
import {
  Phone,
  Mail,
  Link as LinkIcon,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getIcon = (type: string) => {
  switch (type) {
    case "phone":
      return Phone;
    case "email":
      return Mail;
    case "whatsapp":
      return MessageCircle;
    case "instagram":
      return Instagram;
    case "linkedin":
      return Linkedin;
    case "facebook":
      return Facebook;
    case "twitter":
      return Twitter;
    case "youtube":
      return Youtube;
    default:
      return LinkIcon;
  }
};

const getHref = (type: string, value: string) => {
  switch (type) {
    case "phone":
      return `tel:${value}`;
    case "email":
      return `mailto:${value}`;
    case "whatsapp":
      return `https://wa.me/${value.replace(/\D/g, "")}`;
    default:
      return value.startsWith("http") ? value : `https://${value}`;
  }
};

export const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const { data: settings, isLoading } = useContactSettings();
  const visibleSettings = settings?.filter((s) => s.is_visible) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Get in Touch</DialogTitle>
          <DialogDescription className="text-center">
            Choose your preferred way to connect with us.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-3 py-4">
          {isLoading ? (
            <div className="flex justify-center py-4">Loading contact info...</div>
          ) : visibleSettings.length > 0 ? (
            visibleSettings.map((item) => {
              const Icon = getIcon(item.type);
              const href = getHref(item.type, item.value);
              
              return (
                <Button
                  key={item.id}
                  variant="outline"
                  className={cn(
                    "w-full justify-start gap-4 h-14 text-lg font-normal px-6",
                    "hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all pb-10 pt-10"
                  )}
                  asChild
                >
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <div className={cn(
                      "p-2 rounded-full",
                      item.type === "whatsapp" && "bg-green-100 text-green-600",
                      item.type === "instagram" && "bg-pink-100 text-pink-600",
                      item.type === "phone" && "bg-blue-100 text-blue-600",
                      item.type === "email" && "bg-orange-100 text-orange-600",
                      !["whatsapp", "instagram", "phone", "email"].includes(item.type) && "bg-slate-100 text-slate-600"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span>{item.label}</span>
                    <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
                  </a>
                </Button>
              );
            })
          ) : (
            <div className="text-center text-muted-foreground py-4">
              No contact information available at the moment.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
