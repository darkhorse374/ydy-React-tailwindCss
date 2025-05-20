
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FileUploadProps {
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
}

const FileUpload = ({ imagePreview, setImagePreview }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div className="flex gap-3">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-600"
        >
          <ImageIcon size={18} className="mr-2" />
          Image
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          className="text-gray-600"
        >
          <Upload size={18} className="mr-2" />
          Upload Article
        </Button>
      </div>

      {imagePreview && (
        <div className="relative rounded-md overflow-hidden border border-gray-200 mt-4">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="max-h-48 w-auto"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={removeImage}
          >
            <X size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
