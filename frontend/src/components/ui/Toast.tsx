import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

export default function Toast({ type, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg ${
          type === "success"
            ? "bg-green-50 text-green-800 border border-green-200"
            : "bg-red-50 text-red-800 border border-red-200"
        }`}
      >
        {type === "success" ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <XCircle className="w-5 h-5" />
        )}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
