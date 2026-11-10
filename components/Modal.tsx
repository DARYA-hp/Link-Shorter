import React from "react";

interface ModalProps {
  isOpen: boolean; onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, }: ModalProps) {
  if (!isOpen) return null;
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={handleOverlayClick} >
      <div role="dialog" aria-modal="true" aria-label={title} className="w-full max-w-2xl rounded-2xl border border-[#1A3155] bg-[#101A35] p-5 text-white shadow-2xl sm:p-7">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="بستن مودال"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl text-slate-400 transition hover:bg-white/10 hover:text-white" >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}
