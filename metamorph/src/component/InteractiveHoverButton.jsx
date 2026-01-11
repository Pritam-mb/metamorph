import React from 'react';

const InteractiveHoverButton = ({ text = "Button", className = "" }) => {
  return (
    <button
      className={`pointer-events-auto group relative w-auto cursor-pointer overflow-hidden rounded-full border-2 border-white/20 bg-transparent p-3 px-8 text-center font-semibold backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/50 ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 scale-100 rounded-lg bg-purple-500 transition-all duration-300 group-hover:scale-[100]" />
        <span className="inline-block whitespace-nowrap text-white transition-all duration-300 group-hover:translate-x-40 group-hover:opacity-0">
          {text}
        </span>
      </div>

      <div className="absolute top-0 left-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span className="whitespace-nowrap">{text}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-right"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};

export default InteractiveHoverButton;
