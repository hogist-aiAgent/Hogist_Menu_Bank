import {
  Card,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress, 
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import defaultImage from "../../assets/gallery/industry.webp";

const MenuCard = ({ title, items, foodType, image }) => {
  const [expanded, setExpanded] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fullText = items.join(", ");

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText).then(() => {
      setOpenSnackbar(true);
    });
  };

  return (
    <>
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
        <Box sx={{ position: "relative" }}>
          {/* Loader */}
          {!imageLoaded && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
            >
              <CircularProgress size={35} sx={{ color: "#c60000" }} />
            </Box>
          )}

          <Box
            component="img"
            src={image || defaultImage}
            alt="menu"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              filter: imageLoaded ? "blur(0px)" : "blur(12px)",
              transition: "filter 0.4s ease, opacity 0.4s ease",
              opacity: imageLoaded ? 1 : 0.7,
            }}
          />
        </Box>

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

        {/* COPY ICON (BOTTOM RIGHT) */}
        <Tooltip title="Copy Menu">
          <IconButton
            onClick={handleCopy}
            sx={{
              position: "absolute",
              bottom: 9,
              right: 9,
            }}
            size="small"
          >
            <ContentCopyIcon
              fontSize="small"
              sx={{ color: "#c60000" }}
            />
          </IconButton>
        </Tooltip>

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

      {/* SNACKBAR */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            backgroundColor: "#c60000",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          Copied!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MenuCard;