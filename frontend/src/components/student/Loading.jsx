import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Loading() {
  const { path } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (path) {
      const time = setTimeout(() => {
        navigate(`/${path}`);
      }, 5000);
      return () => clearTimeout(time);
    }
  }, [path, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Spinner */}
      <div className="w-16 sm:w-20 aspect-square border-4 border-gray-200 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>

      {/* Loading text */}
      <p className="mt-6 text-gray-600 font-medium animate-pulse">
        Redirecting, please wait...
      </p>
    </div>
  );
}

export default Loading;
