import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0b",
        color: "#f7990c",
        fontSize: 23,
        fontWeight: 800,
        fontFamily: "Arial",
        borderRadius: 7,
        border: "1px solid #27272a",
        boxSizing: "border-box",
      }}
    >
      E
    </div>,
    size,
  );
}
