
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Resource } from "@/types/resource";
import { useToast } from "@/components/ui/use-toast";
import CreateArticleForm from "./CreateArticleForm";

interface CreateArticleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onArticleCreated: (article: Resource) => void;
}

const CreateArticleModal = ({ open, onOpenChange, onArticleCreated }: CreateArticleModalProps) => {
  const { toast } = useToast();

  const handleArticleCreated = (article: Resource) => {
    onArticleCreated(article);
    
    toast({
      title: "Success!",
      description: "Your article has been created",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-center text-[#6699FF]">
            Create Article
          </DialogTitle>
        </DialogHeader>
        
        <CreateArticleForm 
          onArticleCreated={handleArticleCreated}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateArticleModal;
