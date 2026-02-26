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
  Zoom,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import defaultImage from "../../assets/gallery/industry.webp";

const MenuCard = ({ title, items, foodType, image }) => {
  const [open, setOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const isVeg = foodType?.toUpperCase() === "VEG";
  const themeColor = isVeg ? "#00a854" : "#d32f2f";
  const themebgColor = isVeg ? "#00a854a3" : "#d32f2fa4";
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCopyMenu = async () => {
    const menuText = `${title}\n\n${items.join("\n")}`;
    try {
      await navigator.clipboard.writeText(menuText);
      setCopySuccess(true);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          height: 380,
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          border: "1px solid #f0f0f0",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.02)" },
          borderTop: `3px solid ${themeColor}`,
        }}
      >
        {/* IMAGE SECTION */}
        <Box sx={{ position: "relative", height: 180, flexShrink: 0, padding: "6px" }}>
          <Box sx={{ position: "relative" }}>
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
                height: 174,
                objectFit: "cover",
                filter: imageLoaded ? "blur(0px)" : "blur(12px)",
                transition: "filter 0.4s ease, opacity 0.4s ease",
                opacity: imageLoaded ? 1 : 0.7,
                borderRadius: "15px",
              }}
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: 20,
              left: 19,
              backgroundColor: "rgba(255,255,255,0.9)",
              px: 1.5,
              py: 0.5,
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
            }}
          >
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: themeColor }} />
            <Typography sx={{ fontSize: "10px", fontWeight: 800, color: "#333", letterSpacing: 1 }}>
              {foodType?.toUpperCase()}
            </Typography>
          </Box>
        </Box>

        {/* CONTENT SECTION */}
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1, pt: 0 }}>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "1.2rem",
              color: "#c60800",
              lineHeight: 1.2,
              height: "3rem",
              overflow: "hidden"
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              color: "#666",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mt: { xs: 0, md: 1 },
            }}
          >
            {items.join(" • ")}
          </Typography>

          <Box sx={{ flexGrow: 0 }} />

          <Button
            onClick={() => setOpen(true)}
            fullWidth
            sx={{
              mt: { xs: 1.5, md: 2 },
              border: "2px solid #eee",
              borderRadius: "8px",
              py: 0.5,
              color: "#696969",
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

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Zoom}
        PaperProps={{
          sx: {
            borderRadius: "24px",
            width: "360px",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderTop: `6px solid ${themeColor}`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)"
          },
        }}
      >

        <Snackbar
          open={copySuccess}
          autoHideDuration={2000}
          onClose={() => setCopySuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            mt: { xs: 6, sm: 0 }  // 🔥 moved slightly down on mobile
          }}
        >
          <Alert
            onClose={() => setCopySuccess(false)}
            severity="success"
            sx={{ width: {xs:"70%",md:"90%"} }}
          >
            Menu copied successfully!
          </Alert>
        </Snackbar>

        <Box sx={{ position: "absolute", right: 18, top: 10, zIndex: 10 }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              width: 25,
              height: 25,
              borderRadius: "50%",
              backgroundColor: "#fff",
              border: `1px solid ${themeColor}30`,
              boxShadow: `0 4px 12px ${themeColor}25`,
              transition: "all 0.25s ease",
              "&:hover": {
                backgroundColor: themeColor,
                transform: "rotate(90deg)",
                boxShadow: `0 6px 18px ${themeColor}40`,
                "& .MuiSvgIcon-root": {
                  color: "#fff"
                }
              }
            }}
          >
            <CloseIcon sx={{ fontSize: 18, color: themeColor, transition: "0.25s" }} />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", flex: 1 }}>
          <Box
            sx={{
              background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}05)`,
              px: 3,
              py: 3,
              textAlign: "center",
              borderBottom: `1px solid ${themeColor}20`,
              flexShrink: 0
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: "1.35rem",
                color: themeColor,
                letterSpacing: 0.5
              }}
            >
              {title}
            </Typography>

            <Box
              sx={{
                width: 50,
                height: 4,
                bgcolor: themeColor,
                borderRadius: 2,
                mx: "auto",
                mt: 1.5
              }}
            />
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto", px: 3, py: 2 }}>
            <Stack spacing={0.2}>
              {items.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1,
                    borderRadius: 2,
                    transition: "0.2s",
                    "&:hover": {
                      bgcolor: `${themeColor}10`
                    }
                  }}
                >
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "9px",
                      color: themeColor
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#444",
                      fontWeight: 600,
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box sx={{ px: 3, py: 2, borderTop: "1px solid #eee", flexShrink: 0 }}>
            <Button
              onClick={handleCopyMenu}
              startIcon={<ContentCopyIcon />}
              fullWidth
              variant="contained"
              sx={{
                background: `linear-gradient(45deg, ${themeColor}, ${themeColor}cc)`,
                color: "#fff",
                borderRadius: "12px",
                py: 1.3,
                fontWeight: 800,
                letterSpacing: 1,
                boxShadow: `0 6px 20px ${themeColor}40`,
                "&:hover": {
                  opacity: 0.9,
                  background: `linear-gradient(45deg, ${themeColor}, ${themeColor})`,
                }
              }}
            >
              COPY MENU
            </Button>
          </Box>

        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuCard;