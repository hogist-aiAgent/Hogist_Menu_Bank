import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  ButtonBase,
  Paper,
  IconButton,
  alpha,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import {
  CategoryOutlined,
  FiberManualRecord,
  ChevronLeft,
  ChevronRight,
  KeyboardArrowDown,
  FilterList,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const CategoryBar = ({
  categories = [],
  activeCategory,
  setActiveCategory,
  setFoodType,
}) => {
  const scrollRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isScrolled, setIsScrolled] = useState(false);
  const [diet, setDiet] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  // Placeholder height logic
  const DESKTOP_HEIGHT = 160;
  const MOBILE_HEIGHT = 110;

  // UI stays primary color regardless of selection
  // {["VEG", "NON-VEG", "BOTH"].map(type => (

  const diets = {
    all: { label: "All Food", icon: <FilterList fontSize="small" /> },
    veg: {
      label: "Pure Veg",
      icon: <FiberManualRecord sx={{ fontSize: 10, color: "#4caf50" }} />,
    },
    "non-veg": {
      label: "Non-Veg",
      icon: <FiberManualRecord sx={{ fontSize: 10, color: "#f44336" }} />,
    },
  };

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = (type) => {
    const dietKey = {
      all: "BOTH",
      veg: "VEG",
      "non-veg": "NON-VEG",
    };
    console.log("Selected diet type:", type); // Debug log
    if (type) {
      setDiet(type);
      setFoodType(dietKey[type]);
    }
    setAnchorEl(null);
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScroll({
        left: scrollLeft > 10,
        right: scrollLeft < scrollWidth - clientWidth - 10,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    checkScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction) => {
    scrollRef.current.scrollBy({
      left: direction === "left" ? -250 : 250,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        minHeight: isScrolled
          ? isMobile
            ? MOBILE_HEIGHT
            : DESKTOP_HEIGHT
          : "auto",
      }}
    >
      <Box
        sx={{
          position: isScrolled ? "fixed" : "relative",
          top: isScrolled ? (isMobile ? 70 : 70) : 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          px: isScrolled && !isMobile ? { sm: 4 } : 0,
          transition: "0.3s ease-in-out",
        }}
      >
        <Paper
          elevation={isScrolled ? 4 : 0}
          sx={{
            p: isScrolled && isMobile ? 1.2 : 2,
            borderRadius:
              isScrolled && !isMobile
                ? "24px"
                : isScrolled && isMobile
                  ? "0px"
                  : "16px",
            background: "#ffffff",
            borderBottom: "1px solid",
            borderColor: alpha(theme.palette.divider, 0.1),
          }}
        >
          {/* Header Row */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={isScrolled && isMobile ? 0.8 : 1.5}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              {  (
                <Box
                  sx={{
                    display: "flex",
                    p: 0.8,
                    borderRadius: 1.5,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                  }}
                >
                  <CategoryOutlined fontSize="small" />
                </Box>
              )}
              <Typography
                variant="h6"
                sx={{
             
                  fontSize: isScrolled && isMobile ? "0.9rem" : "1.05rem",
                  fontWeight: 800,
                }}
              >
                { "Menu Categories"}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <ButtonBase
                onClick={handleOpen}
                sx={{
                  height: 32,
                  px: 1.5,
                  borderRadius: "50px",
                  bgcolor: alpha(theme.palette.text.primary, 0.04),
                  color: "text.primary",
                  border: "1px solid",
                  borderColor: alpha(theme.palette.divider, 0.2),
                  gap: 1,
                }}
              >
                {diets[diet].icon}
                <Typography sx={{ fontSize: "0.7rem", fontWeight: 700 }}>
                  {diets[diet].label}
                </Typography>
                <KeyboardArrowDown sx={{ fontSize: 14 }} />
              </ButtonBase>

              {!isMobile && (canScroll.left || canScroll.right) && (
                <Stack direction="row" spacing={0.5}>
                  <IconButton
                    size="small"
                    onClick={() => scroll("left")}
                    disabled={!canScroll.left}
                  >
                    <ChevronLeft fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => scroll("right")}
                    disabled={!canScroll.right}
                  >
                    <ChevronRight fontSize="small" />
                  </IconButton>
                </Stack>
              )}
            </Stack>
          </Stack>

          {/* Categories List */}
          <Box
            ref={scrollRef}
            onScroll={checkScroll}
            sx={{
              display: "flex",
              gap: 1.2,
              overflowX: "auto",
              scrollBehavior: "smooth",
              "::-webkit-scrollbar": { display: "none" },
              py: 0.2,
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <ButtonBase
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.key)}
                  sx={{
                    flexShrink: 0,
                    flexDirection: "row",
                    minWidth: isScrolled
                      ? isMobile
                        ? "90px"
                        : "120px"
                      : "140px",
                    height: isScrolled && isMobile ? "36px" : "50px",
                    borderRadius: isScrolled ? "50px" : "12px",
                    px: 1.8,
                    gap: 1,
                    transition: "0.2s",
                    bgcolor: isActive
                      ? theme.palette.primary.main
                      : "transparent",
                    color: isActive ? "white" : "text.primary",
                    border: "1px solid",
                    borderColor: isActive
                      ? theme.palette.primary.main
                      : alpha(theme.palette.divider, 0.1),
                  }}
                >
                  <Box
                    sx={{
                      fontSize: isScrolled && isMobile ? "1rem" : "1.2rem",
                      color: isActive ? "white" : theme.palette.primary.main,
                      display: "flex",
                    }}
                  >
                    {cat.icon}
                  </Box>
                  <Stack alignItems="flex-start" spacing={-0.3}>
                    <Typography
                      sx={{
                        fontSize: isScrolled && isMobile ? "0.7rem" : "0.8rem",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cat.label}
                    </Typography>
                    {/* Sub-label remains visible but scales down on mobile scroll */}
                    {cat.subLabel && (
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize:
                            isScrolled && isMobile ? "0.55rem" : "0.6rem",
                          opacity: 0.6,
                          fontWeight: 500,
                          display: isScrolled && isMobile ? "none" : "block", // Cleanest look on mobile scroll
                        }}
                      >
                        {cat.subLabel}
                      </Typography>
                    )}
                  </Stack>
                </ButtonBase>
              );
            })}
          </Box>
        </Paper>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleClose()}
          PaperProps={{ sx: { borderRadius: "10px", mt: 1, minWidth: 140 } }}
        >
          {Object.entries(diets).map(([key, value]) => (
            <MenuItem
              key={key}
              onClick={() => handleClose(key)}
              sx={{ py: 1, mx: 0.5, borderRadius: "6px" }}
            >
              <ListItemIcon>{value.icon}</ListItemIcon>
              <ListItemText
                primary={value.label}
                primaryTypographyProps={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              />
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default CategoryBar;
