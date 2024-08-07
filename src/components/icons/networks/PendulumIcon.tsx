import { cn } from "@/lib/utils";
import * as React from "react";
const PendulumIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    id="Layer_1"
    x={0}
    y={0}
    enableBackground={"new 0 0 384 384"}
    viewBox="0 0 384 384"
    width="1em"
    height="1em"
    className={cn("rounded-md", className)}
  >
    <style>{".st1{fill:#fff}"}</style>
    <path
      d="M0 0h384v384H0z"
      style={{
        fill: "#32253e",
      }}
    />
    <path
      d="M193.8 64c-52-.9-96.5 41.6-97.7 93.6-.9 35.3 17.3 66.4 44.9 83.8 1.3.8 3.1.3 3.8-1.1l21.6-43.1c3.2-6.3 2.7-13.9-1.2-19.8-3.3-5.1-5.2-11.2-5.1-17.7.2-16.8 13.5-30.7 30.2-31.6 19.3-1 35.2 15.1 33.7 34.5-1.2 15.6-13.8 28.1-29.3 29.4h-.3c-7.1.5-13.4 4.6-16.6 11l-21.6 43c-.7 1.4 0 3.1 1.4 3.6 10.9 4.2 22.7 6.4 35.1 6.4 52.5-.3 95.4-43.4 95.4-95.9.1-52.5-42-95.2-94.3-96.1z"
      className="st1"
    />
    <circle cx={128.1} cy={288} r={32} className="st1" />
  </svg>
);
export default PendulumIcon;
