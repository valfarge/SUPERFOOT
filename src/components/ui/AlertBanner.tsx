// src/components/ui/AlertBanner.tsx
import React from 'react';

interface AlertBannerProps {
  message: string | null;
  onClose: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ message, onClose }) => {
  if (!message) return null;
  
  return (
    <div className="bg-green-600 text-white px-4 py-2 rounded flex justify-between items-center">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white font-bold">X</button>
    </div>
  );
};
