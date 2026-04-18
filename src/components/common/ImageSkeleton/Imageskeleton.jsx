import { useState } from "react";

export default function FoodCard({ item, type, onClick, isSelected }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const optimizedSrc = item.image ? item.image + "=w400" : "";

  return (
    <div
      onClick={() => onClick?.(item)}
      style={{
        border: isSelected ? "2px solid #c0392b" : "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        background: "white",
      }}
    >
      {/* Image area */}
      <div style={{ position: "relative", aspectRatio: "4/3", background: "#f3f4f6" }}>
        
        {/* Skeleton — shown while image loads */}
        {!imgLoaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
              backgroundSize: "800px 100%",
              animation: "shimmer 1.4s infinite",
            }}
          />
        )}

        {/* Actual image */}
        <img
          src={optimizedSrc}
          alt={item.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      {/* Card body */}
      <div style={{ padding: "10px 12px 14px" }}>
        {!imgLoaded ? (
          <>
            <div style={skeletonStyle("60px", "18px", "0 0 6px")} />
            <div style={skeletonStyle("90%", "14px", "0 0 4px")} />
            <div style={skeletonStyle("60%", "14px")} />
          </>
        ) : (
          <>
            <span style={badgeStyle(type)}>
              <span style={dotStyle(type)} /> {type === "nonVeg" ? "NON-VEG" : "VEG"}
            </span>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#c0392b", lineHeight: 1.4 }}>
              {item.name}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// Helper styles
const shimmerBase = {
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "800px 100%",
  animation: "shimmer 1.4s infinite",
  borderRadius: "4px",
};

const skeletonStyle = (width, height, margin = 0) => ({
  ...shimmerBase,
  width,
  height,
  margin,
});

const badgeStyle = (type) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "11px",
  fontWeight: 600,
  padding: "3px 8px",
  borderRadius: "20px",
  marginBottom: "6px",
  background: type === "nonVeg" ? "#fff1f2" : "#f0fdf4",
  color: type === "nonVeg" ? "#9f1239" : "#166534",
});

const dotStyle = (type) => ({
  width: "7px",
  height: "7px",
  borderRadius: "50%",
  background: type === "nonVeg" ? "#e11d48" : "#16a34a",
  display: "inline-block",
});