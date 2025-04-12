import React from "react";

type Props = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
};

export default function Button({
  className = "",
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  loadingText = "Loading...",
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`bg-[#FF842A] border border-[#FFD94D] p-2 rounded-md text-white font-semibold transition-all duration-200 cursor-pointer hover:scale-107 ${
        disabled || loading
          ? "opacity-50 cursor-not-allowed"
          : "hover:opacity-90"
      } ${className}`}
    >
      {loading ? (
        <span className="flex items-center justify-center space-x-2">
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>{loadingText}</span>
        </span>
      ) : (
        children || "PLAY NOW"
      )}
    </button>
  );
}
