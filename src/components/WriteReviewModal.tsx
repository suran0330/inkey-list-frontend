"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Upload, X, Camera, Video, Heart, MapPin, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
}

export default function WriteReviewModal({ isOpen, onClose, productId, productName }: WriteReviewModalProps) {
  const { state: authState } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [skinType, setSkinType] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [skinConcerns, setSkinConcerns] = useState<string[]>([]);
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [timeUsed, setTimeUsed] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [beforePhoto, setBeforePhoto] = useState("");
  const [afterPhoto, setAfterPhoto] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [pros, setPros] = useState(["", "", ""]);
  const [cons, setCons] = useState(["", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!rating) {
      setError("Please select a rating");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a review title");
      return;
    }

    if (!content.trim()) {
      setError("Please write your review");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, this would submit to your backend
    console.log("Review submitted:", {
      productId,
      rating,
      title,
      content,
      skinType,
      ageRange,
      skinConcerns,
      wouldRecommend,
      timeUsed,
      photos,
      beforeAfter: beforePhoto && afterPhoto ? { before: beforePhoto, after: afterPhoto, timeframe } : undefined,
      pros: pros.filter(p => p.trim()),
      cons: cons.filter(c => c.trim()),
      userId: authState.user?.id
    });

    // Reset form and close modal
    handleClose();
    setIsSubmitting(false);

    // Show success message (in a real app, you might want to use a toast)
    alert("Thank you for your review! It will be published after moderation.");
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setRating(0);
      setHoverRating(0);
      setTitle("");
      setContent("");
      setSkinType("");
      setAgeRange("");
      setSkinConcerns([]);
      setWouldRecommend(null);
      setTimeUsed("");
      setPhotos([]);
      setVideos([]);
      setBeforePhoto("");
      setAfterPhoto("");
      setTimeframe("");
      setPros(["", "", ""]);
      setCons(["", "", ""]);
      setError("");
      onClose();
    }
  };

  const updatePro = (index: number, value: string) => {
    const newPros = [...pros];
    newPros[index] = value;
    setPros(newPros);
  };

  const updateCon = (index: number, value: string) => {
    const newCons = [...cons];
    newCons[index] = value;
    setCons(newCons);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      return (
        <button
          key={i}
          type="button"
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
          className="focus:outline-none"
        >
          <Star
            className={`h-8 w-8 transition-colors ${
              starValue <= (hoverRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 hover:text-yellow-200'
            }`}
          />
        </button>
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-white border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#1c1c22] font-lato">
            Write a Review
          </DialogTitle>
          <p className="text-[#747474] text-sm font-inter">
            Share your experience with {productName}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-inter">{error}</p>
            </div>
          )}

          {/* Rating */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-[#1c1c22] font-inter">
              Overall Rating *
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex">{renderStars()}</div>
              {rating > 0 && (
                <span className="text-sm text-[#747474] font-inter">
                  {rating}/5 stars
                </span>
              )}
            </div>
          </div>

          {/* Review Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1c1c22] font-inter">
              Review Title *
            </label>
            <Input
              placeholder="Summarize your experience in a few words"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              className="border-[#c1c0cb] focus:border-[#746cad]"
              maxLength={100}
            />
            <p className="text-xs text-[#97979d] font-inter">
              {title.length}/100 characters
            </p>
          </div>

          {/* Review Content */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1c1c22] font-inter">
              Your Review *
            </label>
            <Textarea
              placeholder="Tell us about your experience with this product. How did it work for you? What did you like or dislike?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
              className="border-[#c1c0cb] focus:border-[#746cad] min-h-[120px]"
              maxLength={1000}
            />
            <p className="text-xs text-[#97979d] font-inter">
              {content.length}/1000 characters
            </p>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#1c1c22] font-inter">
                Skin Type
              </label>
              <select
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                disabled={isSubmitting}
                className="w-full border border-[#c1c0cb] rounded-lg px-3 py-2 text-sm font-inter focus:border-[#746cad]"
              >
                <option value="">Select skin type</option>
                <option value="Normal">Normal</option>
                <option value="Dry">Dry</option>
                <option value="Oily">Oily</option>
                <option value="Combination">Combination</option>
                <option value="Sensitive">Sensitive</option>
                <option value="Mature">Mature</option>
                <option value="Acne-prone">Acne-prone</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#1c1c22] font-inter">
                Age Range
              </label>
              <select
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                disabled={isSubmitting}
                className="w-full border border-[#c1c0cb] rounded-lg px-3 py-2 text-sm font-inter focus:border-[#746cad]"
              >
                <option value="">Select age range</option>
                <option value="Under 18">Under 18</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55-64">55-64</option>
                <option value="65+">65+</option>
              </select>
            </div>
          </div>

          {/* Photo and Video Upload */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-[#1c1c22] font-inter">
              Add Photos & Videos (Optional)
            </label>
            <p className="text-xs text-[#747474] font-inter">
              Help other customers by sharing photos or videos of your experience
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Photo Upload */}
              <div className="space-y-3">
                <div className="border-2 border-dashed border-[#c1c0cb] rounded-lg p-6 text-center hover:border-[#746cad] transition-colors">
                  <Camera className="h-8 w-8 text-[#c1c0cb] mx-auto mb-3" />
                  <p className="text-sm font-medium text-[#1c1c22] mb-1 font-inter">Upload Photos</p>
                  <p className="text-xs text-[#747474] mb-3 font-inter">JPG, PNG up to 10MB each</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-[#746cad] text-[#746cad] hover:bg-[#746cad] hover:text-white"
                    onClick={() => {
                      // Simulate photo upload
                      const newPhoto = `https://images.unsplash.com/photo-${Date.now()}?w=400`;
                      setPhotos(prev => [...prev, newPhoto]);
                    }}
                  >
                    Choose Photos
                  </Button>
                </div>

                {photos.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[#1c1c22] font-inter">
                      Uploaded Photos ({photos.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={`https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=80&h=80&fit=crop`}
                            alt={`Upload ${index + 1}`}
                            className="w-16 h-16 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => setPhotos(prev => prev.filter((_, i) => i !== index))}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div className="space-y-3">
                <div className="border-2 border-dashed border-[#c1c0cb] rounded-lg p-6 text-center hover:border-[#746cad] transition-colors">
                  <Video className="h-8 w-8 text-[#c1c0cb] mx-auto mb-3" />
                  <p className="text-sm font-medium text-[#1c1c22] mb-1 font-inter">Upload Videos</p>
                  <p className="text-xs text-[#747474] mb-3 font-inter">MP4, MOV up to 50MB each</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-[#746cad] text-[#746cad] hover:bg-[#746cad] hover:text-white"
                    onClick={() => {
                      // Simulate video upload
                      const newVideo = `https://sample-videos.com/video-${Date.now()}.mp4`;
                      setVideos(prev => [...prev, newVideo]);
                    }}
                  >
                    Choose Videos
                  </Button>
                </div>

                {videos.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[#1c1c22] font-inter">
                      Uploaded Videos ({videos.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {videos.map((video, index) => (
                        <div key={index} className="relative">
                          <div className="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center">
                            <Video className="h-6 w-6 text-gray-500" />
                          </div>
                          <button
                            type="button"
                            onClick={() => setVideos(prev => prev.filter((_, i) => i !== index))}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Before/After Photos */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-[#1c1c22] font-inter">
              Before & After Photos (Optional)
            </label>
            <p className="text-xs text-[#747474] font-inter">
              Show your transformation over time
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-[#1c1c22] font-inter">Before Photo</label>
                <div className="border-2 border-dashed border-[#c1c0cb] rounded-lg p-4 text-center hover:border-[#746cad] transition-colors">
                  {beforePhoto ? (
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1594824311694-8b818d4c1b5d?w=200&h=150&fit=crop"
                        alt="Before"
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => setBeforePhoto("")}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full h-24 text-[#746cad]"
                      onClick={() => setBeforePhoto("sample-before.jpg")}
                    >
                      <Camera className="h-6 w-6 mr-2" />
                      Add Before Photo
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-[#1c1c22] font-inter">After Photo</label>
                <div className="border-2 border-dashed border-[#c1c0cb] rounded-lg p-4 text-center hover:border-[#746cad] transition-colors">
                  {afterPhoto ? (
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=200&h=150&fit=crop"
                        alt="After"
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => setAfterPhoto("")}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full h-24 text-[#746cad]"
                      onClick={() => setAfterPhoto("sample-after.jpg")}
                    >
                      <Camera className="h-6 w-6 mr-2" />
                      Add After Photo
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {beforePhoto && afterPhoto && (
              <div className="space-y-2">
                <label className="block text-xs font-medium text-[#1c1c22] font-inter">
                  Time between photos
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full border border-[#c1c0cb] rounded-lg px-3 py-2 text-sm font-inter focus:border-[#746cad]"
                >
                  <option value="">Select timeframe</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="2 months">2 months</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                </select>
              </div>
            )}
          </div>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-[#1c1c22] font-inter">
                What did you like? (Optional)
              </label>
              {pros.map((pro, index) => (
                <Input
                  key={index}
                  placeholder={`Pro ${index + 1}`}
                  value={pro}
                  onChange={(e) => updatePro(index, e.target.value)}
                  disabled={isSubmitting}
                  className="border-[#c1c0cb] focus:border-[#746cad]"
                />
              ))}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-[#1c1c22] font-inter">
                What could be improved? (Optional)
              </label>
              {cons.map((con, index) => (
                <Input
                  key={index}
                  placeholder={`Con ${index + 1}`}
                  value={con}
                  onChange={(e) => updateCon(index, e.target.value)}
                  disabled={isSubmitting}
                  className="border-[#c1c0cb] focus:border-[#746cad]"
                />
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-[#c1c0cb]">
            <Button
              type="submit"
              disabled={isSubmitting || !rating || !title.trim() || !content.trim()}
              className="flex-1 bg-[#746cad] hover:bg-[#aca4e9] text-white py-3 font-medium"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="border-[#c1c0cb] text-[#747474] hover:text-[#1c1c22]"
            >
              Cancel
            </Button>
          </div>

          {/* Guidelines */}
          <div className="p-4 bg-[#efeff0] rounded-lg">
            <h4 className="font-medium text-[#1c1c22] mb-2 font-inter">Review Guidelines:</h4>
            <ul className="text-xs text-[#747474] space-y-1 font-inter">
              <li>• Be honest and fair in your review</li>
              <li>• Focus on your personal experience with the product</li>
              <li>• Avoid offensive language or personal attacks</li>
              <li>• Reviews are moderated and may take 24-48 hours to appear</li>
            </ul>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
