
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";

interface ConnectionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectionRequestModal = ({ isOpen, onClose }: ConnectionRequestModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Connection Request Sent</DialogTitle>
          <DialogDescription className="text-center">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Your connection request has been sent successfully.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectionRequestModal;
