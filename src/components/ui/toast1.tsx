// src/components/ui/Toast.tsx
import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  duration?: number; // en ms
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div 
      style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}
      className="bg-green-600 text-white px-4 py-2 rounded shadow-lg"
    >
      {message}
    </div>
  );
};
