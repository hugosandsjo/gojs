"use client";

import { Ellipsis } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <style jsx>{`
            svg circle:nth-child(1) {
              animation: bounce 1s ease-in-out infinite;
              animation-delay: 0s;
            }
            svg circle:nth-child(2) {
              animation: bounce 1s ease-in-out infinite;
              animation-delay: 0.2s;
            }
            svg circle:nth-child(3) {
              animation: bounce 1s ease-in-out infinite;
              animation-delay: 0.4s;
            }
            @keyframes bounce {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
          `}</style>
          <Ellipsis className="h-12 w-12 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
