"use client";

import React, { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom/client";


const Alert = ({ 
  type = "info", 
  message, 
  isOpen, 
  onClose, 
  duration = 5000, 
  position = "top-right",
  showCloseButton = true,
  showProgressBar = true 
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  const alertConfig = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-500",
      textColor: "text-green-800",
      closeButtonColor: "text-green-400 hover:text-green-600",
      progressColor: "bg-green-500"
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-500",
      textColor: "text-red-800",
      closeButtonColor: "text-red-400 hover:text-red-600",
      progressColor: "bg-red-500"
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-500",
      textColor: "text-yellow-800",
      closeButtonColor: "text-yellow-400 hover:text-yellow-600",
      progressColor: "bg-yellow-500"
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-500",
      textColor: "text-blue-800",
      closeButtonColor: "text-blue-400 hover:text-blue-600",
      progressColor: "bg-blue-500"
    }
  };

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2"
  };

  const getAnimationVariants = () => {
    const isTop = position.includes("top");
    const isRight = position.includes("right");
    const isLeft = position.includes("left");
    
    let x = 0, y = 0;
    
    if (isRight) x = 100;
    if (isLeft) x = -100;
    if (isTop) y = -100;
    else y = 100;

    return {
      hidden: { opacity: 0, x, y, scale: 0.9 },
      visible: { opacity: 1, x: 0, y: 0, scale: 1 },
      exit: { opacity: 0, x, y, scale: 0.9 }
    };
  };

  const config = alertConfig[type];
  const IconComponent = config.icon;

  useEffect(() => {
    if (isOpen && duration > 0) {
      setTimeLeft(duration);
      
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 100) {
            clearInterval(interval);
            onClose?.();
            return 0;
          }
          return prev - 100;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isOpen, duration, onClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(duration);
    }
  }, [isOpen, duration]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={getAnimationVariants()}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed z-[9999] ${positionClasses[position]} max-w-sm w-full mx-4`}
        >
          <div
            className={`
              ${config.bgColor} ${config.borderColor} ${config.textColor}
              border rounded-2xl shadow-2xl p-4 backdrop-blur-sm
              hover:shadow-3xl transition-shadow duration-200
            `}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <IconComponent 
                  size={20} 
                  className={config.iconColor}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-5">
                  {message}
                </p>
              </div>

              {showCloseButton && (
                <button
                  onClick={onClose}
                  className={`
                    flex-shrink-0 p-1 rounded-lg transition-colors
                    hover:bg-white/20 ${config.closeButtonColor}
                  `}
                  aria-label="Close alert"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {duration > 0 && showProgressBar && (
              <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-full ${config.progressColor} transition-all duration-100 ease-linear`}
                  style={{
                    width: `${(timeLeft / duration) * 100}%`
                  }}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Alert.show = (options) => {
  const alertContainer = document.getElementById('alert-container') || (() => {
    const container = document.createElement('div');
    container.id = 'alert-container';
    document.body.appendChild(container);
    return container;
  })();

  const alertElement = document.createElement('div');
  alertContainer.appendChild(alertElement);

  const closeAlert = () => {
    if (alertElement.parentNode) {
      alertElement.remove();
    }
  };

  const root = ReactDOM.createRoot ? ReactDOM.createRoot(alertElement) : null;
  
  const AlertComponent = () => (
    <Alert
      {...options}
      isOpen={true}
      onClose={closeAlert}
    />
  );

  if (root) {
    root.render(<AlertComponent />);
  }

  return closeAlert;
};

Alert.success = (message, options = {}) => {
  return Alert.show({ type: 'success', message, ...options });
};

Alert.error = (message, options = {}) => {
  return Alert.show({ type: 'error', message, ...options });
};

Alert.warning = (message, options = {}) => {
  return Alert.show({ type: 'warning', message, ...options });
};

Alert.info = (message, options = {}) => {
  return Alert.show({ type: 'info', message, ...options });
};

export default Alert;