import { ImageResponse } from "next/og";

export const alt = "Emerson Albornoz · Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#0a0a0b",
        color: "#ededed",
      }}
    >
      <div style={{ fontSize: 28, color: "#4ade80", fontFamily: "monospace" }}>
        ~/emerson-albornoz
      </div>
      <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24 }}>
        Emerson Albornoz
      </div>
      <div style={{ fontSize: 36, color: "#8a8a93", marginTop: 16 }}>
        Software Engineer · Backend &amp; Cloud
      </div>
    </div>,
    size,
  );
}
