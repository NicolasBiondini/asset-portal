import { cn } from "@/lib/utils";
import React from "react";

function CentrifugeIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="209"
      height="208"
      fill="none"
      viewBox="0 0 209 208"
      className={cn("rounded-full", className)}
    >
      <path fill="#fff" d="M0 0.969H208.635V207.87199999999999H0z"></path>
      <mask
        id="mask0_2471_7535"
        style={{ maskType: "alpha" }}
        width="126"
        height="102"
        x="41"
        y="43"
        maskUnits="userSpaceOnUse"
      >
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M41.995 43.05h124.772v101.161H41.995V43.051z"
          clipRule="evenodd"
        ></path>
      </mask>
      <g mask="url(#mask0_2471_7535)">
        <path
          fill="#000"
          fillRule="evenodd"
          d="M56.605 140.454c-3.708-7.989-5.78-16.901-5.78-26.3 0-34.36 27.678-62.215 61.82-62.215 19.011 0 36.016 8.636 47.357 22.223l6.765-5.713c-12.96-15.528-32.395-25.398-54.122-25.398-39.02 0-70.65 31.834-70.65 71.103 0 10.742 2.366 20.927 6.604 30.057l8.006-3.757z"
          clipRule="evenodd"
        ></path>
      </g>
      <path
        fill="#000"
        fillRule="evenodd"
        d="M112.645 156.372c-23.167 0-41.948-18.902-41.948-42.218 0-23.316 18.78-42.217 41.948-42.217 12.9 0 24.438 5.862 32.133 15.082l6.767-5.715c-9.315-11.16-23.284-18.255-38.9-18.255-28.045 0-50.78 22.88-50.78 51.105 0 28.225 22.735 51.106 50.78 51.106v-8.888z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#000"
        fillRule="evenodd"
        d="M127.866 127.007c-3.645 4.367-9.11 7.144-15.221 7.144-10.974 0-19.87-8.954-19.87-19.998 0-11.045 8.896-19.998 19.87-19.998 6.111 0 11.576 2.777 15.221 7.144l7.61-6.427c-5.467-6.55-13.665-10.716-22.831-10.716-16.461 0-29.806 13.43-29.806 29.997s13.345 29.997 29.806 29.997c8.4 0 15.986-3.5 21.403-9.127l-6.182-8.016z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default CentrifugeIcon;
