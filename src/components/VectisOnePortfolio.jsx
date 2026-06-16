import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  X, 
  Cpu, 
  Video, 
  Monitor, 
  Eye, 
  Mail, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export default function VectisOnePortfolio() {
  // Video switcher state
  const [activeTab, setActiveTab] = useState('cinema'); // 'cinema', 'hospitality', 'spatial'
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Lightbox modal state
  const [lightboxImage, setLightboxImage] = useState(null); // { url, title, desc }
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Video definitions
  const videos = {
    cinema: {
      type: 'youtube',
      src: 'https://www.youtube.com/embed/oox4cRo5yf8?autoplay=1&mute=1&loop=1&playlist=oox4cRo5yf8',
      title: '01_PROGRAMMATIC_CINEMA',
      subtitle: 'Bembridge Fort Trust',
      desc: 'Built using a proprietary React/Remotion pipeline and Google Veo 3.1. Zero-hallucination historical video generation deployed for the Bembridge Fort Trust heritage campaign.',
      tech: 'Google Veo 3.1 / YouTube Stream / 1080p Cine-Render'
    },
    hospitality: {
      type: 'youtube',
      src: 'https://www.youtube.com/embed/B_Ljj-5OyEk?autoplay=1&mute=1&loop=1&playlist=B_Ljj-5OyEk',
      title: '02_HOSPITALITY_ENGINE',
      subtitle: 'Heritage Trail Promo',
      desc: 'Automated promotional content engine producing pixel-perfect brand loops. Scaled dynamic asset generation for Fumo 33 and regional high-conversion marketing.',
      tech: 'React Automation / NodeJS / YouTube Stream'
    },
    spatial: {
      type: 'local',
      src: '/assets/screen_record_hunt.mp4',
      title: '03_SPATIAL_UI_TRACKING',
      subtitle: 'Real-time Vector Dashboard',
      desc: 'Real-time spatial computing dashboard tracing object boundaries and movement vectors. Quantized models running locally with under 15ms interface tracking latency.',
      tech: 'YOLOv8-Medium / WebRTC / Canvas API / CoreML'
    }
  };

  // List of all images for lightbox navigation
  const portfolioImages = [
    {
      url: '/assets/harbour_house.png',
      title: 'Harbour House Promotion',
      desc: 'Hyper-realistic food rendering and typography engines designed for high-conversion local restaurant marketing (Print & Social Media).'
    },
    {
      url: '/assets/the_crown.png',
      title: 'The Crown Promotion',
      desc: 'Local hospitality typography and aesthetic layout automation engine for regional dining campaigns.'
    },
    {
      url: '/assets/banner.png',
      title: 'Black Pepper Corns Flyer',
      desc: 'Indian & Sri Lankan brand assets and marketing layout engine designed for local restaurant promotions.'
    },
    {
      url: '/assets/amazon_glove_test.png',
      title: 'VIS Dashboard: Safety Node (Innovate UK Grant)',
      desc: 'A 4-bit quantized local AI vision model designed to detect false-compliance PPE on construction sites (Amazon Glove Test). Built in partnership with VIS for the Innovate UK grant application and HSWA 1974 compliance.'
    },
    {
      url: '/assets/edge_device.png',
      title: 'Sovereign Edge-AI Compute Device',
      desc: 'Custom local GPU hardware enclosures designed for offline LLM and Computer Vision inference, utilizing passive liquid cooling.'
    },
    {
      url: '/assets/holographic_presence.png',
      title: 'Living Sentinel Blueprint',
      desc: 'Optical Presence spatial lens array blueprint, projecting 3D holographic human agents with real-time audio interaction.'
    }
  ];

  // Auto-play video when changing tabs
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setIsPlaying(false);
      // Play after load
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    } else {
      setIsPlaying(false);
    }
  }, [activeTab]);

  // Video controls
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) { /* Safari */
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { /* IE11 */
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Lightbox Navigation
  const openLightbox = (imageUrl) => {
    const idx = portfolioImages.findIndex(img => img.url === imageUrl);
    if (idx !== -1) {
      setCurrentImageIndex(idx);
      setLightboxImage(portfolioImages[idx]);
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const nextIdx = (currentImageIndex + 1) % portfolioImages.length;
    setCurrentImageIndex(nextIdx);
    setLightboxImage(portfolioImages[nextIdx]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const prevIdx = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
    setCurrentImageIndex(prevIdx);
    setLightboxImage(portfolioImages[prevIdx]);
  };

  const activeVideo = videos[activeTab];

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F2EB] font-sans pb-16 relative selection:bg-[#00E5FF]/30 selection:text-white">
      {/* Subtle background mesh grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0"></div>

      {/* STICKY TOP BAR NAVIGATION */}
      <div className="sticky top-0 w-full bg-[#111111]/85 backdrop-blur-md border-b border-[#2B2B2B] z-40 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse-glow"></span>
          <span className="font-mono text-xs tracking-widest text-[#00E5FF]">VECTIS_ONE // SYSTEM.OK</span>
        </div>
        
        {/* Investor Easter Egg Button */}
        <a 
          href="mailto:david@isleconnect.co.uk?subject=Requesting%20Vectis%20One%20Deck%20%26%20Cashflow%20Projections"
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-mono font-bold tracking-wider rounded bg-gradient-to-br from-[#D4AF37] to-[#00E5FF] group hover:text-black transition-colors duration-300 focus:outline-none"
        >
          <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-[#111111] rounded group-hover:bg-opacity-0 font-medium flex items-center gap-1.5 text-[#F5F2EB] group-hover:text-black">
            <FileText className="h-3.5 w-3.5 text-[#D4AF37] group-hover:text-black" />
            [ DECK & CASHFLOW PROJECTIONS ]
          </span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 relative z-10">
        
        {/* HEADER */}
        <header className="mb-12 border-b border-[#2B2B2B] pb-8 animate-fade-in">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[#00E5FF] font-mono text-xs tracking-[0.25em] mb-3 uppercase">
                SYSTEM.ONLINE // AI INFRASTRUCTURE & AUTOMATION
              </p>
              <h1 className="text-4xl md:text-6xl font-serif leading-tight text-[#F5F2EB]">
                David Grannum <br/>
                <span className="italic text-[#D4AF37] font-semibold">Lead AI Architect</span>
              </h1>
            </div>
            <div className="hidden md:block text-right font-mono text-xs opacity-70 tracking-wider">
              <p className="text-[#F5F2EB]"><span className="text-[#00E5FF]">LOC:</span> ISLE OF WIGHT</p>
              <p className="text-[#F5F2EB] mt-1"><span className="text-[#D4AF37]">SPEC:</span> SOVEREIGN EDGE-AI</p>
            </div>
          </div>
        </header>

        {/* BENTO GRID PORTFOLIO */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. CINEMATIC VIDEO (Spans 2 columns) */}
          <div className="md:col-span-2 bg-[#1B1B1B]/90 border border-[#2B2B2B] rounded-lg p-6 hover:border-[#D4AF37] transition-all duration-300 shadow-xl flex flex-col justify-between group">
            
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
                <h2 className="text-[#00E5FF] font-mono text-xs tracking-wider flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  CINEMATIC VIDEO PIPELINES
                </h2>
                
                {/* Sovereign Terminology Switcher Tabs */}
                <div className="flex flex-wrap gap-1.5 bg-[#111111] p-1 rounded border border-[#2B2B2B] font-mono text-[10px] tracking-tight">
                  <button 
                    onClick={() => setActiveTab('cinema')}
                    className={`px-2.5 py-1 rounded transition-all duration-200 cursor-pointer ${
                      activeTab === 'cinema' 
                        ? 'bg-[#00E5FF] text-black font-bold' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    [01_PROGRAMMATIC_CINEMA]
                  </button>
                  <button 
                    onClick={() => setActiveTab('hospitality')}
                    className={`px-2.5 py-1 rounded transition-all duration-200 cursor-pointer ${
                      activeTab === 'hospitality' 
                        ? 'bg-[#D4AF37] text-black font-bold' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    [02_HOSPITALITY_ENGINE]
                  </button>
                  <button 
                    onClick={() => setActiveTab('spatial')}
                    className={`px-2.5 py-1 rounded transition-all duration-200 cursor-pointer ${
                      activeTab === 'spatial' 
                        ? 'bg-[#00E5FF] text-black font-bold' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    [03_SPATIAL_UI_TRACKING]
                  </button>
                </div>
              </div>

              {/* Custom Player / Embed Container */}
              <div className="aspect-video bg-black rounded overflow-hidden mb-5 border border-[#333] relative group/player shadow-inner crt-effect">
                {activeVideo.type === 'youtube' ? (
                  <iframe
                    className="w-full h-full border-0"
                    src={activeVideo.src}
                    title={activeVideo.subtitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      src={activeVideo.src}
                      className="w-full h-full object-cover"
                      onClick={handlePlayPause}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      playsInline
                      loop
                    />
                    
                    {/* Sleek Custom Controls Overlay (Fades on hover or always visible when paused) */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${
                      isPlaying ? 'opacity-0 group-hover/player:opacity-100' : 'opacity-100'
                    }`}>
                      
                      {/* Center Play/Pause Indicator (Overlay) */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/60 backdrop-blur-sm border border-[#2B2B2B] h-14 w-14 rounded-full flex items-center justify-center text-white scale-90 group-hover/player:scale-100 transition-transform duration-300">
                          {isPlaying ? (
                            <Pause className="h-6 w-6 text-[#00E5FF] ml-0" />
                          ) : (
                            <Play className="h-6 w-6 text-[#D4AF37] ml-1" />
                          )}
                        </div>
                      </div>

                      {/* Scrub Bar */}
                      <div className="flex items-center gap-3 w-full mb-3 pointer-events-auto">
                        <input
                          type="range"
                          min="0"
                          max={duration || 100}
                          value={currentTime}
                          onChange={handleSeek}
                          className="w-full h-1 bg-[#2b2b2b] rounded-lg appearance-none cursor-pointer accent-[#D4AF37] hover:accent-[#00E5FF] transition-all"
                        />
                      </div>

                      {/* Row Controls */}
                      <div className="flex justify-between items-center w-full pointer-events-auto">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={handlePlayPause} 
                            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                            title={isPlaying ? 'Pause' : 'Play'}
                          >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </button>

                          <button 
                            onClick={handleMute} 
                            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                            title={isMuted ? 'Unmute' : 'Mute'}
                          >
                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                          </button>

                          <span className="font-mono text-[10px] text-gray-400">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 font-mono text-[10px] text-[#00E5FF]">
                          <span className="hidden sm:inline bg-black/60 px-2 py-0.5 rounded border border-[#2B2B2B]">
                            {activeVideo.tech}
                          </span>
                          <button 
                            onClick={handleFullscreen} 
                            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                            title="Fullscreen"
                          >
                            <Maximize className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-2">
              <h3 className="font-mono text-xs text-[#D4AF37] tracking-wider mb-1 uppercase">
                // {activeVideo.title} : {activeVideo.subtitle}
              </h3>
              <p className="text-sm opacity-85 leading-relaxed text-[#F5F2EB]">
                {activeVideo.desc}
              </p>
            </div>
          </div>

          {/* 2. B2B HOSPITALITY ENGINE (Vertical Card) */}
          <div className="md:col-span-1 bg-[#1B1B1B]/90 border border-[#2B2B2B] rounded-lg p-6 flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-300 shadow-xl group">
            <div>
              <h2 className="text-[#00E5FF] font-mono text-xs tracking-wider mb-4 flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                02. AI HOSPITALITY ASSETS
              </h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Harbour House image */}
                <div 
                  onClick={() => openLightbox('/assets/harbour_house.png')}
                  className="relative group/img overflow-hidden rounded border border-[#333] cursor-pointer hover:border-[#D4AF37] transition-all duration-300"
                >
                  <img 
                    src="/assets/harbour_house.png" 
                    alt="Harbour House Promo" 
                    className="w-full h-auto object-cover aspect-[3/4] group-hover/img:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <Eye className="h-6 w-6 text-[#00E5FF]" />
                  </div>
                  <span className="absolute bottom-2 left-2 font-mono text-[9px] bg-black/75 px-1.5 py-0.5 rounded text-[#D4AF37] border border-[#222]">
                    [HARBOUR_HOUSE]
                  </span>
                </div>

                {/* The Crown image */}
                <div 
                  onClick={() => openLightbox('/assets/the_crown.png')}
                  className="relative group/img overflow-hidden rounded border border-[#333] cursor-pointer hover:border-[#D4AF37] transition-all duration-300"
                >
                  <img 
                    src="/assets/the_crown.png" 
                    alt="The Crown Promo" 
                    className="w-full h-auto object-cover aspect-[3/4] group-hover/img:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <Eye className="h-6 w-6 text-[#00E5FF]" />
                  </div>
                  <span className="absolute bottom-2 left-2 font-mono text-[9px] bg-black/75 px-1.5 py-0.5 rounded text-[#D4AF37] border border-[#222]">
                    [THE_CROWN]
                  </span>
                </div>
              </div>

              {/* Black Pepper Corns Banner */}
              <div 
                onClick={() => openLightbox('/assets/banner.png')}
                className="relative group/img overflow-hidden rounded border border-[#333] cursor-pointer hover:border-[#D4AF37] transition-all duration-300"
              >
                <img 
                  src="/assets/banner.png" 
                  alt="Black Pepper Corns Banner" 
                  className="w-full h-auto object-cover aspect-[1.2] group-hover/img:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <Eye className="h-6 w-6 text-[#00E5FF]" />
                </div>
                <span className="absolute bottom-2 left-2 font-mono text-[9px] bg-black/75 px-1.5 py-0.5 rounded text-[#D4AF37] border border-[#222]">
                  [BLACK_PEPPER_CORNS]
                </span>
              </div>
            </div>

            <p className="text-sm opacity-85 mt-5 leading-relaxed text-[#F5F2EB]">
              Hyper-realistic food rendering and typography engines designed for high-conversion local restaurant marketing (Print & Social Media).
            </p>
          </div>

          {/* 3. ENTERPRISE AI (VIS SYSTEM) */}
          <div className="md:col-span-1 bg-[#1B1B1B]/90 border border-[#2B2B2B] rounded-lg p-6 hover:border-[#D4AF37] transition-all duration-300 shadow-xl flex flex-col justify-between group">
            <div>
              <h2 className="text-[#00E5FF] font-mono text-xs tracking-wider mb-4 flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                03. ENTERPRISE COMPUTER VISION
              </h2>
              
              <div 
                onClick={() => openLightbox('/assets/amazon_glove_test.png')}
                className="relative group/img overflow-hidden rounded mb-4 border border-[#333] cursor-pointer hover:border-[#00E5FF] transition-all duration-300"
              >
                <img 
                  src="/assets/amazon_glove_test.png" 
                  alt="Amazon Glove Test" 
                  className="w-full h-40 object-cover group-hover/img:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="bg-black/80 border border-[#00E5FF] text-[#00E5FF] font-mono text-xs px-3 py-1.5 rounded flex items-center gap-1.5">
                    <Eye className="h-4 w-4" /> INSPECT DASHBOARD
                  </span>
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-2 font-mono text-[8px] bg-[#111111]/90 border border-[#2B2B2B] px-2 py-0.5 rounded">
                  <div className="flex items-center gap-1 text-[#00E5FF]">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
                    LIVE FEED
                  </div>
                  <span className="text-gray-600">|</span>
                  <span className="text-[#D4AF37] font-bold">
                    [INNOVATE_UK_PARTNERSHIP]
                  </span>
                </div>
              </div>

              <h3 className="font-serif text-xl mb-2 text-[#D4AF37]">VIS: Safety Node</h3>
            </div>
            
            <p className="text-sm opacity-85 leading-relaxed text-[#F5F2EB]">
              A 4-bit quantized local AI vision model designed to detect false-compliance PPE on construction sites with 0.6s latency. Deployed in partnership with VIS for the Innovate UK grant application and HSWA 1974 compliance.
            </p>
          </div>

          {/* 4. THE TECH STACK / CAPABILITIES */}
          <div className="md:col-span-1 bg-gradient-to-br from-[#1B1B1B] to-[#111111] border border-[#2B2B2B] rounded-lg p-6 flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-300 shadow-xl group">
            <div>
              <h2 className="text-[#00E5FF] font-mono text-xs tracking-wider mb-6">04. DEPLOYABLE CAPABILITIES</h2>
              
              <div className="flex flex-col gap-3 font-mono text-[11px]">
                <div className="p-3 border border-[#2B2B2B] rounded bg-black/45 hover:border-[#D4AF37] transition-colors duration-200">
                  <span className="text-[#D4AF37] mr-1.5">&gt;&gt;</span> Local LLM & Edge-AI Deployment
                </div>
                <div className="p-3 border border-[#2B2B2B] rounded bg-black/45 hover:border-[#00E5FF] transition-colors duration-200">
                  <span className="text-[#00E5FF] mr-1.5">&gt;&gt;</span> React / Remotion Video Automation
                </div>
                <div className="p-3 border border-[#2B2B2B] rounded bg-black/45 hover:border-[#D4AF37] transition-colors duration-200">
                  <span className="text-[#D4AF37] mr-1.5">&gt;&gt;</span> 3D Holographic 'Optical Presence'
                </div>
                <div className="p-3 border border-[#2B2B2B] rounded bg-black/45 hover:border-[#00E5FF] transition-colors duration-200">
                  <span className="text-[#00E5FF] mr-1.5">&gt;&gt;</span> High-Performance Vercel Web Apps
                </div>
              </div>
            </div>

            <p className="text-[11px] font-mono text-gray-500 mt-4 leading-normal">
              // CLUSTERS RUNNING IN OFFLINE ISOLATED MODE FOR COMPLETE SOVEREIGNTY.
            </p>
          </div>

          {/* 5. EXPANDED SHOWCASES (Hardware/Holographic Blueprints) */}
          <div className="md:col-span-1 bg-[#1B1B1B]/90 border border-[#2B2B2B] rounded-lg p-6 hover:border-[#D4AF37] transition-all duration-300 shadow-xl flex flex-col justify-between group">
            <div>
              <h2 className="text-[#00E5FF] font-mono text-xs tracking-wider mb-4 flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                05. SPATIAL & HARDWARE SYSTEMS
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Edge Device Card */}
                <div 
                  onClick={() => openLightbox('/assets/edge_device.png')}
                  className="relative group/img overflow-hidden rounded border border-[#333] cursor-pointer hover:border-[#00E5FF] transition-all duration-300"
                >
                  <img 
                    src="/assets/edge_device.png" 
                    alt="Edge GPU Hardware" 
                    className="w-full h-auto object-cover aspect-square group-hover/img:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <Eye className="h-5 w-5 text-[#00E5FF]" />
                  </div>
                  <span className="absolute bottom-1 right-1 font-mono text-[8px] bg-black/85 px-1 rounded text-[#00E5FF]">
                    [SOVEREIGN_NODE]
                  </span>
                </div>

                {/* Holographic Presence Card */}
                <div 
                  onClick={() => openLightbox('/assets/holographic_presence.png')}
                  className="relative group/img overflow-hidden rounded border border-[#333] cursor-pointer hover:border-[#D4AF37] transition-all duration-300"
                >
                  <img 
                    src="/assets/holographic_presence.png" 
                    alt="Spatial Projection Blueprint" 
                    className="w-full h-auto object-cover aspect-square group-hover/img:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <Eye className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                  <span className="absolute bottom-1 right-1 font-mono text-[8px] bg-black/85 px-1 rounded text-[#D4AF37]">
                    [OPTICAL_ARRAY]
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm opacity-85 mt-5 leading-relaxed text-[#F5F2EB]">
              Physical hardware design and optical holography. Custom Liquid-Cooled AI enclosures and 3D projection array nodes deployed locally.
            </p>
          </div>

        </main>

        {/* FOOTER */}
        <footer className="mt-16 pt-8 border-t border-[#2B2B2B] flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
          <div>
            <p>© 2026 VECTIS ONE. ALL RIGHTS RESERVED.</p>
          </div>
          <div className="flex gap-6">
            <a href="mailto:david@isleconnect.co.uk" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> david@isleconnect.co.uk
            </a>
            <span className="text-gray-700">|</span>
            <p className="tracking-widest">SECURE_EDGE // SEC.74</p>
          </div>
        </footer>

      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-12 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 bg-[#1B1B1B] border border-[#2B2B2B] rounded-full transition-colors cursor-pointer z-55"
            onClick={() => setLightboxImage(null)}
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left Navigation */}
          <button 
            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-3 bg-[#1B1B1B]/70 border border-[#2B2B2B] rounded-full transition-all cursor-pointer z-55 hover:scale-105"
            onClick={prevImage}
            title="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right Navigation */}
          <button 
            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-3 bg-[#1B1B1B]/70 border border-[#2B2B2B] rounded-full transition-all cursor-pointer z-55 hover:scale-105"
            onClick={nextImage}
            title="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image Container */}
          <div 
            className="max-w-4xl w-full max-h-[70vh] flex items-center justify-center relative rounded border border-[#2B2B2B] overflow-hidden bg-black/40"
            onClick={(e) => e.stopPropagation()} // Stop closing on image click
          >
            <img 
              src={lightboxImage.url} 
              alt={lightboxImage.title} 
              className="max-w-full max-h-[70vh] object-contain"
            />
          </div>

          {/* Description Container */}
          <div 
            className="mt-6 max-w-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-mono text-xs text-[#00E5FF] tracking-wider uppercase bg-black/60 border border-[#2B2B2B] px-3 py-1 rounded">
              IMAGE {currentImageIndex + 1} OF {portfolioImages.length}
            </span>
            <h3 className="font-serif text-2xl text-[#D4AF37] mt-4 mb-2">
              {lightboxImage.title}
            </h3>
            <p className="text-sm text-[#F5F2EB]/90 leading-relaxed font-sans">
              {lightboxImage.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
