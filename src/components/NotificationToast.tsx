import React, { useEffect } from 'react';
import { CheckCircle2, Bookmark, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'favorite' | 'info';
  onClose: () => void;
}

export const NotificationToast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#52B788]" />,
    favorite: <Bookmark className="w-5 h-5 text-[#D4AF37] fill-current" />,
    info: <Info className="w-5 h-5 text-sky-400" />
  };

  return (
    <div
      id="notification-toast"
      className="fixed bottom-6 right-6 z-50 bg-[#0A192F] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#D4AF37]/50 flex items-center gap-3 animate-slideUp max-w-sm"
    >
      {icons[type]}
      <p className="text-xs sm:text-sm font-medium text-slate-100 flex-1">
        {message}
      </p>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white p-1 cursor-pointer"
        aria-label="Tutup notifikasi"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
