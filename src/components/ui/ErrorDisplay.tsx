import React from 'react';

interface ErrorDisplayProps {
  error: Error | string;
  title?: string;
  showIcon?: boolean;
  className?: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  title = "Something went wrong",
  showIcon = true,
  className = "",
  onRetry
}) => {
  const errorMessage = typeof error === 'string' ? error : error.message;

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-start">
        {showIcon && (
          <div className="flex-shrink-0">
            <svg 
              className="h-6 w-6 text-red-400 mt-0.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        )}
        <div className={showIcon ? "ml-3" : ""}>
          <h3 className="text-sm font-medium text-red-800 mb-1">
            {title}
          </h3>
          <div className="text-sm text-red-700">
            <p>{errorMessage}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onRetry}
                className="bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;