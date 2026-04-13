"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function ParentPage() {
  const { t } = useLanguage();
  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{t("parent")}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-xl">
          <h3 className="font-semibold mb-2">⏱ وقت الشاشة اليوم</h3>
          <p className="text-3xl font-bold text-blue-700">12 دقيقة</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl">
          <h3 className="font-semibold mb-2">⭐ الدروس المكتملة</h3>
          <p className="text-3xl font-bold text-green-700">5 / 12</p>
        </div>
      </div>
      <div className="p-4 border rounded-xl">
        <h3 className="font-semibold mb-2">🔐 ملاحظة أمنية</h3>
        <p className="text-gray-600 text-sm">
          هذه الصفحة محمية. في النسخة الكاملة، نطلب كلمة مرور الوالد قبل الدخول
          لحماية إعدادات الطفل.
        </p>
      </div>
    </div>
  );
}
