"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

// تحميل ReactPlayer ديناميكياً لتجنب أخطاء TypeScript
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function CustomVideoPlayer({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-gray-900 shadow-2xl">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        muted={muted}
        controls={false}
        onProgress={(state: { played: number }) =>
          setProgress(state.played * 100)
        }
      />

      {!playing && (
        <button
          type="button"
          aria-label="Play video"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition"
        >
          <div className="bg-white rounded-full p-6 shadow-lg hover:scale-105 transition">
            <Play size={48} className="text-purple-600 ml-1" />
          </div>
        </button>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying(!playing)}
            className="text-white"
          >
            {playing ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <button
            type="button"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={() => setMuted(!muted)}
            className="text-white"
          >
            {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}
