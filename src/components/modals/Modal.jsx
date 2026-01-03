import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function Modal({ isOpen, onClose, children, title, size = 'lg' }) {
  const overlayRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Store the element that opened the modal
      previousActiveElement.current = document.activeElement;
      
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // ESC key handler
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleEscape);

      return () => {
        window.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
        
        // Return focus to the element that opened the modal
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-lg',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[95vw]'
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-neutral-900/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div className="min-h-screen w-full flex items-start justify-center p-4 md:p-8">
        <div
          className={cn(
            "relative w-full bg-cream shadow-2xl my-8",
            sizeClasses[size]
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-cream hover:bg-beige/50 text-charcoal/60 hover:text-charcoal transition-colors shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="max-h-[90vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}