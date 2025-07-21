import { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { PARTNER_COMPANIES } from '../utils/constants';

const PartnerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  // Responsive slides count
  useEffect(() => {
    const updateVisibleSlides = () => {
      if (window.innerWidth < 640) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 768) {
        setVisibleSlides(2);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(3);
      } else {
        setVisibleSlides(4);
      }
    };

    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);
    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => 
          prev >= PARTNER_COMPANIES.length - visibleSlides ? 0 : prev + 1
        );
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, visibleSlides]);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev >= PARTNER_COMPANIES.length - visibleSlides ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev <= 0 ? PARTNER_COMPANIES.length - visibleSlides : prev - 1
    );
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="section-padding bg-gradient-surface">
      <div className="container-modern">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="responsive-text-4xl font-bold text-foreground mb-4">
            شركاؤنا المتميزون
          </h2>
          <h3 className="responsive-text-2xl text-primary mb-6">
            Our Distinguished Partners
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            نفخر بشراكتنا مع أكبر الشركات في المملكة العربية السعودية لتقديم أفضل الخدمات اللوجستية
          </p>
        </div>

        <div 
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="carousel-nav absolute left-4 top-1/2 -translate-y-1/2 z-10"
            aria-label="Previous partners"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="carousel-nav absolute right-4 top-1/2 -translate-y-1/2 z-10"
            aria-label="Next partners"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden mx-16">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`
              }}
            >
              {PARTNER_COMPANIES.map((partner, index) => (
                <div
                  key={partner.id}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / visibleSlides}%` }}
                >
                  <div className="modern-card p-8 h-48 flex flex-col items-center justify-center group">
                    <div className="w-full h-24 flex items-center justify-center mb-4">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Mb2dvPC90ZXh0Pgo8L3N2Zz4K';
                        }}
                      />
                    </div>
                    <h4 className="font-semibold text-foreground text-center mb-2">
                      {partner.name}
                    </h4>
                    <span className="text-sm text-muted-foreground text-center">
                      {partner.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(PARTNER_COMPANIES.length / visibleSlides) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * visibleSlides)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  Math.floor(currentIndex / visibleSlides) === index
                    ? 'bg-primary scale-110'
                    : 'bg-border hover:bg-primary/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center animate-slide-up">
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-muted-foreground">Active Partners</div>
          </div>
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-3xl font-bold text-primary mb-2">5+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerCarousel;