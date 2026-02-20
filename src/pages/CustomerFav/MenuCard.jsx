import {
  Card,
  Typography,
  Box,
  Divider,
  Dialog,
  DialogContent,
  IconButton,
  Button,
  Stack,
  Zoom
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import defaultImage from "../../assets/gallery/industry.webp";

const MenuCard = ({ title, items, foodType, image }) => {
  const [open, setOpen] = useState(false);

  const isVeg = foodType?.toUpperCase() === "VEG";
  const themeColor = isVeg ? "#00a854" : "#d32f2f";

  return (
    <>
      <Card
        sx={{
          width: "100%",
          height: 400, // Fixed height for even grid
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          border: "1px solid #f0f0f0",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
        {/* IMAGE SECTION */}
        <Box sx={{ position: "relative", height: 180, flexShrink: 0 }}>
          <Box
            component="img"
            src={image || defaultImage}
            alt={title}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: "rgba(255,255,255,0.9)",
              px: 1.5,
              py: 0.5,
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: themeColor }} />
            <Typography sx={{ fontSize: "10px", fontWeight: 800, color: "#333", letterSpacing: 1 }}>
              {foodType?.toUpperCase()}
            </Typography>
          </Box>
        </Box>

        {/* CONTENT SECTION */}
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "1.25rem",
              color: "#c60800",
              mb: 0.5,
              lineHeight: 1.2,
              height: "3rem", // Keeps title space even
              overflow: "hidden"
            }}
          >
            {title}
          </Typography>

          <Divider sx={{ width: "40px", height: "3px", bgcolor: themeColor, mb: 2, borderRadius: 1, border: 'none' }} />

          <Typography
            sx={{
              fontSize: "14px",
              color: "#666",
              lineHeight: 1.6,
              fontStyle: "italic",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {items.join(" • ")}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Button 
            onClick={() => setOpen(true)}
            fullWidth
            sx={{ 
              mt: 2, 
              border: "1px solid #eee", 
              borderRadius: "8px", 
              py: 0.5,
              color: "#888",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              "&:hover": { bgcolor: "#f9f9f9", borderColor: "#ddd" }
            }}
          >
            View Full Menu
          </Button>
        </Box>
      </Card>

      {/* --- COMPACT POPUP (MATCHES PREVIOUS STYLE) --- */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Zoom}
        PaperProps={{
          sx: { 
            borderRadius: "20px", 
            width: "340px", // Smaller, compact width
            p: 1,
            overflow: 'hidden'
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "#999" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ textAlign: 'center', pt: 0, pb: 4 }}>
          <Typography sx={{ fontWeight: 900, fontSize: "1.4rem", color: "#c60800", mb: 1 }}>
            {title}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Divider sx={{ width: "40px", height: "3px", bgcolor: themeColor, border: 'none', borderRadius: 1 }} />
          </Box>

          <Stack spacing={1.5} sx={{ px: 2, mb: 4 }}>
            {items.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <FiberManualRecordIcon sx={{ fontSize: "8px", color: themeColor }} />
                <Typography sx={{ fontSize: "14px", color: "#444", fontWeight: 600, textAlign: 'left' }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: themeColor,
              color: "#fff",
              borderRadius: "10px",
              py: 1.2,
              fontWeight: 800,
              boxShadow: `0 4px 15px ${themeColor}40`,
              "&:hover": { bgcolor: themeColor, opacity: 0.9 }
            }}
          >
            ORDER NOW
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuCard;