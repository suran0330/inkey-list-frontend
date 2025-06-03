"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption?: string;
}

interface ReviewMediaGalleryProps {
  media: MediaItem | MediaItem[];
  onClose: () => void;
}

export default function ReviewMediaGallery({ media, onClose }: ReviewMediaGalleryProps) {
  const mediaArray = Array.isArray(media) ? media : [media];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentMedia = mediaArray[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mediaArray.length - 1));
    setIsPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < mediaArray.length - 1 ? prev + 1 : 0));
    setIsPlaying(false);
  };

  const handleVideoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        className="relative max-w-4xl max-h-full w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <div className="text-white">
            {mediaArray.length > 1 && (
              <span className="text-sm font-inter">
                {currentIndex + 1} of {mediaArray.length}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Main Media Content */}
        <div className="relative flex items-center justify-center min-h-[60vh]">
          {currentMedia.type === 'image' ? (
            <img
              src={currentMedia.url}
              alt={currentMedia.caption || 'Review media'}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          ) : (
            <div className="relative">
              <video
                src={currentMedia.url}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                controls={isPlaying}
                autoPlay={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                poster={currentMedia.thumbnail}
              />
              {!isPlaying && (
                <button
                  onClick={handleVideoPlay}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg hover:bg-opacity-60 transition-all"
                >
                  <div className="bg-white rounded-full p-4">
                    <Play className="h-8 w-8 text-black ml-1" />
                  </div>
                </button>
              )}
            </div>
          )}

          {/* Navigation Arrows */}
          {mediaArray.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}
        </div>

        {/* Caption */}
        {currentMedia.caption && (
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="text-white text-sm font-inter bg-black bg-opacity-50 rounded-lg px-4 py-2">
              {currentMedia.caption}
            </p>
          </div>
        )}

        {/* Thumbnail Navigation */}
        {mediaArray.length > 1 && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2 bg-black bg-opacity-50 rounded-lg p-2">
              {mediaArray.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-12 h-12 rounded border-2 overflow-hidden ${
                    index === currentIndex ? 'border-white' : 'border-gray-400'
                  }`}
                >
                  <img
                    src={item.type === 'video' ? item.thumbnail || item.url : item.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
