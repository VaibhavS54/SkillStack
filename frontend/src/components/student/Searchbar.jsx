import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (!input.trim()) return; // prevent empty search
    navigate(`/course-list/${encodeURIComponent(input.trim())}`);
    setInput(""); // optional: reset input after search
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
    >
      {/* Search Icon */}
      <img
        src={assets.search_icon}
        alt="Search"
        className="w-6 h-6 ml-3 opacity-60"
      />

      {/* Input */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for courses..."
        className="flex-1 h-full px-3 text-gray-700 placeholder-gray-400 outline-none text-sm md:text-base"
      />

      {/* Button */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition-colors text-white md:px-6 px-4 md:py-2 py-1 rounded-r-lg font-medium"
      >
        Search
      </button>
    </form>
  );
};

export default Searchbar;
