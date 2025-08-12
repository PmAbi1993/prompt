import React, { useEffect, useState, useCallback } from 'react';

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${typeClasses[type]}`}
      role="alert"
      aria-live="polite"
    >
      <span className="mr-2 text-lg" aria-hidden="true">
        {icons[type]}
      </span>
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-3 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
        aria-label="Close notification"
      >
        <span className="text-lg">×</span>
      </button>
    </div>
  );
}

// Toast manager hook
export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; props: Omit<ToastProps, 'onClose'> }>>([]);

  const showToast = useCallback((props: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, props }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const ToastContainer = () => (
    <>
      {toasts.map(({ id, props }) => (
        <Toast
          key={id}
          {...props}
          onClose={() => removeToast(id)}
        />
      ))}
    </>
  );

  return { showToast, ToastContainer };
}
