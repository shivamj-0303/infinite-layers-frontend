import React, { useState, useEffect } from 'react';

const HeroSlider = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Default sample slides if none provided
  const defaultSlides = [
    {
      id: 1,
      title: 'Custom 3D Keychains',
      subtitle: 'PERSONALIZED DESIGNS',
      description: 'starting at $5.99',
      cta: 'SHOP NOW',
      image: 'linear-gradient(135deg, #fce7f3 0%, #fed7aa 100%)',
      textColor: 'text-black',
      highlighted: 'text-pink-500'
    },
    {
      id: 2,
      title: 'Stunning Lithophanes',
      subtitle: 'PHOTO TO 3D ART',
      description: 'Transform Your Photos',
      cta: 'EXPLORE',
      image: 'linear-gradient(135deg, #dbeafe 0%, #fce7f3 100%)',
      textColor: 'text-black',
      highlighted: 'text-blue-500'
    },
    {
      id: 3,
      title: '3D Printed Lamps',
      subtitle: 'MODERN LIGHTING',
      description: 'Unique Illumination',
      cta: 'DISCOVER',
      image: 'linear-gradient(135deg, #fef08a 0%, #fed7aa 100%)',
      textColor: 'text-black',
      highlighted: 'text-yellow-600'
    },
    {
      id: 4,
      title: 'Desk Organizers',
      subtitle: 'STYLISH PEN HOLDERS',
      description: 'Keep Your Desk Neat',
      cta: 'VIEW',
      image: 'linear-gradient(135deg, #dcfce7 0%, #dbeafe 100%)',
      textColor: 'text-black',
      highlighted: 'text-green-600'
    },
    {
      id: 5,
      title: 'Bespoke 3D Items',
      subtitle: 'CUSTOM CREATIONS',
      description: 'Design Your Own',
      cta: 'CREATE NOW',
      image: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)',
      textColor: 'text-black',
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
      {/* Slider Container */}
      <div className="relative h-96 sm:h-[500px] md:h-[600px] overflow-hidden rounded-lg">
        {/* Slide */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-in-out flex items-center"
          style={{ background: slide.image }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h3 className={`text-sm md:text-base font-semibold mb-2 tracking-widest ${slide.highlighted}`}>
                {slide.subtitle}
              </h3>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${slide.textColor}`}>
                {slide.title}
              </h2>
              <p className={`text-lg md:text-xl mb-8 ${slide.textColor}`}>
                {slide.description}
              </p>
              <button className={`px-8 py-3 md:px-10 md:py-4 text-white font-bold rounded-full transition transform hover:scale-105 active:scale-95 bg-gradient-to-r from-pink-500 to-orange-500 hover:shadow-lg hover:shadow-pink-300`}>
                {slide.cta}
              </button>
            </div>

            {/* Right Decorative Element */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full bg-white bg-opacity-10 blur-3xl"></div>
                <div className="absolute inset-8 rounded-full border-2 border-white border-opacity-20"></div>
                <div className="absolute inset-16 rounded-full border-2 border-white border-opacity-10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentSlide
                  ? 'w-8 h-3 bg-white'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/75'
              } rounded-full`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
