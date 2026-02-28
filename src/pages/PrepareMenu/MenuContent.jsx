import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Divider,
  Snackbar,
  Alert,
  IconButton,
  Dialog,
  DialogContent,
  Stack,
  CircularProgress,
  Breadcrumbs,
  Link,
  Container,
  Paper,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CategoryBar from "../../components/common/Category/CategoryBar";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import SetMealIcon from '@mui/icons-material/SetMeal';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SummarizeIcon from '@mui/icons-material/Summarize';

import welcomeDrink from '../../assets/icons/prepareMenuIcons/drink.png'
import Salad from '../../assets/icons/prepareMenuIcons/salad.png'
import Soup from '../../assets/icons/prepareMenuIcons/soup.png'
import Starter from '../../assets/icons/prepareMenuIcons/starter.png'
import Bread  from '../../assets/icons/prepareMenuIcons/bread.png'
import RiceNoodles from '../../assets/icons/prepareMenuIcons/food.png'
import Gravy from '../../assets/icons/prepareMenuIcons/gravy.png'
import MainCourse from '../../assets/icons/prepareMenuIcons/mainCourse.png'
import VarietyRice from '../../assets/icons/prepareMenuIcons/varietyrice.png'
import Dessert from '../../assets/icons/prepareMenuIcons/dessert.png'
import SeaFood from '../../assets/icons/prepareMenuIcons/seaFood.png'
import Tandoori from '../../assets/icons/prepareMenuIcons/tantoori.png'
import Chaat from '../../assets/icons/prepareMenuIcons/chaat.png'
import Snacks from '../../assets/icons/prepareMenuIcons/snacks.png'
import SideDish from '../../assets/icons/prepareMenuIcons/sideDish.png'

// Create a wrapper component that handles the active state
const CategoryIcon = ({ src, isActive, children }) => {
  return (
    <Box
      component="img"
      src={src}
      alt="category icon"
      sx={{
        width: 24,
        height: 24,
        objectFit: 'contain',
        filter: isActive ? 'brightness(0) invert(1)' : 'none',
        transition: 'filter 0.2s ease'
      }}
    />
  );
};

const MenuContent = (props) => {
  const navigate = useNavigate();
  const {
    activeCategory,
    setActiveCategory,
    filterType,
    setFilterType,
    filteredItems,
    selectedItems,
    addItem,
    removeItem,
    clearAll,
    topRef,
    open,
    selectedItemForDialog,
    copySuccess,
    setCopySuccess,
    imageLoaded,
    setImageLoaded,
    handleOpenDialog,
    handleCloseDialog,
    handleCopyDialogMenu,
    getThemeColor,
    renderIndicator,
    Zoom,
    mobileMenuDrawer
  } = props;

  // Create a state to track which category is active for icon color
  const [hoveredCategory, setHoveredCategory] = React.useState(null);

  // UPDATED: Using actual images with filter styling based on active state
  const categories = [
    { 
      label: "Welcome Drink", 
      icon: (active) => (
        <CategoryIcon 
          src={welcomeDrink} 
          isActive={activeCategory === "Welcome Drink" || hoveredCategory === "Welcome Drink"} 
        />
      ), 
      key: "Welcome Drink" 
    },
    { 
      label: "Salad", 
      icon: (active) => (
        <CategoryIcon 
          src={Salad} 
          isActive={activeCategory === "Salad" || hoveredCategory === "Salad"} 
        />
      ), 
      key: "Salad" 
    },
    { 
      label: "Soup", 
      icon: (active) => (
        <CategoryIcon 
          src={Soup} 
          isActive={activeCategory === "Soup" || hoveredCategory === "Soup"} 
        />
      ), 
      key: "Soup" 
    },
    { 
      label: "Starter", 
      icon: (active) => (
        <CategoryIcon 
          src={Starter} 
          isActive={activeCategory === "Starter" || hoveredCategory === "Starter"} 
        />
      ), 
      key: "Starter" 
    },
    { 
      label: "Indian Bread", 
      icon: (active) => (
        <CategoryIcon 
          src={Bread}
          isActive={activeCategory === "Indian Bread" || hoveredCategory === "Indian Bread"} 
        />
      ), 
      key: "Indian Bread" 
    },
    { 
      label: "Rice & Noodles", 
      icon: (active) => (
        <CategoryIcon 
          src={RiceNoodles}
          isActive={activeCategory === "Rice & Noodles" || hoveredCategory === "Rice & Noodles"} 
        />
      ), 
      key: "Rice & Noodles" 
    },
    { 
      label: "Gravy", 
      icon: (active) => (
        <CategoryIcon 
          src={Gravy}
          isActive={activeCategory === "Gravy" || hoveredCategory === "Gravy"} 
        />
      ), 
      key: "Gravy" 
    },
    { 
      label: "Side Dishes", 
      icon: (active) => (
        <CategoryIcon 
          src={SideDish}
          isActive={activeCategory === "Side Dishes" || hoveredCategory === "Side Dishes"} 
        />
      ), 
      key: "Side Dishes" 
    },
    { 
      label: "Main Course", 
      icon: (active) => (
        <CategoryIcon 
          src={MainCourse}
          isActive={activeCategory === "Main Course" || hoveredCategory === "Main Course"} 
        />
      ), 
      key: "Main Course" 
    },
    { 
      label: "Variety Rice", 
      icon: (active) => (
        <CategoryIcon 
          src={VarietyRice}
          isActive={activeCategory === "Variety Rice" || hoveredCategory === "Variety Rice"} 
        />
      ), 
      key: "Variety Rice" 
    },
    { 
      label: "Dessert", 
      icon: (active) => (
        <CategoryIcon 
          src={Dessert} 
          isActive={activeCategory === "Dessert" || hoveredCategory === "Dessert"} 
        />
      ), 
      key: "Dessert" 
    },
    { 
      label: "Sea Food", 
      icon: (active) => (
        <CategoryIcon 
          src={SeaFood}
          isActive={activeCategory === "Sea Food" || hoveredCategory === "Sea Food"} 
        />
      ), 
      key: "Sea Food" 
    },
    { 
      label: "Tandoori", 
      icon: (active) => (
        <CategoryIcon 
          src={Tandoori} 
          isActive={activeCategory === "Tandoori" || hoveredCategory === "Tandoori"} 
        />
      ), 
      key: "Tandoori" 
    },
    { 
      label: "Chaat", 
      icon: (active) => (
        <CategoryIcon 
          src={Chaat} 
          isActive={activeCategory === "Chaat" || hoveredCategory === "Chaat"} 
        />
      ), 
      key: "Chaat" 
    },
    { 
      label: "Snacks", 
      icon: (active) => (
        <CategoryIcon 
          src={Snacks}
          isActive={activeCategory === "Snacks" || hoveredCategory === "Snacks"} 
        />
      ), 
      key: "Snacks" 
    },
  ];

  const defaultImage = "https://via.placeholder.com/300x200?text=No+Image";

  const isAdded = (item) => {
    return selectedItems.some((i) => i.id === item.id);
  };

  const handleImageLoad = (itemId) => {
    setImageLoaded(prev => ({ ...prev, [itemId]: true }));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handlePrepareMenuClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Custom handler for category click to update active state
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <>
      <Box sx={{ px: { xs: 1, md: 4 }, py: { xs: 1, md: 5 }, backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 2,mt:{ xs: 1, md: -3 } }}
        >
          <Link
            underline="none"
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'text.primary', '&:hover': { color: '#c60800' } }}
            onClick={handleHomeClick}
          >
            <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
            Home
          </Link>
          <Link
            underline="none"
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#c60800', fontWeight: 600 }}
            onClick={handlePrepareMenuClick}
          >
            <SummarizeIcon sx={{ mr: 0.5, fontSize: 16 }} />
            Prepare Your Menu
          </Link>
        </Breadcrumbs>

        <Box sx={{ mb: 1, mx: { xs: -2, md: -4 }, px: { xs: 2, md: 4 } }}>
          <Box 
            sx={{ mb: 2 }}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <CategoryBar 
              setFoodType={setFilterType} 
              categories={categories.map(cat => ({
                ...cat,
                icon: cat.icon(activeCategory === cat.key)
              }))} 
              activeCategory={activeCategory} 
              setActiveCategory={handleCategoryClick} 
              animationDuration="0.15s" 
              onHoverCategory={setHoveredCategory}
            />
          </Box>
        </Box>

        {/* Rest of your component remains exactly the same */}
        <Box sx={{ display: "flex", gap: { xs: 3, md: 4 }, flexDirection: { xs: "column", md: "row" } }}>
          {/* Main content area with scrollable cards */}
          <Box sx={{ flex: 3, height: 'calc(100vh - 250px)', overflowY: 'auto', pr: 1 }} ref={topRef}>
            <Container maxWidth="xl" sx={{ p: { xs: "0px 8px" }, width:{xs: "100%"} , }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, md: 4 },
                  borderRadius: "24px",
                  backgroundColor: "#fafafa",
                  border: "1px solid",
                  borderColor: alpha("#000", 0.06),
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.02)",
                }}
              >
                {/* Cards container */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  
                  {filteredItems.length === 0 ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ width: "100%", py: 3 }}
            >
              <Typography variant="h6" color="text.secondary" fontWeight={700}>
                No items found
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Try adjusting your diet filters or selecting another category.
              </Typography>
            </Stack>
          ) : (
            filteredItems.map((item) => {
              const themeColor = getThemeColor(item.type);
              const hasItems = item.items && item.items.length > 0;

              return (
                <Box
                  key={item.id}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "calc(50% - 8px)",
                      md: "calc(33.333% - 10.67px)",
                    },
                  }}
                >
                          <Card
                          sx={{
                            width: "100%",
                            height: 300,
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
                              {!imageLoaded[item.id] && (
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
                                src={item.image || defaultImage}
                                alt={item.name}
                                loading="lazy"
                                onLoad={() => handleImageLoad(item.id)}
                                sx={{
                                  width: "100%",
                                  height: 174,
                                  objectFit: "cover",
                                  filter: imageLoaded[item.id] ? "blur(0px)" : "blur(12px)",
                                  transition: "filter 0.4s ease, opacity 0.4s ease",
                                  opacity: imageLoaded[item.id] ? 1 : 0.7,
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
                                {item.type?.toUpperCase()}
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
                              {item.name}
                            </Typography>

                            {hasItems && (
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
                                {item.items.join(" • ")}
                              </Typography>
                            )}

                            <Box sx={{ flexGrow: 0 }} />

                            {hasItems ? (
                              <Button
                                onClick={() => handleOpenDialog(item)}
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
                            ) : (
                              <Button
                                onClick={() =>
                                  isAdded(item)
                                    ? removeItem(item)
                                    : addItem(item)
                                }
                                fullWidth
                                sx={{
                                  mt: { xs: 1.5, md: 0 },
                                  backgroundColor: isAdded(item) ? "#2e7d32" : "#c60000",
                                  color: "#fff",
                                  borderRadius: "8px",
                                  py: 0.5,
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  letterSpacing: 1,
                                  "&:hover": {
                                    backgroundColor: isAdded(item) ? "#1b5e20" : "#b30000"
                                  }
                                }}
                              >
                                {isAdded(item) ? "✓ Added" : "+ Add to Menu"}
                              </Button>
                            )}
                          </Box>
                        </Card>
                     </Box>
                      );
                    })
                  )}
                </Box>
              </Paper>
            </Container>
          </Box>

          {/* Desktop My Custom Menu Card */}
          <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }}>
            <Card
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 4,
                boxShadow: 4,
                height: 350,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <MenuBookIcon sx={{ color: "#c60000", fontSize: 24 }} />
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#c60000",
                    fontSize: { xs: 16, sm: 18 },
                  }}
                >
                  My Custom Menu
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  pr: 1,
                  mb: 4,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {selectedItems.length === 0 ? (
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '100%'
                  }}>
                    <Typography fontSize={{ xs: 13, sm: 14 }} color="#777">
                      No items were selected.
                    </Typography>
                  </Box>
                ) : (
                  selectedItems.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1.5,
                        p: 1,
                        borderRadius: 2,
                        backgroundColor: "#fafafa",
                        "&:hover": {
                          backgroundColor: "#f5f5f5"
                        }
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
                        <Box
                          component="img"
                          src={item.image || defaultImage}
                          alt={item.name}
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            objectFit: "cover",
                            border: "1px solid #eee"
                          }}
                        />
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          {renderIndicator(item.type, 14)}
                          <Typography fontSize={{ xs: 13, sm: 14 }} sx={{ fontWeight: 500 }}>
                            {item.name}
                          </Typography>
                        </Box>
                      </Box>

                      <DeleteIcon
                        sx={{ 
                          cursor: "pointer", 
                          fontSize: { xs: 16, sm: 18 },
                          color: "#c60000",
                          "&:hover": {
                            color: "#b30000"
                          }
                        }}
                        onClick={() => removeItem(item)}
                      />
                    </Box>
                  ))
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography fontSize={{ xs: 13, sm: 14 }} mb={2} sx={{ fontWeight: 600 }}>
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
                  onClick={clearAll}
                  startIcon={<ClearAllIcon />}
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
                  onClick={props.handleCopyMenu}
                  startIcon={<FileCopyIcon />}
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

      {/* Dialog for Full Menu View */}
      {selectedItemForDialog && (
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          TransitionComponent={Zoom}
          PaperProps={{
            sx: {
              borderRadius: "24px",
              width: "360px",
              height: "500px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderTop: `6px solid ${getThemeColor(selectedItemForDialog.type)}`,
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
              mt: { xs: 6, sm: 0 }
            }}
          >
            <Alert
              onClose={() => setCopySuccess(false)}
              severity="success"
              sx={{ width: { xs: "70%", md: "90%" } }}
            >
              Menu copied successfully!
            </Alert>
          </Snackbar>

          <Box sx={{ position: "absolute", right: 18, top: 10, zIndex: 10 }}>
            <IconButton
              onClick={handleCloseDialog}
              sx={{
                width: 25,
                height: 25,
                borderRadius: "50%",
                backgroundColor: "#fff",
                border: `1px solid ${getThemeColor(selectedItemForDialog.type)}30`,
                boxShadow: `0 4px 12px ${getThemeColor(selectedItemForDialog.type)}25`,
                transition: "all 0.25s ease",
                "&:hover": {
                  backgroundColor: getThemeColor(selectedItemForDialog.type),
                  transform: "rotate(90deg)",
                  boxShadow: `0 6px 18px ${getThemeColor(selectedItemForDialog.type)}40`,
                  "& .MuiSvgIcon-root": {
                    color: "#fff"
                  }
                }
              }}
            >
              <CloseIcon sx={{ fontSize: 18, color: getThemeColor(selectedItemForDialog.type), transition: "0.25s" }} />
            </IconButton>
          </Box>

          <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", flex: 1 }}>
            <Box
              sx={{
                background: `linear-gradient(135deg, ${getThemeColor(selectedItemForDialog.type)}15, ${getThemeColor(selectedItemForDialog.type)}05)`,
                px: 3,
                py: 3,
                textAlign: "center",
                borderBottom: `1px solid ${getThemeColor(selectedItemForDialog.type)}20`,
                flexShrink: 0
              }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "1.35rem",
                  color: getThemeColor(selectedItemForDialog.type),
                  letterSpacing: 0.5
                }}
              >
                {selectedItemForDialog.name}
              </Typography>

              <Box
                sx={{
                  width: 50,
                  height: 4,
                  bgcolor: getThemeColor(selectedItemForDialog.type),
                  borderRadius: 2,
                  mx: "auto",
                  mt: 1.5
                }}
              />
            </Box>

            <Box sx={{ flex: 1, overflowY: "auto", px: 3, py: 2 }}>
              <Stack spacing={0.2}>
                {(selectedItemForDialog.items || []).map((item, index) => (
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
                        bgcolor: `${getThemeColor(selectedItemForDialog.type)}10`
                      }
                    }}
                  >
                    <FiberManualRecordIcon
                      sx={{
                        fontSize: "9px",
                        color: getThemeColor(selectedItemForDialog.type)
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
                onClick={handleCopyDialogMenu}
                startIcon={<ContentCopyIcon />}
                fullWidth
                variant="contained"
                sx={{
                  background: `linear-gradient(45deg, ${getThemeColor(selectedItemForDialog.type)}, ${getThemeColor(selectedItemForDialog.type)}cc)`,
                  color: "#fff",
                  borderRadius: "12px",
                  py: 1.3,
                  fontWeight: 800,
                  letterSpacing: 1,
                  boxShadow: `0 6px 20px ${getThemeColor(selectedItemForDialog.type)}40`,
                  "&:hover": {
                    opacity: 0.9,
                    background: `linear-gradient(45deg, ${getThemeColor(selectedItemForDialog.type)}, ${getThemeColor(selectedItemForDialog.type)})`,
                  }
                }}
              >
                COPY MENU
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MenuContent;