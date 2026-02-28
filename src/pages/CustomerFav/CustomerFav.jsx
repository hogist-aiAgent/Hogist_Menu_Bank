import { Box, Typography, Stack, Paper, alpha, Container, Breadcrumbs, Link } from "@mui/material";
import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { menuData } from "../../components/data/MenuData";
import MenuCard from "./MenuCard";
import CategoryBar from "../../components/common/Category/CategoryBar";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import SetMealIcon from '@mui/icons-material/SetMeal';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const CustomerFav = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeCategory, setActiveCategory] = useState("Breakfast");
  const [foodType, setFoodType] = useState("BOTH");
  const paperRef = useRef(null);
  const [hasEmptyCards, setHasEmptyCards] = useState(false);
  const [paperPosition, setPaperPosition] = useState({ top: 0, bottom: 0 });

  const categories = [
    { label: "Breakfast", icon: <ListAltIcon />, key: "Breakfast" },
    { label: "Lunch", icon: <LunchDiningIcon />, key: "Lunch" },
    { label: "Dinner", icon: <LocalPizzaIcon />, key: "Dinner" },
    { label: "Lunch &", subLabel: "Dinner", icon: <RestaurantIcon />, key: "Lunch/Dinner" },
    { label: "Breakfast &", subLabel: "Dinner", icon: <SetMealIcon />, key: "Breakfast/Dinner" },
  ];

  const filteredMenus = useMemo(() => {
    return menuData.filter((menu) => {
      const categoryMatch = activeCategory === "ALL" || menu.category === activeCategory;
      const foodMatch = foodType === "BOTH" || menu.foodType === foodType;
      return categoryMatch && foodMatch;
    });
  }, [activeCategory, foodType]);

  // Check if any cards are empty after filtering
  useEffect(() => {
    const emptyExists = filteredMenus.some(menu => !menu.items || menu.items.length === 0);
    setHasEmptyCards(emptyExists);
  }, [filteredMenus]);

  // Calculate paper position for scroll limiting on mobile
  useEffect(() => {
    if (isMobile && paperRef.current) {
      const rect = paperRef.current.getBoundingClientRect();
      setPaperPosition({
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY
      });
    }
  }, [isMobile, filteredMenus]);

  // Handle scroll limiting for empty cards on mobile
  useEffect(() => {
    if (!isMobile || !hasEmptyCards || !paperRef.current) return;

    const handleScroll = () => {
      const paperRect = paperRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // If paper bottom is visible (empty card end is visible)
      if (paperRect.bottom <= viewportHeight) {
        // Allow normal scrolling
        return;
      }
      
      // Limit scroll to only until paper bottom is visible
      const maxScroll = paperRect.bottom - viewportHeight + window.scrollY;
      if (window.scrollY > maxScroll) {
        window.scrollTo({
          top: maxScroll,
          behavior: 'auto'
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    
    // Initial check
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, hasEmptyCards]);

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleCustomerFavClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ backgroundColor: "#f5f4f4", minHeight: "100vh", pb: 6 }}>
      <Container maxWidth="xl" sx={{ pt: 6, pb: 2 }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 1.3, mt: -3.5 }}
        >
          <Link
            underline="none"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              color: 'text.primary',
              '&:hover': { color: '#c60800' }
            }}
            onClick={handleHomeClick}
          >
            <HomeIcon sx={{ mr: 0.4, fontSize: 18 }} />
            Home
          </Link>
          <Link
            underline="none"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              color: '#c60800',
              fontWeight: 600,
              '&:hover': { color: '#c60800' }
            }}
            onClick={handleCustomerFavClick}
          >
            <FavoriteIcon sx={{ mr: 0.5, fontSize: 16 }} />
            Customer Favorites
          </Link>
        </Breadcrumbs>

        <Stack 
          direction={{ xs: 'column', lg: 'row' }} 
          justifyContent="space-between" 
          alignItems={{ xs: 'flex-start', lg: 'center' }} 
          spacing={4}
        >
          <Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 900, 
                color: "#1A1C1E",
                letterSpacing: "-1.5px",
                fontSize: { xs: '2.5rem', md: '2.7rem' },
                lineHeight: 1
              }}
            >
              Customer <Box component="span" sx={{ color: "#c60800" }}>Favorites</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mt: 2, maxWidth: 480, fontSize:{ xs:'0.8rem', md:'0.8rem'}, lineHeight: 1.6 }}>
              The dishes our community is currently obsessed with. 
              Highly rated, expertly prepared, and always fresh.
            </Typography>
          </Box>

          <Stack 
            direction="row" 
            spacing={4.5} 
            sx={{ 
              alignItems: 'center',
              '& > :not(:last-child)': {
                borderRight: { sm: `1px solid ${alpha('#000', 0.1)}` },
                pr: { sm: 2 },
              },
              '& > *': {
                mt: { xs: -2, sm: 0 },
              }
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 900, color: '#1A1C1E', fontSize: { xs: '1.3rem', md: '1.6rem' } }}>
                4.7/5<Box component="span" sx={{ fontSize:{ xs: '1.3rem', md: '1.6rem'}, color: '#FFB400', ml: 0.5 }}>★</Box>
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', fontSize: { xs: '0.6rem', md: '0.8rem' } }}>
                GOOGLE RATING
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 900, color: '#1A1C1E',fontSize: { xs: '1.3rem', md: '1.6rem'} }}>
                7+
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block',fontSize: { xs: '0.6rem', md: '0.8rem' } }}>
                YEARS OF EXPERIENCE
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 900, color: '#1A1C1E',fontSize: { xs: '1.3rem', md: '1.6rem' } }}>
                200+
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block',fontSize: { xs: '0.6rem', md: '0.8rem' } }}>
                COMPANIES SERVED
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Container>

      {/* Sticky Category Bar for Mobile */}
      <Box
        sx={{
          position: { xs: "sticky", md: "static" },
          top: { xs: 0, md: "auto" },
          zIndex: 1100,
          backgroundColor: "#f5f4f4",
          pt: 2,
          px: { xs: 1, sm: 2 }
        }}
      >
        <CategoryBar 
          setFoodType={setFoodType} 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
      </Box>

      <Container maxWidth="xl" sx={{ p: { xs: "0px 8px" } }}>
        <Paper
          ref={paperRef}
          elevation={0}
          sx={{
            mt: 4,
            p: { xs: 2, md: 4 },
            borderRadius: "24px", 
            backgroundColor: "#fafafa",
            border: "1px solid",
            borderColor: alpha("#000", 0.06),
            boxShadow: "0px 4px 20px rgba(0,0,0,0.02)", 
          }}
        >
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="flex-end" 
            sx={{ mb: 1, px: 0.5 }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#1A1C1E", fontSize: { xs: '1.1rem', md: '1.8rem' } }}>
                {activeCategory} {activeCategory === "All" ? "Collection" : "Selection"}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                {filteredMenus.length} items curated for you
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, md: 3 },
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }
            }}
          >
            {filteredMenus.length > 0 ? (
              filteredMenus.map((menu) => (
                <Box 
                  key={menu.id} 
                  sx={{ 
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': { transform: 'translateY(-4px)' },
                    // Fixed height for cards when items are empty on mobile
                    ...(isMobile && (!menu.items || menu.items.length === 0) && {
                      height: {xs:'200px',md:'380px'},
                      overflow: 'hidden'
                    })
                  }}
                >
                  <MenuCard 
                    title={menu.title} 
                    items={menu.items} 
                    foodType={menu.foodType} 
                    image={menu.image} 
                  />
                </Box>
              ))
            ) : (
              <Stack 
                alignItems="center" 
                justifyContent="center" 
                sx={{ gridColumn: "1 / -1", py: 1 }}
              >
                <Typography variant="h6" color="text.secondary" fontWeight={700} sx={{fontSize: { xs: '1rem', md: '1.3rem' }}}>
                  No items found
                </Typography>
                <Typography variant="body2" color="text.disabled" sx={{ mt: 0, fontSize: { xs: '0.6rem', md: '0.9rem' }, textAlign: 'center',}}>
                  Try adjusting your diet filters or checking another category.
                </Typography>
              </Stack>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};