import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File } from "lucide-react";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isDisabled: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  isDisabled,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label
        htmlFor="ocx-file"
        className="text-lg font-semibold mb-2 text-black"
      >
        Upload OCX File
      </Label>
      <div className="flex items-center space-x-2">
        <Input
          id="ocx-file"
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className="hidden"
          disabled={isDisabled}
        />
        <Button
          onClick={() => document.getElementById("ocx-file")?.click()}
          className="w-full py-6 text-lg flex items-center justify-center space-x-2 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isDisabled}
        >
          <Upload className="mr-2 h-5 w-5" />
          <span>{fileName || "Choose file"}</span>
        </Button>
      </div>
      {fileName && (
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <File className="mr-2 h-4 w-4" />
          <span>{fileName}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
