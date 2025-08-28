import React, { useEffect, useState } from "react";

const Rating = ({ initialRating = 0, onRate }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(null);

  const handleRating = (value) => {
    setRating(value);
    if (onRate) onRate(value);
  };

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            type="button"
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors focus:outline-none ${
              starValue <= (hover || rating)
                ? "text-yellow-400 drop-shadow-sm"
                : "text-gray-400"
            }`}
            aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
