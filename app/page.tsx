"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import LessonCard from "@/components/LessonCard";
import CustomVideoPlayer from "@/components/CustomVideoPlayer";

export default function Home() {
  const { lang, setLang, t } = useLanguage();
  const [screenTime, setScreenTime] = useState(0);
  const [showBreak, setShowBreak] = useState(false);

  // مؤقت وقت الشاشة (20 دقيقة)
  useEffect(() => {
    const interval = setInterval(() => {
      setScreenTime((prev) => {
        const next = prev + 1;
        if (next >= 1200) {
          // 20 دقيقة = 1200 ثانية
          setShowBreak(true);
          clearInterval(interval);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const lessons = [
    {
      id: "alphabet",
      icon: "🔤",
      title: t("alphabet"),
      stars: 2,
      video: "https://www.youtube.com/watch?v=V6Bb1X9v0g0",
    },
    {
      id: "numbers",
      icon: "🔢",
      title: t("numbers"),
      stars: 0,
      video: "https://www.youtube.com/watch?v=Q6i8Dq4fY6I",
    },
    {
      id: "colors",
      icon: "🎨",
      title: t("colors"),
      stars: 1,
      video: "https://www.youtube.com/watch?v=3v1X3X6X6X0",
    },
  ];

  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  if (showBreak) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">
          {t("screenTime")}
        </h1>
        <p className="text-gray-600 mb-6">استرح قليلاً ثم عد للتعلم بمرح! 💤</p>
        <button
          onClick={() => setShowBreak(false)}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl text-lg"
        >
          فهمت، سأتابع بعد قليل
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* رأس الصفحة */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-700">
          {t("welcome")}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setLang("ar")}
            className={`px-3 py-1 rounded-lg ${lang === "ar" ? "bg-purple-200" : "bg-gray-100"}`}
          >
            عربي
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded-lg ${lang === "en" ? "bg-purple-200" : "bg-gray-100"}`}
          >
            EN
          </button>
          <button
            onClick={() => (window.location.href = "/parent")}
            className="bg-gray-200 px-3 py-1 rounded-lg"
          >
            👨‍👩‍👧
          </button>
        </div>
      </div>

      {/* المشغل أو قائمة الدروس */}
      {activeLesson ? (
        <div className="space-y-4">
          <CustomVideoPlayer
            url={lessons.find((l) => l.id === activeLesson)?.video || ""}
          />
          <button
            onClick={() => setActiveLesson(null)}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl"
          >
            ← العودة للدروس
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lessons.map((l) => (
            <LessonCard
              key={l.id}
              title={l.title}
              icon={l.icon}
              stars={l.stars}
              onClick={() => setActiveLesson(l.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
