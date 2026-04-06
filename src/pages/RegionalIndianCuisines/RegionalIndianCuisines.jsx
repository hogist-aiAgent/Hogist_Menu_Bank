// RegionalIndianCuisines.js
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Box,
  Snackbar,
  Alert,
  Drawer,
  Fab,
  Card,
  Typography,
  Divider,
  Button
} from "@mui/material";
import Zoom from "@mui/material/Zoom";
import { useMenuStore } from "../../components/store/useMenuStore";
import { prepareMenuData } from "../../components/data/prepareMenuData";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import Menu from "./Menu";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useLocation } from "react-router-dom";

const RegionalIndianCuisines = () => {
  const location = useLocation();
  const categoryScrollRef = useRef(null);
  const topRef = useRef(null);

  // Get selected region and sub-option from navigation state
  const { selectedRegion, selectedSubOption } = location.state || {};

  const [activeCategory, setActiveCategory] = useState(
    prepareMenuData[0]?.category || "Breakfast"
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [filterType, setFilterType] = useState("both");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedItemForDialog, setSelectedItemForDialog] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({});

  const selectedItems = useMenuStore((state) => state.selectedItems);
  const addItem = useMenuStore((state) => state.addItem);
  const removeItem = useMenuStore((state) => state.removeItem);
  const clearAll = useMenuStore((state) => state.clearAll);

  // Filter menu data based on selected region and sub-option
  const filteredMenuData = useMemo(() => {
    if (!selectedRegion || !selectedSubOption) {
      return prepareMenuData;
    }

    // Parse the selected sub-option to determine meal type
    // Example: "South Indian - Breakfast" -> mealType = "Breakfast"
    const mealType = selectedSubOption.split(" - ")[1];
    
    // Filter categories based on meal type
    return prepareMenuData.filter(cat => {
      if (mealType === "Breakfast") {
        return cat.category === "Breakfast" || cat.category === "Welcome Drink";
      } else if (mealType === "Lunch") {
        return cat.category !== "Breakfast" && cat.category !== "Dessert";
      } else if (mealType === "Dinner") {
        return cat.category !== "Breakfast";
      }
      return true;
    });
  }, [selectedRegion, selectedSubOption]);

  // Set initial active category
  useEffect(() => {
    if (filteredMenuData.length > 0) {
      setActiveCategory(filteredMenuData[0]?.category || "Breakfast");
    }
  }, [filteredMenuData]);

  const currentCategory = filteredMenuData.find(
    (cat) => cat.category === activeCategory
  );

  const allItems = useMemo(() => {
    if (!currentCategory) return [];

    const mapItems = (items = [], type) =>
      items.map((item, index) => ({
        ...item,
        type,
        id: `${activeCategory}-${type}-${item.name}-${index}`,
        items: item.items || [],
      }));

    return [
      ...mapItems(currentCategory.veg, "veg"),
      ...mapItems(currentCategory.nonVeg, "non-veg"),
      ...mapItems(currentCategory.other, "veg & non-veg"),
    ];
  }, [currentCategory, activeCategory]);

  const finalFilteredItems = useMemo(() => {
    if (!filterType || filterType.toLowerCase() === "both") {
      return allItems;
    }

    return allItems.filter(
      (item) =>
        item.type &&
        item.type.toLowerCase() === filterType.toLowerCase()
    );
  }, [allItems, filterType]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    
    const scrollToTop = () => {
      if (topRef.current) {
        topRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
      
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };

    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);
    setTimeout(scrollToTop, 200);
    setTimeout(scrollToTop, 300);
  };

  const handleToggleClick = (type) => {
    setFilterType(type);
    
    const scrollToTop = () => {
      if (topRef.current) {
        topRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
      
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };

    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);
    setTimeout(scrollToTop, 200);
    setTimeout(scrollToTop, 300);
  };

  const handleCopyMenu = () => {
    if (selectedItems.length === 0) return;

    const menuText = selectedItems.map((item) => item.name).join("\n");

    navigator.clipboard.writeText(menuText).then(() => {
      setOpenSnackbar(true);
      setMobileMenuOpen(false);
    });
  };

  const handleCopyDialogMenu = () => {
    if (!selectedItemForDialog) return;
    
    const menuText = selectedItemForDialog.items.join("\n");
    navigator.clipboard.writeText(menuText).then(() => {
      setCopySuccess(true);
    });
  };

  const handleOpenDialog = (item) => {
    setSelectedItemForDialog(item);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedItemForDialog(null);
  };

  const handleImageLoad = (itemId) => {
    setImageLoaded(prev => ({ ...prev, [itemId]: true }));
  };

  const getThemeColor = (type) => {
    switch(type) {
      case "veg": return "#2e7d32";
      case "non-veg": return "#c62828";
      case "veg & non-veg": return "#f9d935";
      default: return "#c60000";
    }
  };

  const renderCardIndicator = (type, size = 16) => {
    if (type === "veg & non-veg") {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <FiberManualRecord sx={{ fontSize: size - 4, color: "#4caf50" }} />
          <FiberManualRecord sx={{ fontSize: size - 4, color: "#f44336" }} />
        </Box>
      );
    }
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

  const renderMenuIndicator = (type, size = 14) => {
    if (type === "veg & non-veg") {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
          <Box
            sx={{
              width: size - 2,
              height: size - 2,
              border: `2px solid #2e7d32`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: `${(size - 2) / 3}px solid transparent`,
                borderRight: `${(size - 2) / 3}px solid transparent`,
                borderBottom: `${(size - 2) / 2}px solid #2e7d32`,
              }}
            />
          </Box>
          <Box
            sx={{
              width: size - 2,
              height: size - 2,
              border: `2px solid #c62828`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: `${(size - 2) / 3}px solid transparent`,
                borderRight: `${(size - 2) / 3}px solid transparent`,
                borderBottom: `${(size - 2) / 2}px solid #c62828`,
              }}
            />
          </Box>
        </Box>
      );
    }
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
                {renderMenuIndicator(item.type, 16)}
                <Typography fontSize={{ xs: 14, sm: 15 }} noWrap>
                  {item.name}
                </Typography>
              </Box>

              <DeleteIcon
                sx={{ cursor: "pointer", fontSize: { xs: 18, sm: 20 }, flexShrink: 0 }}
                onClick={() => removeItem(item)}
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
              clearAll();
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
      <Menu
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryClick}
        filterType={filterType}
        setFilterType={handleToggleClick}
        filteredItems={finalFilteredItems}
        selectedItems={selectedItems}
        addItem={addItem}
        removeItem={removeItem}
        clearAll={clearAll}
        topRef={topRef}
        open={open}
        setOpen={setOpen}
        selectedItemForDialog={selectedItemForDialog}
        setSelectedItemForDialog={setSelectedItemForDialog}
        copySuccess={copySuccess}
        setCopySuccess={setCopySuccess}
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handleOpenDialog={handleOpenDialog}
        handleCloseDialog={handleCloseDialog}
        handleCopyDialogMenu={handleCopyDialogMenu}
        handleCopyMenu={handleCopyMenu}
        getThemeColor={getThemeColor}
        renderIndicator={renderCardIndicator}
        mobileMenuDrawer={mobileMenuDrawer}
        Zoom={Zoom}
        selectedRegion={selectedRegion}
        selectedSubOption={selectedSubOption}
      />

      <Fab
        variant="extended"
        onClick={() => setMobileMenuOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
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
        <ShoppingCartIcon
          sx={{
            fontSize: { xs: 20, sm: 20 },
          }}
        />
        <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>
          Cart {selectedItems.length > 0 && `(${selectedItems.length})`}
        </Typography>
      </Fab>

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

export default RegionalIndianCuisines;