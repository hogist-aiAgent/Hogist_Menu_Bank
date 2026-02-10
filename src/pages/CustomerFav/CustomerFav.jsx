import { Box, Button, Typography, Stack, Breadcrumbs, Link } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { menuData } from "../../components/data/MenuData";
import MenuCard from "./MenuCard";

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
  "Lunch/Dinner",
  "Breakfast/Dinner",
];

export const CustomerFav = () => {
  const [activeCategory, setActiveCategory] = useState("Breakfast");
  const [foodType, setFoodType] = useState("BOTH");
  const navigate = useNavigate(); // Initialize navigate

  /* -------- FILTER MENU DATA DIRECTLY -------- */
  const filteredMenus = menuData.filter(menu => {
    const categoryMatch = menu.category === activeCategory;
    const foodMatch =
      foodType === "BOTH" || menu.foodType === foodType;

    return categoryMatch && foodMatch;
  });

  return (
    <Box sx={{ backgroundColor: "#f5f4f4", p: 3 }}>
      {/* BREADCRUMBS - Added at top left */}
      <Breadcrumbs 
        aria-label="breadcrumb" 
        sx={{ mb: 2, }}
      >
        <Link
          component="button"
         onClick={() => navigate("/")}
          sx={{
            fontWeight:600,
            textDecoration:"none"
          }}
        >
          Home
        </Link>
        <Typography  sx={{  fontWeight:600 }}>
          {activeCategory}
        </Typography>
      </Breadcrumbs>

      {/* TITLE */}
      <Typography
        component="p"
        align="center"
        color="#c60000"
        
        sx={{fontSize:{xs:"28px",md:"36px"}}}
        fontWeight={700}
        mb={2}
      >
        Customer Favorites
      </Typography>

      {/* CATEGORY BUTTONS */}
      <Stack
      
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        gap={2}
        sx={{
          "& .MuiButton-root": {
            width: { xs: "45%", sm: "auto" },
          },
        }}
      >
        {categories.map(cat => (
          <Button
           component="p"
            key={cat}
            onClick={() => setActiveCategory(cat)}
            variant={activeCategory === cat ? "contained" : "outlined"}
            sx={{
              borderRadius: 5,
              textTransform: "none",
              background:
          activeCategory === cat
            ? "linear-gradient(45deg,#ff4b2b,#a00000)"
            : "transparent",
              color:
                activeCategory === cat ? "white" : "#000",
              borderColor: "#d32f2f",
            }}
          >
            {cat}
          </Button>
        ))}
      </Stack>

      {/* VEG / NON-VEG / BOTH */}
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        mt={3}
      >
        {["VEG", "NON-VEG", "BOTH"].map(type => (
          <Button
           component="p"
            key={type}
            size="small"
            variant={foodType === type ? "contained" : "outlined"}
           sx={{
              background:
                foodType === type
                  ? "linear-gradient(45deg,#ff4b2b,#a00000)"
                  : "transparent",
              color: foodType === type ? "white" : "#000",
              borderColor: "#d32f2f",
            }}

            onClick={() => setFoodType(type)}
          >
            {type}
          </Button>
        ))}
      </Stack>

      {/* MENU CARDS */}
      <Box
        mt={5}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {filteredMenus.length > 0 ? (
          filteredMenus.map(menu => (
            <Box
              key={menu.id}
              sx={{
                width: {
                  xs: "100%",
                  sm: "48%",
                  md: "23%",
                },
              }}
            >
              
              <MenuCard title={menu.title} items={menu.items}  foodType={menu.foodType} />
            </Box>
          ))
        ) : (
          <Typography align="center" color="text.secondary" mt={4}>
            No menu items available
          </Typography>
        )}
      </Box>
    </Box>
  );
};