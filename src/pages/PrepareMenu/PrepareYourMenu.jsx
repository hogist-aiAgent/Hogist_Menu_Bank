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
  Drawer,
  Fab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuIcon from "@mui/icons-material/Menu";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      setMobileMenuOpen(false);
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

  // Mobile Menu Drawer Content
  const mobileMenuDrawer = (
    <Box 
      sx={{ 
        width: '100%', 
        p: 1.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderRadius: 4,
          boxShadow: 4,
          width: { xs: '85%', sm: '85%', md: '400px' },
          maxWidth: '380px',
          margin: '0 auto',
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "#c60000",
            fontSize: { xs: 18, sm: 20 },
            textAlign: 'center'
          }}
        >
          My Custom Menu
        </Typography>

        <Box
          sx={{
            maxHeight: { xs: 280, sm: 320 },
            overflowY: "auto",
            pr: 1,
            mb: 2,
          }}
        >
          {selectedItems.length === 0 && (
            <Typography fontSize={{ xs: 14, sm: 15 }} color="#777" mb={2} textAlign="center">
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, maxWidth: '70%' }}>
                {renderIndicator(item.type, 16)}
                <Typography fontSize={{ xs: 14, sm: 15 }} noWrap>
                  {item.name}
                </Typography>
              </Box>

              <DeleteIcon
                sx={{ cursor: "pointer", fontSize: { xs: 18, sm: 20 }, flexShrink: 0 }}
                onClick={() => handleRemove(item)}
              />
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Typography fontSize={{ xs: 14, sm: 15 }} mb={2} textAlign="center">
          Total Items: {selectedItems.length}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 1.5 },
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
          }}
        >
          <Button
            disabled={selectedItems.length === 0}
            onClick={() => {
              handleClearAll();
              setMobileMenuOpen(false);
            }}
            sx={{
              flex: 1,
              backgroundColor: "#eeeeee",
              color: "#c60000",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              py: { xs: 1, sm: 1 },
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
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              py: { xs: 1, sm: 1 },
            }}
          >
            Copy Menu
          </Button>
        </Box>
      </Card>
    </Box>
  );

  return (
    <>
      <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 3 }, backgroundColor: "#f6f6f6", minHeight: "100vh",  }}>
        <Breadcrumbs sx={{ mb: 2, fontSize: { xs: '0.875rem', md: '1rem' }, }}>
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
            fontSize: { xs: 24, sm: 26, md: 36 },
            fontWeight: 800,
            color: "#c60000",
            mb: { xs: 3, md: 4 },
          }}
        >
          Prepare your Menu
        </Typography>

        {/* CATEGORY BUTTONS */}
        <Box sx={{ position: "relative", mb: 3, px: { xs: 2, md: 0 } }}>
          <IconButton
            onClick={scrollLeft}
            sx={{
              position: "absolute",
              left: { xs: -5, md: -10 },
              top: "40%",
              transform: "translateY(-50%)",
              backgroundColor: "#fff",
              boxShadow: 2,
              zIndex: 2,
              "&:hover": { backgroundColor: "#f5f5f5" },
              display: 'flex'
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          </IconButton>

          <Box
            ref={categoryScrollRef}
            sx={{
              display: "flex",
              gap: 2,
              width: { xs: '80%', sm: '91%' },
              overflowX: "auto",
              whiteSpace: "nowrap",
              pb: 1,
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": { display: "none" },
              ml: { xs: 4, sm: 7 },
              mr: { xs: 4, sm: 0 },
              px: { xs: 0, sm: 0 }
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
                  px: { xs: 2, sm: 3 },
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: 2,
                  fontSize: { xs: '0.875rem', sm: '0.875rem', md: '1rem' }
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
              right: { xs: -5, md: -10 },
              top: "40%",
              transform: "translateY(-50%)",
              backgroundColor: "#fff",
              boxShadow: 2,
              zIndex: 2,
              "&:hover": { backgroundColor: "#f5f5f5" },
              display: 'flex'
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
            gap: { xs: 1, sm: 2 },
            mb: { xs: 1, md: 2 },
            flexWrap: "wrap",
            px: { xs: 1, md: 0 },
            width: { xs: '100%', md: 'auto' },
          }}
        >
          {["veg", "nonVeg", "both"].map((type) => {
            const isActive = filterType === type;

            const baseStyles = {
              borderRadius: "8px",
              px: { xs: 2, sm: 3, md: 4 },
              py: 1,
              textTransform: "none",
              fontWeight: 700,
              boxShadow: 3,
              color: "#fff",
              minWidth: { xs: 90, sm: 120, md: 130 },
              fontSize: { xs: '0.875rem', sm: '0.875rem', md: '1rem' }
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
                      width: { xs: 18, sm: 20 },
                      height: { xs: 18, sm: 20 },
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

        {/* ACTIVE CATEGORY DISPLAY */}
         <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            mb: { xs: 1, md: 1 },
            mt: { xs: 3, md: 2 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.3rem' },
              fontWeight: 600,
              color: '#c60000',
             
              px: { xs: 1, sm: 1 },
              py: { xs: 0.9, sm: 1 },
              display: 'inline-block'
            }}
          >
            {activeCategory}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: { xs: 3, md: 4 },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ flex: 3 }}>
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: { xs: 1.5, sm: 2 },
                  mb: 3,
                  borderRadius: 3,
                  boxShadow: 3,
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 2, sm: 0 }
                }}
              >
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: { xs: 2, sm: 3 },
                  width: { xs: '100%', sm: 'auto' },
                  flexDirection: { xs: 'row' }
                }}>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: { xs: 80, sm: 100 },
                      height: { xs: 70, sm: 80 },
                      borderRadius: 2,
                      objectFit: "cover",
                    }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700} fontSize={{ xs: '0.95rem', sm: '1rem' }}>
                      {item.name}
                    </Typography>
                    <Typography fontSize={{ xs: 12, sm: 14 }} color="#666">
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
                    px: { xs: 2, sm: 3 },
                    py: { xs: 0.5, sm: 1 },
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '0.875rem' },
                    width: { xs: '100%', sm: 'auto' }
                  }}
                >
                  {isAdded(item) ? "✓ Added" : "+ Add"}
                </Button>
              </Card>
            ))}
          </Box>
          
          {/* Desktop My Custom Menu Card - Hidden on mobile */}
          <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }}>
            <Card
              sx={{
                p: { xs: 2, sm: 3 },
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
                  fontSize: { xs: 16, sm: 18 },
                }}
              >
                My Custom Menu
              </Typography>

                
              <Box
                sx={{
                  maxHeight: { xs: 250, sm: 300 },
                  overflowY: "auto",
                  pr: 1,
                  mb: 2,
                }}
              >
                {selectedItems.length === 0 && (
                  <Typography fontSize={{ xs: 13, sm: 14 }} color="#777" mb={2}>
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
                      <Typography fontSize={{ xs: 13, sm: 14 }}>
                        {item.name}
                      </Typography>
                    </Box>

                    <DeleteIcon
                      sx={{ cursor: "pointer", fontSize: { xs: 16, sm: 18 } }}
                      onClick={() => handleRemove(item)}
                    />
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography fontSize={{ xs: 13, sm: 14 }} mb={2}>
                Total Items: {selectedItems.length}
              </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 1, sm: 2 },
                    flexDirection: { xs: 'column', sm: 'row' }
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
                      fontSize: { xs: '0.875rem', sm: '0.875rem' },
                      py: { xs: 1, sm: 0.5 },
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
                      fontSize: { xs: '0.875rem', sm: '0.875rem' },
                      py: { xs: 1, sm: 0.5 },
                    }}
                  >
                    Copy Menu
                  </Button>
                </Box>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Floating Action Button for Mobile - Only visible on mobile */}
      <Fab
        variant="extended"
        onClick={() => setMobileMenuOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          display: { xs: 'flex', md: 'none' },
          background: 'linear-gradient(45deg,#ff4b2b,#c60000)',
          color: '#fff',
          fontWeight: 600,
          borderRadius: '30px',
          px: 3,
          py: 2,
          boxShadow: 6,
          '&:hover': {
            background: 'linear-gradient(45deg,#c60000,#ff4b2b)',
          },
          zIndex: 1000,
        }}
      >
        
        <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>
          cart {selectedItems.length > 0 && `(${selectedItems.length})`}
        </Typography>
      </Fab>

      {/* Mobile Menu Drawer - Perfectly centered with proper sizing */}
      <Drawer
        anchor="bottom"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 'auto',
            maxHeight: '80vh',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'none',
          }
        }}
      >
        {mobileMenuDrawer}
      </Drawer>

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
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Menu copied 
        </Alert>
      </Snackbar>
    </>
  );
};

export default PrepareYourMenu;