"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

// Enhanced SVG Icons with better styling
const HeartIcon = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const PlayIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const PauseIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const SkipBackIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <polygon points="19,20 9,12 19,4" />
    <rect x="5" y="4" width="2" height="16" />
  </svg>
);

const SkipForwardIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <polygon points="5,4 15,12 5,20" />
    <rect x="17" y="4" width="2" height="16" />
  </svg>
);

const VolumeIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z" />
  </svg>
);

const MusicIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
  </svg>
);

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fallingHearts, setFallingHearts] = useState([]);
  const [progress, setProgress] = useState(30);
  const [currentTime, setCurrentTime] = useState(83);
  const [duration, setDuration] = useState(225);
  const [loveTime, setLoveTime] = useState(() => {
    const startDate = new Date("2024-01-10T21:00:00Z"); // especifique a data e hora do início do namoro aqui
    const now = new Date();
    const diff = now - startDate;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
    );
    const days = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { years, months, days, hours, minutes, seconds };
  });

  const resImages = [
    "exemplo 1.jpg",
    "exemplo 2.jpg",
    "exemplo 3.jpg",
    // ...adicione outros nomes de arquivos conforme necessário
  ];

  const imageTitles = [
    "Meu amor 💖",
    "Eu te amo 💕",
    "Minha princesa 👑",
    // ...adicione outros títulos conforme necessário
    //primeiro título é o do exemplo 1, segundo título é do exemplo 2, etc.
  ];

  const carouselImages = resImages.map((filename, idx) => ({
    src: `/images/${filename}`,
    alt: filename,
    title: imageTitles[idx] || "Momento especial",
  }));

  
  useEffect(() => {
    const generateHeart = () => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        animationDuration: 4 + Math.random() * 6,
        delay: Math.random() * 2,
        size: 16 + Math.random() * 24,
        opacity: 0.3 + Math.random() * 0.7,
        rotation: Math.random() * 360,
      };
      setFallingHearts((prev) => [...prev.slice(-12), newHeart]);
    };

    const interval = setInterval(generateHeart, 1500);
    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setLoveTime((prev) => {
        let { years, months, days, hours, minutes, seconds } = prev;
        seconds += 1;

        if (seconds >= 60) {
          seconds = 0;
          minutes += 1;
        }
        if (minutes >= 60) {
          minutes = 0;
          hours += 1;
        }
        if (hours >= 24) {
          hours = 0;
          days += 1;
        }
        if (days >= 30) {
          // Simplified month calculation
          days = 0;
          months += 1;
        }
        if (months >= 12) {
          months = 0;
          years += 1;
        }

        return { years, months, days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced carousel with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Music progress simulation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return newTime;
        });
        setProgress((prev) => Math.min(prev + 100 / duration, 100));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  }, [carouselImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  }, [carouselImages.length]);

 const formatTime = (seconds) => {
  const totalSeconds = Math.floor(seconds);
  const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const secs = (totalSeconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

  const skipToNext = () => {
    setCurrentTime(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const skipToPrev = () => {
    setCurrentTime(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const audioRef = useRef(null);

  function handleTimeUpdate() {
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setCurrentTime(current);
    setDuration(total);
    setProgress((current / total) * 100);
  }

  function handleLoadedMetadata() {
    setDuration(audioRef.current.duration);
  }

  return (
    <div className="romantic-container">

      <div className="hearts-overlay">
        {fallingHearts.map((heart) => (
          <HeartIcon
            key={heart.id}
            className="falling-heart"
            style={{
              left: `${heart.left}%`,
              top: "-50px",
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              opacity: heart.opacity,
              color: "#f472b6",
              animation: `fall ${heart.animationDuration}s linear ${heart.delay}s infinite`,
              transform: `rotate(${heart.rotation}deg)`,
            }}
          />
        ))}
      </div>

      {/* Floating particles background */}
      <div className="particles-bg"></div>

      {/* Main Content */}
      <div className="main-wrapper">
        {/* Enhanced Header */}
        <header className="site-header">
          <div className="header-content">
            <div className="logo-section">
              <HeartIcon className="logo-heart" />
              <span className="site-title">Nossa história de amor</span>
            </div>
            <div className="date-display">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </header>

        {/* Main Container */}
        <div className="content-grid">
          {/* Enhanced Carousel */}
          <div className="carousel-section">
            <div className="carousel-wrapper">
              <div className="image-container">
                <img
                  src={
                    carouselImages[currentImageIndex].src || "/placeholder.svg"
                  }
                  alt={carouselImages[currentImageIndex].alt}
                  className="carousel-image"
                />
                <div className="image-overlay">
                  <h3 className="image-title">
                    {carouselImages[currentImageIndex].title}
                  </h3>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="nav-arrow nav-prev"
                  aria-label="Previous image"
                >
                  <SkipBackIcon />
                </button>
                <button
                  onClick={nextImage}
                  className="nav-arrow nav-next"
                  aria-label="Next image"
                >
                  <SkipForwardIcon />
                </button>
              </div>

              {/* Enhanced Indicators */}
              <div className="carousel-indicators">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`indicator ${
                      idx === currentImageIndex ? "active" : ""
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          
            {/* Enhanced Music Player */}
            <div className="music-player">
              <div className="player-header">
                <div className="album-art">
                  <MusicIcon className="music-icon" />
                </div>
                <div className="song-info">
                  <h3 className="song-title">Eu te amo!</h3>
                  <p className="artist-name">Romantic Playlist • Spotify</p>
                </div>
                <VolumeIcon className="volume-icon" />
              </div>

              {/* Enhanced Progress Bar */}
              <div className="progress-section">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                  <div
                    className="progress-thumb"
                    style={{ left: `${progress}%` }}
                  />
                </div>
                <div className="time-labels">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Enhanced Controls */}
              <div className="player-controls">
                <button
                  onClick={skipToPrev}
                  className="control-btn"
                  aria-label="Previous track"
                >
                  <SkipBackIcon />
                </button>
                <button
                  onClick={togglePlay}
                  className="play-btn"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button
                  onClick={skipToNext}
                  className="control-btn"
                  aria-label="Next track"
                >
                  <SkipForwardIcon />
                </button>
              </div>

              {/* Audio Element */}
              <audio
                ref={audioRef}
                src="/audio/sua_musica.mp3" // adicione seu arquivo na pasta audio e substitua aqui pelo caminho do seu arquivo
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />
            </div>

          {/* Enhanced Content */}
          <div className="content-section">
            {/* Love Counter */}
            <div className="love-counter">
              <h1 className="main-title">Eu te amo há:</h1>
              <div className="time-display">
                <div className="time-row">
                  <span className="time-number">{loveTime.years}</span>
                  <span className="time-unit">anos</span>
                  <span className="time-separator">,</span>
                  <span className="time-number">{loveTime.months}</span>
                  <span className="time-unit">meses</span>
                  <span className="time-separator">,</span>
                  <span className="time-number">{loveTime.days}</span>
                  <span className="time-unit">dias</span>
                </div>
                <div className="time-row">
                  <span className="time-number">{loveTime.hours}</span>
                  <span className="time-unit">horas</span>
                  <span className="time-separator">,</span>
                  <span className="time-number">{loveTime.minutes}</span>
                  <span className="time-unit">minutos</span>
                  <span className="time-separator">and</span>
                  <span className="time-number">{loveTime.seconds}</span>
                  <span className="time-unit">segundos</span>
                </div>
              </div>
              <p className="love-message">
                {/* escreva aqui sua mensagem */}
                loreipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, nisi vel consectetur interdum, nisl nisi
                consectetur nisi, euismod aliquam nisl nisi euismod.
                loreipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, nisi vel consectetur interdum, nisl nisi
                consectetur nisi, euismod aliquam nisl nisi euismod. 
              </p>
            </div>

          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="site-footer">
          <div className="quote-container">
            <blockquote className="romantic-quote">
              {/* escreva aqui alguma frase que marcou */}
              "loreipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
              euismod, nisi vel consectetur interdum, nisl nisi consectetur nisi,
              euismod aliquam nisl nisi euismod. loreipsum dolor sit amet"
            </blockquote>
            <cite className="quote-author">— loreipsum</cite>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
