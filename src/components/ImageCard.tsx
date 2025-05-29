
import React, { useState } from 'react';
import { GitHubItem } from '../services/githubService';

interface ImageCardProps {
  image: GitHubItem;
  language: string;
  onImageClick: (image: GitHubItem) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, language, onImageClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const formatImageName = (name: string) => {
    return name
      .replace(/\.[^/.]+$/, '')
      .replace(/_/g, ' ')
      .replace(/-/g, ' ');
  };

  const handleClick = () => {
    onImageClick(image);
  };

  return (
    <div 
      className="border border-border rounded-lg overflow-hidden bg-background hover:bg-secondary/30 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-[3/4] bg-muted">
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-foreground"></div>
          </div>
        )}
        
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <p className="text-xs text-muted-foreground">Failed to load</p>
          </div>
        )}
        
        <img
          src={image.download_url}
          alt={formatImageName(image.name)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm text-foreground truncate" title={formatImageName(image.name)}>
          {formatImageName(image.name)}
        </h3>
      </div>
    </div>
  );
};

export default ImageCard;
