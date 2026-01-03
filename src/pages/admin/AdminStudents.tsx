import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Mail, Phone, Calendar, Download, Plus } from "lucide-react";
import { downloadCSV } from "@/utils/exportUtils";
import { useStudents } from "@/hooks/useSupabaseQuery";
import { AddStudentModal } from "@/components/admin/AddStudentModal";

const AdminStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: students = [], isLoading } = useStudents();

  const filteredStudents = students.filter(
    (student: any) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Students</h1>
            <p className="text-muted-foreground">View and manage enrolled students.</p>
          </div>
          <div className="flex items-center gap-2">
             <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadCSV(students, "students-export")}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Badge variant="secondary" className="text-base px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              {students.length} Total Students
            </Badge>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Loading State */}
        {isLoading && <div className="text-center py-8">Loading students...</div>}

        {/* Students Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((student: any) => (
            <Card key={student.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{student.name}</h3>
                    <div className="space-y-1 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{student.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {new Date(student.join_date || student.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredStudents.length === 0 && !isLoading && (
            <div className="text-center py-12 text-muted-foreground">
                No students found.
            </div>
        )}

        <AddStudentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      </div>
    </AdminLayout>
  );
};

export default AdminStudents;