import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Breadcrumbs,
  Link,
  Divider,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import vegImg from "../../assets/icons/broccoli.png";
import nonvegImg from "../../assets/icons/turkey.png";
import both from "../../assets/icons/food.png";

import { useNavigate } from "react-router-dom";
import { prepareMenuData } from "../../components/data/prepareMenuData";

const PrepareYourMenu = () => {
  const navigate = useNavigate();
  const categoryScrollRef = useRef(null);

  // LOAD FROM LOCAL STORAGE 
  const [selectedItems, setSelectedItems] = useState(() => {
    const saved = localStorage.getItem("selectedMenuItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeCategory, setActiveCategory] = useState(
    prepareMenuData[0]?.category
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [filterType, setFilterType] = useState("both");

  // SAVE TO LOCAL STORAGE WHENEVER selectedItems CHANGES
  useEffect(() => {
    localStorage.setItem(
      "selectedMenuItems",
      JSON.stringify(selectedItems)
    );
  }, [selectedItems]);

  const currentCategory = prepareMenuData.find(
    (cat) => cat.category === activeCategory
  );

  const allItems = useMemo(() => {
    if (!currentCategory) return [];

    const mapItems = (items = [], type) =>
      items.map((item, index) => ({
        ...item,
        type,
        id: `${activeCategory}-${type}-${item.name}-${index}`,
      }));

    return [
      ...mapItems(currentCategory.veg, "veg"),
      ...mapItems(currentCategory.nonVeg, "nonVeg"),
      ...mapItems(currentCategory.other, "other"),
    ];
  }, [currentCategory, activeCategory]);

  const filteredItems = useMemo(() => {
    if (filterType === "both") return allItems;
    return allItems.filter((item) => item.type === filterType);
  }, [allItems, filterType]);

  const handleAdd = (item) => {
    setSelectedItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const handleRemove = (item) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== item.id));
  };

    // CLEAR ALL FUNCTION 
  const handleClearAll = () => {
    setSelectedItems([]);
    localStorage.removeItem("selectedMenuItems");
  };

  const isAdded = (item) => {
    return selectedItems.some((i) => i.id === item.id);
  };

  const handleCopyMenu = () => {
    if (selectedItems.length === 0) return;

    const menuText = selectedItems.map((item) => item.name).join("\n");

    navigator.clipboard.writeText(menuText).then(() => {
      setOpenSnackbar(true);
    });
  };

  const scrollLeft = () => {
    categoryScrollRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    categoryScrollRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  const renderIndicator = (type, size = 16) => {
    if (type === "other") return null;
    const isVeg = type === "veg";

    return (
      <Box
        sx={{
          width: size,
          height: size,
          border: `2px solid ${isVeg ? "#2e7d32" : "#c62828"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 0,
            height: 0,
            borderLeft: `${size / 3}px solid transparent`,
            borderRight: `${size / 3}px solid transparent`,
            borderBottom: `${size / 2}px solid ${
              isVeg ? "#2e7d32" : "#c62828"
            }`,
          }}
        />
      </Box>
    );
  };

  return (
    <>
      <Box sx={{ px: 4, py: 3, backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            component="button"
            onClick={() => navigate("/")}
            sx={{ fontWeight: 600, textDecoration: "none" }}
          >
            Home
          </Link>
          <Typography fontWeight={600}>Prepare Your Menu</Typography>
        </Breadcrumbs>

        <Typography
          align="center"
          sx={{
            fontSize: { xs: 26, md: 36 },
            fontWeight: 800,
            color: "#c60000",
            mb: 4,
          }}
        >
          Prepare your Menu
        </Typography>

        {/* CATEGORY BUTTONS */}
        <Box sx={{ position: "relative", mb: 3 }}>
          <IconButton
            onClick={scrollLeft}
            sx={{
              position: "absolute",
              left: -10,
              top: "40%",
              transform: "translateY(-50%)",
              backgroundColor: "#fff",
              boxShadow: 2,
              zIndex: 2,
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          </IconButton>

          <Box
            ref={categoryScrollRef}
            sx={{
              display: "flex",
              gap: 2,
              width: "91%",
              overflowX: "auto",
              whiteSpace: "nowrap",
              pb: 1,
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": { display: "none" },
              ml: 7,
            }}
          >
            {prepareMenuData.map((cat) => (
              <Button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                sx={{
                  flex: "0 0 auto",
                  background:
                    activeCategory === cat.category
                      ? "linear-gradient(45deg,#ff4b2b,#c60000)"
                      : "#fff",
                  color: activeCategory === cat.category ? "#fff" : "#c60000",
                  borderRadius: "30px",
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: 2,
                }}
              >
                {cat.category}
              </Button>
            ))}
          </Box>

          <IconButton
            onClick={scrollRight}
            sx={{
              position: "absolute",
              right: -10,
              top: "40%",
              transform: "translateY(-50%)",
              backgroundColor: "#fff",
              boxShadow: 2,
              zIndex: 2,
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        {/* UPDATED TOGGLE BUTTONS WITH IMAGE ICONS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: 5,
          }}
        >
          {["veg", "nonVeg", "both"].map((type) => {
            const isActive = filterType === type;

            const baseStyles = {
              borderRadius: "8px",
              px: 4,
              py: 1,
              textTransform: "none",
              fontWeight: 700,
              boxShadow: 3,
              color: "#fff",
              minWidth: 130,
            };

            const styles =
              type === "veg"
                ? { backgroundColor: isActive ? "#226125" : "#3b8e3f" }
                : type === "nonVeg"
                ? { backgroundColor: isActive ? "#c60000" : "#d43939" }
                : { backgroundColor: isActive ? "#424242" : "#757474" };

            const iconSrc =
              type === "veg"
                ? vegImg
                : type === "nonVeg"
                ? nonvegImg
                : both;

            return (
              <Button
                key={type}
                onClick={() => setFilterType(type)}
                startIcon={
                  <Box
                    component="img"
                    src={iconSrc}
                    alt={type}
                    sx={{
                      width: 20,
                      height: 20,
                      objectFit: "contain",
                    }}
                  />
                }
                sx={{ ...baseStyles, ...styles }}
              >
                {type === "both"
                  ? "Both"
                  : type === "veg"
                  ? "Veg"
                  : "Non-Veg"}
              </Button>
            );
          })}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ flex: 3 }}>
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  mb: 3,
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: 100,
                      height: 80,
                      borderRadius: 2,
                      objectFit: "cover",
                    }}
                  />

                  <Box>
                    <Typography fontWeight={700}>
                      {item.name}
                    </Typography>
                    <Typography fontSize={14} color="#666">
                      Fresh mix of ingredients
                    </Typography>
                    {renderIndicator(item.type, 14)}
                  </Box>
                </Box>

                <Button
                  onClick={() =>
                    isAdded(item)
                      ? handleRemove(item)
                      : handleAdd(item)
                  }
                  sx={{
                    backgroundColor: isAdded(item)
                      ? "#2e7d32"
                      : "#c60000",
                    color: "#fff",
                    borderRadius: 2,
                    px: 3,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  {isAdded(item) ? "✓ Added" : "+ Add"}
                </Button>
              </Card>
            ))}
          </Box>

          {/* RIGHT SIDE  */}
          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: 4,
                position: { md: "sticky" },
                top: 100,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "#c60000",
                  fontSize: 18,
                }}
              >
                My Custom Menu
              </Typography>

                
              <Box
                sx={{
                  maxHeight: 300,
                  overflowY: "auto",
                  pr: 1,
                  mb: 2,
                }}
              >
                {selectedItems.length === 0 && (
                  <Typography fontSize={14} color="#777" mb={2}>
                    No items added yet.
                  </Typography>
                )}

                {selectedItems.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1.5,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {renderIndicator(item.type, 14)}
                      <Typography fontSize={14}>
                        {item.name}
                      </Typography>
                    </Box>

                    <DeleteIcon
                      sx={{ cursor: "pointer", fontSize: 18 }}
                      onClick={() => handleRemove(item)}
                    />
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography fontSize={14} mb={2}>
                Total Items: {selectedItems.length}
              </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <Button
                    disabled={selectedItems.length === 0}
                    onClick={handleClearAll}
                    sx={{
                      flex: 1,
                      backgroundColor: "#eeeeee",
                      color: "#c60000",
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                      },
                    }}
                  >
                    Clear All
                  </Button>

                  <Button
                    disabled={selectedItems.length === 0}
                    onClick={handleCopyMenu}
                    sx={{
                      flex: 1,
                      background: "linear-gradient(45deg,#ff4b2b,#c60000)",
                      color: "#fff",
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Copy Menu
                  </Button>
                </Box>
            </Card>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            backgroundColor: "#c60000",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 3,
          }}
        >
          Menu copied successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default PrepareYourMenu;