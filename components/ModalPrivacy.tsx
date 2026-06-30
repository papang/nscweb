"use client";

interface ModalPrivacyProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalPrivacy({ isOpen, onClose, children }: ModalPrivacyProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[800px] rounded-lg bg-gray p-5 shadow-xl dark:bg-zinc-900 border border-orange-500">
        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-300 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>

  );
}
