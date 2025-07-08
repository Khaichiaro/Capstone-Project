// components/slideCard/SlideCard.tsx
import React, { useState, useEffect } from 'react';


interface SlideCardProps {
  slides: {
    id: number;
    title: string;
    subtitle: string;
    redText?: string;
    image: string;
    buttonText: string;
  }[];
}

const SlideCard: React.FC<SlideCardProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full relative overflow-hidden rounded-lg mb-8">
      <div className="w-full overflow-hidden relative">
        <div 
          className="flex relative w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full h-80 flex bg-green-50 p-5">
              <div className="flex-1 flex flex-col justify-center px-5">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">{slide.title}</h2>
                <h3 className="text-2xl text-gray-800 mb-5">{slide.subtitle}</h3>
                {slide.redText && (
                  <h2 className="text-red-500 text-4xl font-bold mb-8">{slide.redText}</h2>
                )}
                <button className="bg-green-300 hover:bg-green-400 text-gray-800 font-semibold py-3 px-6 rounded-full w-fit transition-colors">
                  {slide.buttonText}
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <img 
                  src="/api/placeholder/300/250" 
                  alt={slide.title}
                  className="max-w-full max-h-64 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center space-x-3 mt-4 absolute bottom-4 w-full">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-10 h-2 rounded-full cursor-pointer transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-gray-300 bg-opacity-70'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideCard;