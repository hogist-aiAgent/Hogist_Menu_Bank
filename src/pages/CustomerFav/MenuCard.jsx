import {
  Card,
  Typography,
  IconButton,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

const MenuCard = ({ title, items, foodType }) => {
  const [open, setOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(items.join("\n"));
    setOpen(true);
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          height: 370,             
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/*  VEG / NON-VEG INDICATOR (TOP RIGHT) */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 19,
            width: 16,
            height: 16,
            border: `2px solid ${
              foodType?.toUpperCase() === "VEG" ? "#0f8a3b" : "#ce0505"
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


        {/* COPY ICON */}
        <IconButton
          onClick={handleCopy}
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            zIndex: 2,
            backgroundColor: "#fff",
          }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>

        {/* SCROLLABLE CONTENT */}
        <Box
          sx={{
            height: "100%",
            overflowY: "auto",
            padding: "16px",
            paddingBottom: "64px",
            boxSizing: "border-box",
            mt:3
          }}
        >
          <Typography  component="p" fontWeight="bold" mb={1}>
            {title}
          </Typography>

          {items.map((item, index) => (
            <Typography key={index} component="p">
              • {item}
            </Typography>
          ))}
        </Box>
      </Card>

      {/* COPY CONFIRMATION (UNCHANGED) */}
      <Snackbar
        open={open}
        autoHideDuration={1800}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          icon={false}
          sx={{
            backgroundColor: "#fff",
            color: "#333",
            border: "1px solid #ddd",
            fontSize: "12px",
            padding: "4px 10px",
            minWidth: "auto",
            boxShadow: "none",
            borderRadius: "10px",
          }}
        >
          Menu copied
        </Alert>
      </Snackbar>
    </>
  );
};

export default MenuCard;
