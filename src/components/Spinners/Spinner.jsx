"use client";

import {
  ClipLoader,
  BeatLoader,
  RingLoader,
  BarLoader,
  PulseLoader,
  SyncLoader,
  MoonLoader,
  BounceLoader,
  GridLoader,
  FadeLoader,
} from "react-spinners";

export default function Spinner({
  type = "clip",
  size = 40,
  color = "#0266D9",
}) {
  switch (type) {
    case "beat":
      return <BeatLoader size={size} color={color} />;

    case "ring":
      return <RingLoader size={size} color={color} />;

    case "bar":
      return <BarLoader width={150} color={color} />;

    case "pulse":
      return <PulseLoader size={size} color={color} />;

    case "sync":
      return <SyncLoader size={size / 2} color={color} />;

    case "moon":
      return <MoonLoader size={size} color={color} />;

    case "bounce":
      return <BounceLoader size={size} color={color} />;

    case "grid":
      return <GridLoader size={size / 2} color={color} />;

    case "fade":
      return <FadeLoader color={color} height={size} />;

    default:
      return <ClipLoader size={size} color={color} />;
  }
}