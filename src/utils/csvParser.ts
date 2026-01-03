import Papa from "papaparse";

export interface ParsedStudent {
  name: string;
  email: string;
  mobile: string;
  course: string;
  rowNumber: number;
}

export interface ParseResult {
  data: ParsedStudent[];
  errors: string[];
}

export const parseStudentCSV = (file: File): Promise<ParseResult> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData: ParsedStudent[] = [];
        const errors: string[] = [];

        results.data.forEach((row: any, index) => {
          const rowNumber = index + 2; // +1 for 0-index, +1 for header
          
          // normalize keys to lowercase/trimmed to be forgiving
          const cleanRow: any = {};
          Object.keys(row).forEach(key => {
            cleanRow[key.trim().toLowerCase()] = row[key]?.trim();
          });

          const name = cleanRow["name"] || cleanRow["student name"];
          const email = cleanRow["email"] || cleanRow["email address"];
          const mobile = cleanRow["mobile"] || cleanRow["phone"] || cleanRow["phone number"];
          const course = cleanRow["course"] || cleanRow["course name"];

          const missingFields = [];
          if (!name) missingFields.push("Name");
          if (!email) missingFields.push("Email");
          if (!mobile) missingFields.push("Mobile");
          if (!course) missingFields.push("Course");

          if (missingFields.length > 0) {
            errors.push(`Row ${rowNumber}: Missing ${missingFields.join(", ")}`);
          } else {
            parsedData.push({
              name,
              email,
              mobile,
              course,
              rowNumber
            });
          }
        });

        if (results.errors && results.errors.length > 0) {
           results.errors.forEach(err => errors.push(`CSV Error row ${err.row}: ${err.message}`));
        }

        resolve({ data: parsedData, errors });
      },
      error: (error) => {
        resolve({ data: [], errors: [`File read error: ${error.message}`] });
      }
    });
  });
};
