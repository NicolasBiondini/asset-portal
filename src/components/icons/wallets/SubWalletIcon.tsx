import React from "react";

function SubWalletIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="704"
      height="704"
      fill="none"
      viewBox="0 0 704 704"
      className={className}
    >
      <g clipPath="url(#clip0_362_8013)">
        <rect
          width="704"
          height="704"
          fill="url(#paint0_linear_362_8013)"
          rx="48"
        ></rect>
        <g clipPath="url(#clip1_362_8013)">
          <path
            fill="#fff"
            d="M512 285.599V218.99L245.286 112 192 139.06l.281 207.32 199.543 80.347-106.573 45.377v-35.091l-48.927-19.861-44.043 20.815V564.94L245.333 592 512 471.688v-85.343l-240-96.062V232l190.417 76.08L512 285.599z"
          ></path>
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_362_8013"
          x1="352"
          x2="352"
          y1="0"
          y2="704"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#004BFF"></stop>
          <stop offset="1" stopColor="#4CEAAC"></stop>
        </linearGradient>
        <clipPath id="clip0_362_8013">
          <rect width="704" height="704" fill="#fff" rx="16"></rect>
        </clipPath>
        <clipPath id="clip1_362_8013">
          <path
            fill="#fff"
            d="M0 0H320V480H0z"
            transform="translate(192 112)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default SubWalletIcon;
