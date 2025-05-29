
import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-foreground mb-3"></div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
