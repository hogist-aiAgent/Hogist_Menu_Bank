import {
  Card,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import defaultImage from "../../assets/gallery/industry.webp";


const MenuCard = ({ title, items, foodType, image }) => {
  const [expanded, setExpanded] = useState(false);

  const fullText = items.join(", ");

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s ease",
      }}
    >
      {/* IMAGE */}
      <Box
        component="img"
        src={image || defaultImage}
        alt="menu"
        sx={{
          width: "100%",
          height: 200,
          objectFit: "cover",
        }}
      />

      {/* VEG / NON-VEG INDICATOR (TOP RIGHT) */}
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 19,
          width: 16,
          height: 16,
          border: `2px solid ${
            foodType?.toUpperCase() === "VEG"
              ? "#0f8a3b"
              : "#ce0505"
          }`,
          borderRadius: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          zIndex: 3,
        }}
      >
        {foodType?.toUpperCase() === "VEG" ? (
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderBottom: "7px solid #0f8a3b",
            }}
          />
        ) : (
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderBottom: "7px solid #ce0505",
            }}
          />
        )}
      </Box>

      {/* CONTENT */}
      <Box
        sx={{
          p: 2.5,
        }}
      >
        <Typography
          component="p"
          fontWeight="bold"
          mb={1}
        >
          {title}
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          component="p"
          sx={{
            fontSize: "14px",
            color: "#555",
            lineHeight: 1.6,
            display: expanded ? "block" : "-webkit-box",
            WebkitLineClamp: expanded ? "unset" : 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {fullText}
        </Typography>

        {!expanded && fullText.length > 40 && (
          <Typography
            component="span"
            onClick={() => setExpanded(true)}
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#c60000",
              cursor: "pointer",
            }}
          >
            ... Read more
          </Typography>
        )}

        {expanded && (
          <Typography
            component="span"
            onClick={() => setExpanded(false)}
            sx={{
              display: "inline-block",
              mt: 1,
              fontSize: "13px",
              fontWeight: 600,
              color: "#c60000",
              cursor: "pointer",
            }}
          >
            Read less
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default MenuCard;