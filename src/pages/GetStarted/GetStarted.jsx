import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton,
  Chip,
  Grid,
  Slide,
  Button,
  Avatar
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import backgroundImage from "../../assets/getStarted/menu-bg.jpeg";
import { useNavigate } from "react-router-dom";

// Import icon images - REPLACE THESE WITH YOUR ACTUAL ICON PATHS
import SouthIndianIcon from "../../assets/popUp/southIndia.png";
import NorthIndianIcon from "../../assets/popUp/northIndia.png";
import AndhraIcon from "../../assets/popUp/andhra.png";
import KeralaIcon from "../../assets/popUp/kerala.png";

// Placeholder icons if you don't have them yet - using MUI icons as placeholders
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';

import breakfast from "../../assets/categoryIcon/breakfast.png";
import snacks from "../../assets/categoryIcon/snacks.png";
import lunch from "../../assets/categoryIcon/lunch.png";
import dinner from "../../assets/categoryIcon/dinner.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const GetStarted = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  // State for Regional Indian Cuisines flow
  const [regionalDialogOpen, setRegionalDialogOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [subOptionsOpen, setSubOptionsOpen] = useState(false);
  const [selectedSubOption, setSelectedSubOption] = useState(null);

  // Regional options with icons
  const regionalOptions = [
    { name: "South Indian", icon: SouthIndianIcon, iconComponent: <RestaurantIcon /> },
    { name: "North Indian", icon: NorthIndianIcon, iconComponent: <RestaurantIcon /> },
    { name: "Andhra", icon: AndhraIcon, iconComponent: <RestaurantIcon /> },
    { name: "Kerala", icon: KeralaIcon, iconComponent: <RestaurantIcon /> }
  ];

  // Sub-options based on selected region with icons
    const getSubOptions = (region) => {
      if (!region) return [];

      const map = {
        "South Indian": [
          "South India Breakfast",
          "South India Snacks",
          "South India Lunch & Dinner"
        ],
        "North Indian": [
          "North India Breakfast",
          "North India Snacks",
          "North India Lunch",
          "North India Dinner"
        ],
        "Andhra": [
          "Andhra Breakfast",
          "Andhra Snacks",
          "Andhra Lunch",
          "Andhra Dinner"
        ],
        "Kerala": [
          "Kerala Breakfast",
          "Kerala Snacks",
          "Kerala Lunch",
          "Kerala Dinner"
        ]
      };

      return map[region] || [];
    };  
  // Handle Regional Indian Cuisines card click
  const handleRegionalCardClick = () => {
    setRegionalDialogOpen(true);
  };

  // Handle region selection
// Handle region selection (UPDATED)
const handleRegionSelect = (region) => {
  setSelectedRegion(region);
};

// Handle sub-option selection (UPDATED)
const handleSubOptionSelect = (subOption) => {
  setSelectedSubOption(subOption);

  navigate("/regional-indian-cuisines", {
    state: {
      selectedRegion,
      selectedSubOption: subOption
    }
  });

  setRegionalDialogOpen(false);

  setTimeout(() => {
    setSelectedRegion(null);
    setSelectedSubOption(null);
  }, 500);
};

  // Handle close dialogs
  const handleCloseRegionalDialog = () => {
    setRegionalDialogOpen(false);
  };

  const handleCloseSubOptionsDialog = () => {
    setSubOptionsOpen(false);
    setSelectedRegion(null);
  };

  return (
    <>
      <Box
        sx={{
          mb: 5,
          px: isMobile ? 2 : 6,
          py: 8,
          position: "relative",
          overflow: "hidden",
          minHeight: "200px",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            opacity: 1,
            // transition: "opacity 0.6s ease-out",
            zIndex: 0,
            width: "100%",
            height: "900px",
          },

          "& > *": {
            position: "relative",
            zIndex: 1,
          },

          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
      >
        <Typography
          component="p"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "26px", sm: "30px", md: "40px" },
            mb: 5,
            color: "white",
          }}
        >
          Get Started
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 8,
            width: "100%",
            maxWidth: 1000,
            justifyContent: "center",
          }}
        >
          {/* ================= CARD 1 ================= */}
          <Card
            onClick={() => navigate("/customerfav")}
            sx={{
              flex: 1,
              maxWidth: isMobile ? "100%" : 400,
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              height: { xs: 180, md: 230 },
              minHeight: 190,
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              // transition: "transform 0.35s ease, box-shadow 0.35s ease",

              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))",
                opacity: 0,
                // transition: "opacity 0.35s ease",
                zIndex: 1,
              },

              "&:hover": {
               
                boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
              },

              "&:hover::after": {
                opacity: 1,
              },

              "&:hover .hover-btn": {
                opacity: 1,
                transform: "translateY(0)",
              },

              "&:hover .card-text": {
                opacity: 0.25,
              },
            }}
          >
            <CardContent
              className="card-text"
              sx={{
                p: 5,
                position: "relative",
                zIndex: 2,
                // transition: "opacity 0.3s ease",
              }}
            >
              <Typography
                component="p"
                sx={{
                  fontWeight: 600,
                  fontSize: isMobile ? "22px" : "28px",
                  mb: 2,
                  color: "#c60000",
                }}
              >
                Customer Favorites
              </Typography>

              <Typography
                component="p"
                sx={{
                  fontWeight: 600,
                  color: "#000",
                  fontSize: isMobile ? "16px" : "18px",
                }}
              >
                Tried, tested, and loved by customers
              </Typography>
            </CardContent>

            <Box
              className="hover-btn"
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                opacity: 0,
                transform: "translateY(12px)",
                // transition: "all 0.35s ease",
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  backgroundColor: "#fff",
                  color: "#c60000",
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                  fontFamily: theme.typography.fontFamily
                }}
              >
                Explore
              </Box>
            </Box>
          </Card>

          {/* ================= CARD 2 ================= */}
          <Card
            onClick={() => navigate("/preparemenu")}
            sx={{
              flex: 1,
              maxWidth: isMobile ? "100%" : 400,
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              height: { xs: 180, md: 230 },
              minHeight: 190,
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              // transition: "transform 0.35s ease, box-shadow 0.35s ease",

              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))",
                opacity: 0,
                // transition: "opacity 0.35s ease",
                zIndex: 1,
              },

              "&:hover": {
                boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
              },

              "&:hover::after": {
                opacity: 1,
              },

              "&:hover .hover-btn": {
                opacity: 1,
                transform: "translateY(0)",
              },

              "&:hover .card-text": {
                opacity: 0.25,
              },
            }}
          >
            <CardContent
              className="card-text"
              sx={{
                p: 5,
                position: "relative",
                zIndex: 2,
                // transition: "opacity 0.3s ease",
              }}
            >
              <Typography
                component="p"
                sx={{
                  fontWeight: 600,
                  fontSize: isMobile ? "22px" : "28px",
                  mb: 2,
                  color: "#c60000",
                }}
              >
                Prepare Your Menu
              </Typography>

              <Typography
                component="p"
                sx={{
                  fontWeight: 600,
                  color: "#000",
                  fontSize: isMobile ? "16px" : "18px",
                }}
              >
                Drag, drop, and enjoy your own creation
              </Typography>
            </CardContent>

            <Box
              className="hover-btn"
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                opacity: 0,
                transform: "translateY(12px)",
                // transition: "all 0.35s ease",
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  backgroundColor: "#fff",
                  color: "#c60000",
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                  fontFamily: theme.typography.fontFamily
                }}
              >
                Explore
              </Box>
            </Box>
          </Card>

          {/* ================= CARD 3 ================= */}
          <Card
            onClick={handleRegionalCardClick}
            sx={{
              flex: 1,
              maxWidth: isMobile ? "100%" : 400,
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              height: { xs: 180, md: 230 },
              minHeight: 190,
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              // transition: "transform 0.35s ease, box-shadow 0.35s ease",

              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))",
                opacity: 0,
                // transition: "opacity 0.35s ease",
                zIndex: 1,
              },

              "&:hover": {
                boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
              },

              "&:hover::after": {
                opacity: 1,
              },

              "&:hover .hover-btn": {
                opacity: 1,
                transform: "translateY(0)",
              },

              "&:hover .card-text": {
                opacity: 0.25,
              },
            }}
          >
            <CardContent
              className="card-text"
              sx={{
                p: 5,
                position: "relative",
                zIndex: 2,
                // transition: "opacity 0.3s ease",
              }}
            >
              <Typography
                component="p"
                sx={{
                  fontWeight: 600,
                  fontSize: isMobile ? "22px" : "28px",
                  mb: 2,
                  color: "#c60000",
                }}
              >
                Regional Indian cuisines
              </Typography>

              <Typography
                component="p"
                sx={{
                  fontWeight: 600,
                  color: "#000",
                  fontSize: isMobile ? "16px" : "18px",
                }}
              >
                Explore diverse regional flavors of India
              </Typography>
            </CardContent>

            <Box
              className="hover-btn"
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                opacity: 0,
                transform: "translateY(12px)",
                // transition: "all 0.35s ease",
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  backgroundColor: "#fff",
                  color: "#c60000",
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                  fontFamily: theme.typography.fontFamily
                }}
              >
                Explore
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>

      <Dialog
        open={regionalDialogOpen}
        onClose={handleCloseRegionalDialog}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 5,
            overflow: "hidden",
            bgcolor: "#ffffff",
            p: 2,
          }
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            mb: 2,
            mt: 1
          }}
        >
          {selectedRegion && (
            <Button
              onClick={() => setSelectedRegion(null)}
              sx={{
                position: "absolute",
                left: 0,
                color: "#c60000",
                fontWeight: 600,
                textTransform: "none"
              }}
            >
              Back
            </Button>
          )}

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "22px",
              color: "#c60000",
            }}
          >
            {selectedRegion ? selectedRegion : "Choose Region"}
          </Typography>

          <IconButton
            onClick={handleCloseRegionalDialog}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              bgcolor: "#f2f2f2",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ px: 2, pb: 3 }}>
          {/* ================= REGION VIEW ================= */}
          {!selectedRegion && (
            <Grid container spacing={3} justifyContent="center">
              {regionalOptions.map((option) => (
                <Grid item xs={4} sm={3} key={option.name}>
                  <Box
                    onClick={() => handleRegionSelect(option.name)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 3,
                        backgroundColor: "#f2f2f2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1,
                        transition: "0.3s",
                        "&:hover": {
                          border: "2px solid #c60000",
                        }
                      }}
                    >
                      <Avatar src={option.icon} sx={{ width: 40, height: 40 }} />
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#c60000",
                        textAlign: "center",
                      }}
                    >
                      {option.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

        {selectedRegion && (
  <Grid container spacing={3} justifyContent="center">
    {getSubOptions(selectedRegion).map((item) => {
      let iconImg;

      if (item.toLowerCase().includes("breakfast")) iconImg = breakfast;
      else if (item.toLowerCase().includes("snacks")) iconImg = snacks;
      else if (item.toLowerCase().includes("lunch")) iconImg = lunch;
      else if (item.toLowerCase().includes("dinner")) iconImg = dinner;

      return (
        <Grid item xs={4} sm={3} key={item}>
          <Box
            onClick={() => handleSubOptionSelect(item)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: 3,
                backgroundColor: "#f2f2f2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
                transition: "0.3s",
                "&:hover": {
                  border: "2px solid #c60000",
                }
              }}
            >
              <Avatar src={iconImg} sx={{ width: 40, height: 40 }} />
            </Box>

            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#c60000",
                textAlign: "center",
              }}
            >
              {item}
            </Typography>
          </Box>
        </Grid>
      );
    })}
  </Grid>
)}
        </DialogContent>
      </Dialog>
    </>
  );
};