import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAddStudent, useBulkEnrollStudents, useCoursesAdmin } from "@/hooks/useSupabaseQuery";
import { parseStudentCSV, ParseResult } from "@/utils/csvParser";
import { Upload, FileUp, CheckCircle2, AlertCircle, Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import { downloadCSV } from "@/utils/exportUtils";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStudentModal = ({ isOpen, onClose }: AddStudentModalProps) => {
  const [activeTab, setActiveTab] = useState("manual");
  const { data: courses = [] } = useCoursesAdmin();
  
  // Manual Form State
  const addStudentMutation = useAddStudent();
  const [manualForm, setManualForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    join_date: new Date().toISOString().split('T')[0]
  });

  // Bulk Upload State
  const bulkEnrollMutation = useBulkEnrollStudents();
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [uploadStats, setUploadStats] = useState<{ success: number; duplicates: string[]; errors: string[] } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Manual Handlers
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.course) {
      toast.error("Please select a course");
      return;
    }

    try {
      // 1. Create Student
      const student = await addStudentMutation.mutateAsync({
        name: manualForm.name,
        email: manualForm.email,
        phone: manualForm.phone,
        join_date: manualForm.join_date
      });

      // 2. Enroll (reuse logic or simple insert? Reusing bulk logic for consistent enrollment would be ideal but complex here without refactor)
      // For now, let's just create the student as the base requirement. 
      // Actually, user asked for "check duplicate whether they have same course".
      // So I should try to enroll them.
      
      // Let's use the bulk mutation for single entry to reuse the complex enrollment logic!
      const singleData = [{
        name: manualForm.name,
        email: manualForm.email,
        mobile: manualForm.phone,
        course: courses.find(c => c.id === manualForm.course)?.name || "",
        rowNumber: 1
      }];

      const result = await bulkEnrollMutation.mutateAsync(singleData);
      
      if (result.success > 0) {
        toast.success("Student added and enrolled successfully");
        setManualForm({ name: "", email: "", phone: "", course: "", join_date: new Date().toISOString().split('T')[0] });
        onClose();
      } else if (result.duplicates.length > 0) {
        toast.warning(result.duplicates[0]);
      } else if (result.errors.length > 0) {
        toast.error(result.errors[0]);
      }

    } catch (error: any) {
      toast.error(error.message || "Failed to add student");
    }
  };

  // Bulk Handlers
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await parseStudentCSV(file);
    setParseResult(result);
    setUploadStats(null); // Reset stats on new file
  };

  const handleBulkProcess = async () => {
    if (!parseResult?.data || parseResult.data.length === 0) return;

    setIsProcessing(true);
    try {
      const stats = await bulkEnrollMutation.mutateAsync(parseResult.data);
      setUploadStats(stats);
      if (stats.success > 0) {
        toast.success(`Successfully enrolled ${stats.success} students`);
      }
      if (stats.errors.length > 0 || stats.duplicates.length > 0) {
        toast.warning("Some records required attention");
      }
    } catch (error: any) {
      toast.error("Bulk process failed: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    const template = [{
      "Student Name": "John Doe",
      "Email Address": "john@example.com",
      "Mobile": "+971501234567",
      "Course Name": "Advanced Excel" 
    }];
    downloadCSV(template, "student_upload_template");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] h-[85vh] sm:h-auto overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Add a single student manually or upload a CSV file for bulk enrollment.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto py-4 px-1">
            {/* MANUAL TAB */}
            <TabsContent value="manual" className="space-y-4 m-0">
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    required
                    value={manualForm.name}
                    onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={manualForm.email}
                      onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone / Mobile</Label>
                    <Input
                      id="phone"
                      required
                      value={manualForm.phone}
                      onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select 
                    value={manualForm.course} 
                    onValueChange={(val) => setManualForm({ ...manualForm, course: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course to enroll" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course: any) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="join_date">Join Date</Label>
                  <Input
                    id="join_date"
                    type="date"
                    required
                    value={manualForm.join_date}
                    onChange={(e) => setManualForm({ ...manualForm, join_date: e.target.value })}
                  />
                </div>
                
                <Alert className="bg-muted border-primary/20">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Note</AlertTitle>
                  <AlertDescription>
                    This will create a student record. To enroll them in a batch, please go to the Batches page or use Bulk Upload.
                  </AlertDescription>
                </Alert>

                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={addStudentMutation.isPending}>
                    {addStudentMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Student
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* BULK TAB */}
            <TabsContent value="bulk" className="space-y-4 m-0">
              <div className="flex items-center justify-between p-4 border border-dashed rounded-lg bg-secondary/20">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">1. Download Template</h4>
                  <p className="text-xs text-muted-foreground">Use this CSV template for your data.</p>
                </div>
                <Button variant="outline" size="sm" onClick={downloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Template
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-dashed rounded-lg bg-secondary/20">
                <div className="space-y-1">
                   <h4 className="text-sm font-medium">2. Upload CSV File</h4>
                   <p className="text-xs text-muted-foreground">Select your filled CSV file.</p>
                </div>
                 <div className="flex items-center gap-2">
                    <Input 
                      type="file" 
                      accept=".csv" 
                      className="hidden" 
                      id="csv-upload"
                      onChange={handleFileUpload}
                    />
                    <Label htmlFor="csv-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
                      <FileUp className="mr-2 h-4 w-4" />
                      Select File
                    </Label>
                 </div>
              </div>

              {/* Data Preview */}
              {parseResult && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">
                      Preview: {parseResult.data.length} valid rows
                    </h4>
                    {parseResult.errors.length > 0 && (
                      <Badge variant="destructive">{parseResult.errors.length} Parsing Errors</Badge>
                    )}
                  </div>

                  {parseResult.errors.length > 0 && (
                     <ScrollArea className="h-24 rounded border p-2 bg-destructive/10 text-destructive text-sm">
                        {parseResult.errors.map((err, i) => (
                           <div key={i} className="mb-1">• {err}</div>
                        ))}
                     </ScrollArea>
                  )}

                  {parseResult.data.length > 0 && !uploadStats && (
                     <div className="rounded-md border p-4 bg-muted/50">
                        <p className="text-sm text-muted-foreground mb-4">
                           Ready to process <strong>{parseResult.data.length}</strong> students. 
                           This will check for duplicates and enroll them in the latest active batch.
                        </p>
                        <Button className="w-full" onClick={handleBulkProcess} disabled={isProcessing}>
                           {isProcessing ? (
                             <>
                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                               Processing...
                             </>
                           ) : (
                             <>
                               <Upload className="mr-2 h-4 w-4" />
                               Process Import
                             </>
                           )}
                        </Button>
                     </div>
                  )}
                </div>
              )}

              {/* Results Summary */}
              {uploadStats && (
                <div className="space-y-4 border-t pt-4">
                  <h4 className="font-semibold text-sm">Import Results</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-green-100 rounded text-center">
                       <div className="text-2xl font-bold text-green-700">{uploadStats.success}</div>
                       <div className="text-xs text-green-800">Added</div>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded text-center">
                       <div className="text-2xl font-bold text-yellow-700">{uploadStats.duplicates.length}</div>
                       <div className="text-xs text-yellow-800">Duplicates</div>
                    </div>
                    <div className="p-3 bg-red-100 rounded text-center">
                       <div className="text-2xl font-bold text-red-700">{uploadStats.errors.length}</div>
                       <div className="text-xs text-red-800">Errors</div>
                    </div>
                  </div>
                  
                  {(uploadStats.errors.length > 0 || uploadStats.duplicates.length > 0) && (
                     <ScrollArea className="h-32 rounded border p-2 text-sm">
                        {uploadStats.errors.map((err, i) => (
                           <div key={`err-${i}`} className="text-red-600 mb-1 flex gap-2">
                             <AlertCircle className="w-3 h-3 mt-1 shrink-0" /> {err}
                           </div>
                        ))}
                        {uploadStats.duplicates.map((dup, i) => (
                           <div key={`dup-${i}`} className="text-yellow-600 mb-1 flex gap-2">
                             <CheckCircle2 className="w-3 h-3 mt-1 shrink-0" /> {dup}
                           </div>
                        ))}
                     </ScrollArea>
                  )}
                  
                  <Button variant="outline" className="w-full" onClick={() => {
                    setParseResult(null);
                    setUploadStats(null);
                  }}>
                    Start New Upload
                  </Button>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
