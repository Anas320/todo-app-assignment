import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="text-red-500 bg-red-100 p-3 rounded-md text-center mb-4">
      {message}
    </div>
  );
};

export default ErrorMessage;
