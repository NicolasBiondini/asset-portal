import React from "react";

function BifrostIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="288"
      height="288"
      fill="none"
      viewBox="0 0 288 288"
      className={className}
    >
      <path
        fill="#000"
        d="M249.6 0H38.4C17.192 0 0 17.192 0 38.4v211.2C0 270.808 17.192 288 38.4 288h211.2c21.208 0 38.4-17.192 38.4-38.4V38.4C288 17.192 270.808 0 249.6 0z"
      ></path>
      <path
        fill="url(#paint0_linear_1_15)"
        d="M234 75h-45L54 210h90l90-135z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_1_15"
          x1="144"
          x2="144"
          y1="75"
          y2="210"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7AEDCF"></stop>
          <stop offset="0.201" stopColor="#68CEFA"></stop>
          <stop offset="0.403" stopColor="#689CF8"></stop>
          <stop offset="0.602" stopColor="#AC57C0"></stop>
          <stop offset="0.802" stopColor="#E65659"></stop>
          <stop offset="1" stopColor="#F2C241"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default BifrostIcon;
