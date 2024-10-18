import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BannerSlider = ({ slides }) => {
  const [bannerSlide, setBannerSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          className={`${
            index === bannerSlide ? "opacity-100" : "opacity-0"
          } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
        />
      ))}
      <Button
        onClick={() =>
          setBannerSlide((prev) => (prev - 1 + slides.length) % slides.length)
        }
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 "
      >
        <ChevronLeft className="size-8" />
      </Button>
      <Button
        onClick={() => setBannerSlide((prev) => (prev + 1) % slides.length)}
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 "
      >
        <ChevronRight className="size-8" />
      </Button>
    </div>
  );
};

export default React.memo(BannerSlider);
