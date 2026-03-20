

import { useState, useRef } from 'react'
import { UploadCloud, Play, Pause, Volume2, VolumeX, Maximize, Film, Search, FileVideo } from 'lucide-react'

// @ts-ignore
const isElectron = !!window.electronAPI

export const Gallery = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [videoName, setVideoName] = useState<string>('')
  const [deviceVideos, setDeviceVideos] = useState<any[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const localUrl = URL.createObjectURL(file)
      setVideoUrl(localUrl)
      setVideoName(file.name)
      setIsPlaying(false)
    }
  }

  const scanDeviceVideos = async () => {
    if (!isElectron) return
    setIsScanning(true)
    try {
      // @ts-ignore
      const videos = await window.electronAPI.scanVideos()
      setDeviceVideos(videos || [])
      
      // Auto-play the first video if nothing is playing
      if (videos?.length > 0 && !videoUrl) {
        setVideoUrl(videos[0].url)
        setVideoName(videos[0].name)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsScanning(false)
    }
  }

  const handleSelectDeviceVideo = (video: any) => {
    setVideoUrl(video.url)
    setVideoName(video.name)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm flex items-center gap-3">
            <Film className="w-8 h-8 text-cyan-400" />
            Media Gallery
          </h1>
          <p className="text-slate-400 mt-2">View and manage your local video files</p>
        </div>
        
        <div className="flex gap-4">
          {/* Scan Button - Only available in Electron */}
          {isElectron && (
            <button 
              onClick={scanDeviceVideos}
              disabled={isScanning}
              className="cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium shadow-lg disabled:opacity-50"
            >
              <Search className={`w-5 h-5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Scan Device'}</span>
            </button>
          )}

          {/* File Select Button */}
          <label className="cursor-pointer bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            <UploadCloud className="w-5 h-5" />
            <span>Select Local Video</span>
            <input 
              type="file" 
              accept="video/*" 
              className="hidden" 
              onChange={handleFileChange} 
            />
          </label>
        </div>
      </div>

      {/* Main Grid: Player + Sidebar array */}
      <div className="flex gap-6 flex-1 w-full overflow-hidden">
        
        {/* Main Player Area */}
        <div className="flex-1 w-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col group min-h-[400px]">
          
          {!videoUrl ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center mb-6 shadow-lg border border-white/5">
                <UploadCloud className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Video Selected</h3>
              <p className="text-slate-400 max-w-sm mb-8">
                Click "Scan Device" to automatically find movies, or browse manually.
              </p>
              {isElectron && (
                <button 
                  onClick={scanDeviceVideos}
                  className="cursor-pointer bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-xl transition-all font-medium border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center gap-2 mb-4"
                >
                  <Search className="w-5 h-5" />
                  Auto Scan Device
                </button>
              )}
            </div>
          ) : (
            <div className="relative w-full flex-1 flex flex-col items-center justify-center bg-black/80">
              {/* The Video Element */}
              <video 
                ref={videoRef}
                src={videoUrl} 
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlay}
                autoPlay
              />

              {/* Custom overlay controls (visible on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-between">
                
                {/* Top Bar Video Name */}
                <div className="p-6">
                  <p className="text-white font-medium drop-shadow-md text-xl truncate">{videoName}</p>
                </div>

                {/* Bottom Controls */}
                <div className="p-6 pb-8 pointer-events-auto">
                  <div className="flex items-center gap-6">
                    
                    {/* Play/Pause */}
                    <button 
                      onClick={togglePlay}
                      className="w-12 h-12 flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-full transition-transform hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.4)] block"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-1" />
                      )}
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                      {/* Mute */}
                      <button 
                        onClick={toggleMute}
                        className="text-white/80 hover:text-white transition-colors p-2"
                      >
                        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                      </button>
                      
                      {/* Fullscreen */}
                      <button 
                        onClick={handleFullscreen}
                        className="text-white/80 hover:text-white transition-colors p-2"
                      >
                        <Maximize className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Giant center play button when paused */}
              {!isPlaying && (
                <button 
                  onClick={togglePlay} 
                  className="absolute inset-0 m-auto w-24 h-24 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-110 text-white rounded-full transition-all duration-300 shadow-2xl"
                >
                  <Play className="w-10 h-10 fill-current ml-2" />
                </button>
              )}
              
            </div>
          )}
        </div>

        {/* Scanned Device Videos Side List */}
        {deviceVideos.length > 0 && (
          <div className="w-80 flex flex-col bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-full">
            <div className="p-4 border-b border-white/10 bg-black/20 flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <FileVideo className="w-4 h-4 text-cyan-400" />
                Found Videos
              </h3>
              <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded-md font-bold">
                {deviceVideos.length}
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {deviceVideos.map((vid, idx) => {
                const isSelected = vid.url === videoUrl
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectDeviceVideo(vid)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 border ${
                      isSelected 
                        ? 'bg-cyan-500/20 border-cyan-500/30 text-white shadow-[0_0_10px_rgba(34,211,238,0.1)]' 
                        : 'bg-white/5 border-transparent text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/10'
                    }`}
                  >
                    <p className="font-medium text-sm truncate" title={vid.name}>{vid.name}</p>
                    <p className="text-xs text-slate-500 mt-1 truncate" title={vid.path}>
                      {vid.path.split('/').slice(0, -1).join('/')}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
