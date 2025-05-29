import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { GitHubItem } from "../services/githubService";

interface ImageModalProps {
  image: GitHubItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, isOpen, onClose }) => {
  if (!image) return null;

  const formatImageName = (name: string) => {
    return name
      .replace(/\.[^/.]+$/, "")
      .replace(/_/g, " ")
      .replace(/-/g, " ");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image.download_url;
    link.download = image.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 rounded-full bg-black p-2 text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col">
            <div className="relative bg-black">
              <img
                src={image.download_url}
                alt={formatImageName(image.name)}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            <div className="p-6 bg-background">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">
                    {formatImageName(image.name)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click to download the image
                  </p>
                </div>

                <Button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <Download size={16} />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
