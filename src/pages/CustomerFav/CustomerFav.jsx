import { Box, Typography, Stack, Paper, alpha, Container } from "@mui/material";
import { useMemo, useState } from "react";
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
export const CustomerFav = () => {
  const [activeCategory, setActiveCategory] = useState("Breakfast");
  const [foodType, setFoodType] = useState("BOTH");

  const categories = [
    { label: "All", icon: <FoodBankIcon />, key: "ALL" },
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

  return (
    <Box sx={{ backgroundColor: "#f5f4f4", minHeight: "100vh", pb: 6 }}>
      <Container maxWidth="xl" sx={{ pt: 6, pb: 4 }}>
  <Stack 
    direction={{ xs: 'column', lg: 'row' }} 
    justifyContent="space-between" 
    alignItems={{ xs: 'flex-start', lg: 'center' }} 
    spacing={4}
  >
    {/* LEFT SIDE: Content */}
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
        <Box 
          sx={{ 
            bgcolor: "#c60800", 
            color: "white",
            px: 1.5, py: 0.5, 
            borderRadius: '50px',
            display: 'flex', alignItems: 'center', gap: 1,
            boxShadow: `0 4px 12px ${alpha("#c60800", 0.3)}`
          }}
        >
          <FavoriteIcon sx={{ fontSize: 14 }} />
          <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1 }}>
            BEST SELLERS
          </Typography>
        </Box>
          
      </Stack>
      
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 900, 
          color: "#1A1C1E",
          letterSpacing: "-1.5px",
          fontSize: { xs: '2.5rem', md: '3.8rem' },
          lineHeight: 1
        }}
      >
        Customer <Box component="span" sx={{ color: "#c60800" }}>Favorites</Box>
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mt: 2, maxWidth: 480, fontSize: '1.15rem', lineHeight: 1.6 }}>
        The dishes our community is currently obsessed with. 
        Highly rated, expertly prepared, and always fresh.
      </Typography>
    </Box>

    {/* RIGHT SIDE: Visual Stats (No Search) */}
    <Stack 
      direction="row" 
      spacing={3} 
      sx={{ 
        alignItems: 'center',
        // Adds a subtle divider between the two stats
        '& > :not(:last-child)': {
          borderRight: { sm: `1px solid ${alpha('#000', 0.1)}` },
          pr: { sm: 3 }
        }
      }}
    >
      {/* Stat 1: Rating */}
      <Box sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#1A1C1E' }}>
          4.7<Box component="span" sx={{ fontSize: '1.2rem', color: '#FFB400', ml: 0.5 }}>★</Box>
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block' }}>
          GOOGLE RATING
        </Typography>
      </Box>

      {/* Stat 2: Popularity */}
      <Box sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#1A1C1E' }}>
          7
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block' }}>
          YEARS OF  EXPERIENCE
        </Typography>
      </Box>

     <Box sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#1A1C1E' }}>
          200+
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block' }}>
          COMPANIES SERVED IN CHENNAI
        </Typography>
      </Box>
    </Stack>
  </Stack>
</Container>
      
      <Box sx={{ pt: 2, px: { xs: 1, sm: 2 } }}>
        <CategoryBar 
          setFoodType={setFoodType} 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
      </Box>

      
      <Container maxWidth="xl">
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: { xs: 2, md: 4 },
            borderRadius: "24px", // Matches the soft look of the CategoryBar
            backgroundColor: "#fafafa",
            border: "1px solid",
            borderColor: alpha("#000", 0.06),
            boxShadow: "0px 4px 20px rgba(0,0,0,0.02)", // Very subtle lift
          }}
        >
          {/* Internal Header: Context for the user */}
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="flex-end" 
            sx={{ mb: 4, px: 0.5 }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#1A1C1E" }}>
                {activeCategory} {activeCategory === "All" ? "Collection" : "Selection"}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                {filteredMenus.length} items curated for you
              </Typography>
            </Box>
          </Stack>

          {/* 3. RESPONSIVE GRID LISTING */}
          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, md: 3 },
              // Using Grid for perfect alignment
              gridTemplateColumns: {
                xs: "1fr",               // 1 card
                sm: "repeat(2, 1fr)",    // 2 cards
                md: "repeat(3, 1fr)",    // 3 cards
                lg: "repeat(4, 1fr)",    // 4 cards
              }
            }}
          >
            {filteredMenus.length > 0 ? (
              filteredMenus.map((menu) => (
                <Box 
                  key={menu.id} 
                  sx={{ 
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': { transform: 'translateY(-4px)' } 
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
                sx={{ gridColumn: "1 / -1", py: 10 }}
              >
                <Typography variant="h6" color="text.secondary" fontWeight={700}>
                  No items found
                </Typography>
                <Typography variant="body2" color="text.disabled">
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