"use client";
import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function CustomVideoPlayer({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-gray-900 shadow-2xl">
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        muted={muted}
        controls={false}
        config={{
          youtube: {
            playerVars: {
              playsinline: 1,
              rel: 0,
              modestbranding: 1,
              iv_load_policy: 3,
            },
          },
        }}
        onProgress={({ played }) => setProgress(played * 100)}
      />

      {/* زر التشغيل المركزي الكبير */}
      {!playing && (
        <button
          onClick={() => setPlaying(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition"
        >
          <div className="bg-white rounded-full p-6 shadow-lg hover:scale-105 transition">
            <Play size={48} className="text-purple-600 ml-1" />
          </div>
        </button>
      )}

      {/* أزرار التحكم السفلية */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setPlaying(!playing)} className="text-white">
            {playing ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <button onClick={() => setMuted(!muted)} className="text-white">
            {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}
