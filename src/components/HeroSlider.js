import React, { useState, useEffect } from 'react';

const HeroSlider = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const defaultSlides = [
    {
      id: 1,
      title: 'Custom 3D Keychains',
      subtitle: 'PERSONALIZED DESIGNS',
      description: 'starting at ₹50',
      cta: 'SHOP NOW',
      image: '/images/hero/keychain.jpg',
      textColor: 'text-white',
      highlighted: 'text-pink-500'
    },
    {
      id: 2,
      title: 'Stunning Lithoframes',
      subtitle: 'PHOTO TO 3D ART',
      description: 'Transform Your Photos',
      cta: 'EXPLORE',
      image: '/images/hero/lithoframe.jpg',
      textColor: 'text-white',
      highlighted: 'text-blue-500'
    },
    {
      id: 3,
      title: '3D Printed Lamps',
      subtitle: 'MODERN LIGHTING',
      description: 'Unique Illumination',
      cta: 'DISCOVER',
      image: '/images/hero/lamp.jpg',
      textColor: 'text-white',
      highlighted: 'text-yellow-600'
    },
    {
      id: 4,
      title: 'Desk Organizers',
      subtitle: 'STYLISH PEN HOLDERS',
      description: 'Keep Your Desk Neat',
      cta: 'VIEW',
      image: '/images/hero/organizer.jpg',
      textColor: 'text-white',
      highlighted: 'text-green-600'
    },
    {
      id: 5,
      title: 'Bespoke 3D Items',
      subtitle: 'CUSTOM CREATIONS',
      description: 'Design Your Own',
      cta: 'CREATE NOW',
      image: '/images/hero/custom.jpg',
      textColor: 'text-white',
      highlighted: 'text-purple-600'
    }
  ];

  const items = slides.length > 0 ? slides : defaultSlides;

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, items.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const slide = items[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-white">
      <div className="relative h-96 sm:h-[500px] md:h-[600px] overflow-hidden">
        
        {/* 1. BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-right md:object-center"
          />
          {/* 2. GRADIENT OVERLAY (Fades from white to transparent) */}
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-black/75 via-black/40 to-transparent"></div>
        </div>

        {/* 3. CONTENT LAYER (Z-10 ensures it's above image and gradient) */}
        <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="lg:w-1/2 w-full transition-all duration-700 ease-in-out">
            <h3 className={`text-sm md:text-base font-bold mb-2 tracking-widest uppercase ${slide.highlighted}`}>
              {slide.subtitle}
            </h3>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight ${slide.textColor} drop-shadow-lg`}>
              {slide.title}
            </h2>
            <p className={`text-lg md:text-xl mb-8 font-medium ${slide.textColor} text-white/85`}>
              {slide.description}
            </p>
            <button className="px-8 py-3 md:px-10 md:py-4 text-white font-bold rounded-full transition transform hover:scale-105 active:scale-95 bg-gradient-to-r from-pink-600 to-orange-500 hover:shadow-xl shadow-md">
              {slide.cta}
            </button>
          </div>
        </div>

        {/* 4. NAVIGATION CONTROLS */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? 'w-10 h-2 bg-pink-500'
                  : 'w-2 h-2 bg-gray-400 hover:bg-gray-600'
              } rounded-full`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
