import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  onClick?: () => void;
  className?: string;
  size?: number;
}

export default function DeleteButton({ onClick, className = '', size = 18 }: DeleteButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`text-gray-500 hover:text-red-500 transition-colors p-1.5 rounded-md hover:bg-red-500/10 flex-shrink-0 outline-none ${className}`}
      title="Hapus"
      type="button"
    >
      <Trash2 size={size} />
    </button>
  );
}
