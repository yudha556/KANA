import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

const StatusBadge = ({ status, progress = 65 }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'ready':
        return {
          icon: CheckCircle,
          text: 'Ready',
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          iconColor: 'text-green-600',
          showProgress: false
        };
      case 'error':
        return {
          icon: AlertCircle,
          text: 'Error',
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          iconColor: 'text-red-600',
          showProgress: false
        };
      case 'processing':
      case 'prosessing':
        return {
          icon: Clock,
          text: 'Processing...',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          iconColor: 'text-blue-600',
          showProgress: true
        };
      default:
        return {
          icon: Clock,
          text: status || 'Unknown',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          iconColor: 'text-gray-600',
          showProgress: false
        };
    }
  };

  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return (
    <div className="w-full h-14 flex flex-col justify-end">
      {config.showProgress && (
        <div className="mb-1">
          <div className="w-full bg-gray-200 rounded-full h-1 mb-1">
            <div 
              className="bg-blue-600 h-1 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 text-start mb-1">
            AI is analyzing your document
          </p>
        </div>
      )}
      
      <div className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg w-full ${config.bgColor}`}>
        <IconComponent size={16} className={config.iconColor} />
        <span className={`text-sm font-medium ${config.textColor}`}>
          {config.text}
        </span>
      </div>
    </div>
  );
};

export default StatusBadge;