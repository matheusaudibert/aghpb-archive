import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ImageCard from "../components/ImageCard";
import ImageModal from "../components/ImageModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useFetchImages, GitHubItem } from "../services/githubService";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const LanguageDetail: React.FC = () => {
  const { language } = useParams<{ language: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<GitHubItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { images, loading, error } = useFetchImages(language || "");

  const formatLanguageName = (name: string | undefined) => {
    if (!name) return "";
    return name.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
  };

  const handleImageClick = (image: GitHubItem) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6 gap-2 px-0"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <h1 className="text-3xl font-light text-foreground mb-2">
              {formatLanguageName(language)}
            </h1>
            <p className="text-muted-foreground">{images.length} images</p>
          </div>

          {loading && (
            <div className="flex justify-center">
              <LoadingSpinner message="Loading images..." />
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <ErrorMessage
                message={error}
                onRetry={() => window.location.reload()}
              />
            </div>
          )}

          {!loading && !error && (
            <div className="card-container">
              {images.map((image) => (
                <ImageCard
                  key={image.sha}
                  image={image}
                  language={language || ""}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default LanguageDetail;
