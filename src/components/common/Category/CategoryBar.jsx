import React, { useRef, useState, useEffect, useCallback } from "react";
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

  const DESKTOP_HEIGHT = 160;
  const MOBILE_HEIGHT = 70;

  const diets = {
    all: { label: "Both ", icon: <FilterList fontSize="small" /> },
    veg: {
      label: "Veg",
      icon: <FiberManualRecord sx={{ fontSize: 10, color: "#4caf50" }} />,
    },
    "non-veg": {
      label: "Non-Veg",
      icon: <FiberManualRecord sx={{ fontSize: 10, color: "#f44336" }} />,
    },
  };

  const handleClose = (type) => {
    const dietKey = {
      all: "BOTH",
      veg: "VEG",
      "non-veg": "NON-VEG",
    };
    if (type) {
      setDiet(type);
      setFoodType(dietKey[type]);
    }
    setAnchorEl(null);
  };

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;

    requestAnimationFrame(() => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      const newState = {
        left: scrollLeft > 5,
        right: scrollLeft < scrollWidth - clientWidth - 5,
      };

      setCanScroll((prev) =>
        prev.left !== newState.left || prev.right !== newState.right
          ? newState
          : prev
      );
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 340);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [checkScroll]);

  useEffect(() => {
    checkScroll();
  }, [categories, checkScroll]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -250 : 250,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        height: isScrolled
          ? isMobile
            ? MOBILE_HEIGHT
            : DESKTOP_HEIGHT
          : "auto",
      }}
    >
      <Box
        sx={{
          position: isScrolled ? "fixed" : "relative",
          top: isScrolled ? (isMobile ? 0 : 70) : 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          px: isScrolled && !isMobile ? { sm: 4 } : 0,

          /* 🔥 Smoothness added here */
          transform: isScrolled
            ? "translateY(0px)"
            : "translateY(0px)",
          opacity: isScrolled ? 1 : 1,
          transition:
            "transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease, padding 0.25s ease",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        <Paper
          elevation={isScrolled ? 4 : 0}
          sx={{
            p: isScrolled && isMobile ? 2.5 : 2,
            borderRadius:
              isScrolled && !isMobile
                ? "24px"
                : isScrolled && isMobile
                ? "0px"
                : "16px",
            background: "#ffffff",
            borderBottom: "1px solid",
            borderColor: alpha(theme.palette.divider, 0.1),
            transition:
              "border-radius 0.35s cubic-bezier(0.4,0,0.2,1), padding 0.25s ease",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={isScrolled && isMobile ? 0.8 : 1.5}
            sx={{
              flexWrap: isMobile ? "wrap" : "nowrap",
              gap: isMobile ? 1 : 0,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  display: "flex",
                  p: 0.9,
                  borderRadius: 1.5,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                }}
              >
                <CategoryOutlined fontSize="small" />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: isScrolled || isMobile ? "0.9rem" : "1.05rem",
                  fontWeight: 800,
                }}
              >
                Menu Categories
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  display: "flex",
                  p: 0.5,
                  bgcolor: alpha(theme.palette.text.primary, 0.05),
                  borderRadius: "12px",
                  border: "1px solid",
                  borderColor: alpha(theme.palette.divider, 0.1),
                  flexShrink: 0,
                }}
              >
                {Object.entries(diets).map(([key, value]) => {
                  const isSelected = diet === key;
                  return (
                    <ButtonBase
                      key={key}
                      onClick={() => {
                        const dietKeyMap = {
                          all: "BOTH",
                          veg: "VEG",
                          "non-veg": "NON-VEG",
                        };
                        setDiet(key);
                        setFoodType(dietKeyMap[key]);
                      }}
                      sx={{
                        px: { xs: 1.2, sm: 2 },
                        py: 0.8,
                        borderRadius: "10px",
                        transition: "all 0.2s ease",
                        bgcolor: isSelected ? "#ffffff" : "transparent",
                        boxShadow: isSelected
                          ? "0 2px 8px rgba(0,0,0,0.1)"
                          : "none",
                        color: isSelected ? "#c60800" : "text.secondary",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        {value.icon}
                        <Typography
                          sx={{
                            fontSize: "0.7rem",
                            fontWeight: 800,
                            display: {
                              xs: isSelected ? "block" : "none",
                              sm: "block",
                            },
                            whiteSpace: "nowrap",
                            ml: 0.5,
                          }}
                        >
                          {value.label}
                        </Typography>
                      </Stack>
                    </ButtonBase>
                  );
                })}
              </Box>

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

          <Box
            ref={scrollRef}
            onScroll={checkScroll}
            sx={{
              display: "flex",
              gap: 1.2,
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
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
                    minWidth: isMobile ? "90px" : "140px",
                    height: isScrolled || isMobile ? "36px" : "50px",
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
                      fontSize: isScrolled || isMobile ? "1rem" : "1.2rem",
                      color: isActive ? "white" : theme.palette.primary.main,
                      display: "flex",
                    }}
                  >
                    {cat.icon}
                  </Box>
                  <Stack alignItems="flex-start" spacing={-0.3}>
                    <Typography
                      sx={{
                        fontSize: isScrolled || isMobile ? "0.7rem" : "0.8rem",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cat.label}
                    </Typography>
                    {cat.subLabel && (
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize:
                            isScrolled || isMobile ? "0.7rem" : "0.8rem",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
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