"use client";
import Circleloader from "react-spinners/ClipLoader";

type SpinnerProps = {};

export default function Spinner({}: SpinnerProps) {
  return (
    <div className="pb-20">
      <Circleloader
        color="black"
        loading={true}
        size={75}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={0.6}
      />
    </div>
  );
}