import React, { useState, useEffect } from "react";
import { useFetchDirectories } from "../services/githubService";

const BackgroundImages: React.FC = () => {
  const { directories } = useFetchDirectories();
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);

  useEffect(() => {
    const getRandomImages = async () => {
      if (directories.length === 0) return;

      const imageModules = import.meta.glob(
        "/src/assets/**/*.{png,jpg,jpeg,gif,webp}",
        {
          eager: true,
          as: "url",
        }
      );

      const allImages = Object.values(imageModules) as string[];

      const shuffled = allImages.sort(() => 0.5 - Math.random());
      const selectedImages = shuffled.slice(0, 20);

      setBackgroundImages(selectedImages);
    };

    getRandomImages();
  }, [directories]);

  if (backgroundImages.length === 0) return null;

  return (
    <div className="fixed inset-0 overflow-hidden opacity-50 pointer-events-none z-0">
      {backgroundImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          className="absolute w-32 h-40 object-cover rounded-lg opacity-0 fade-in"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            transform: `rotate(${Math.random() * 30 - 15}deg) scale(${
              0.8 + Math.random() * 0.4
            })`,
            animationDelay: `${index * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundImages;
