/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Breadcrumbs,
  Link,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { prepareMenuData } from "../../components/data/prepareMenuData";

const PrepareYourMenu = () => {
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(
    prepareMenuData[0]?.category
  );

  const currentCategory = prepareMenuData.find(
    (cat) => cat.category === activeCategory
  );

  const allItems = [
    ...(currentCategory?.veg || []).map((item) => ({
      ...item,
      type: "veg",
    })),
    ...(currentCategory?.nonVeg || []).map((item) => ({
      ...item,
      type: "nonVeg",
    })),
  ];

  const handleAdd = (item) => {
    if (!selectedItems.find((i) => i.name === item.name)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemove = (item) => {
    setSelectedItems(selectedItems.filter((i) => i.name !== item.name));
  };

  const isAdded = (item) => {
    return selectedItems.find((i) => i.name === item.name);
  };

  const renderIndicator = (type, size = 16) => {
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
        {isVeg ? (
          <Box
            sx={{
              borderLeft: `${size / 3}px solid transparent`,
              borderRight: `${size / 3}px solid transparent`,
              borderBottom: `${size / 2}px solid #2e7d32`,
            }}
          />
        ) : (
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: `${size / 3}px solid transparent`,
              borderRight: `${size / 3}px solid transparent`,
              borderBottom: `${size / 2}px solid #c62828`,
            }}
          />
        )}
      </Box>
    );
  };

  return (
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

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          mb: 5,
        }}
      >
        {prepareMenuData.map((cat) => (
          <Button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            sx={{
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

      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* LEFT SIDE */}
        <Box sx={{ flex: 3 }}>
          {allItems.map((item) => (
            <Card
              key={item.name}
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
                </Box>
              </Box>

              {/* RIGHT SIDE SECTION */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                {/* Indicator ABOVE button */}
                {renderIndicator(item.type, 18)}

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
              </Box>
            </Card>
          ))}
        </Box>

        {/* RIGHT SIDE CUSTOM MENU */}
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

            {selectedItems.length === 0 && (
              <Typography fontSize={14} color="#777" mb={2}>
                No items added yet.
              </Typography>
            )}

            {selectedItems.map((item) => (
              <Box
                key={item.name}
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

            <Divider sx={{ my: 2 }} />

            <Typography fontSize={14} mb={2}>
              Total Items: {selectedItems.length}
            </Typography>

            <Button
              fullWidth
              disabled={selectedItems.length === 0}
              sx={{
                background: "linear-gradient(45deg,#ff4b2b,#c60000)",
                color: "#fff",
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Copy Menu
            </Button>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default PrepareYourMenu;