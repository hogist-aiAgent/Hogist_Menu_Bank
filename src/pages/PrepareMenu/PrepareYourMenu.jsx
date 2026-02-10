import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Card,
  Checkbox,
  Divider,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import { prepareMenuData } from "../../components/data/prepareMenuData";

/* ✅ VEG / NON-VEG INDICATOR (REFERENCE DESIGN) */
const VegNonVegIndicator = ({ type }) => {
  const isVeg = type?.toUpperCase() === "VEG";

  return (
    <Box
      sx={{
        width: 16,
        height: 16,
        border: `2px solid ${isVeg ? "#0f8a3b" : "#ce0505"}`,
        borderRadius: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        mr: 1,
      }}
    >
      <Box
        sx={{
          width: 0,
          height: 0,
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          borderBottom: `7px solid ${isVeg ? "#0f8a3b" : "#ce0505"}`,
        }}
      />
    </Box>
  );
};

export const PrepareYourMenu = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [openCategory, setOpenCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleToggleItem = (event, item) => {
    event.stopPropagation();
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleRemoveItem = (item) => {
    setSelectedItems((prev) => prev.filter((i) => i !== item));
  };

  const getItemType = (item) => {
    for (const cat of prepareMenuData) {
      if (cat.veg?.includes(item)) return "VEG";
      if (cat.nonVeg?.includes(item)) return "NONVEG";
    }
    return "OTHER";
  };

  const handleCopyMenu = async () => {
    if (selectedItems.length === 0) return;

    const formattedMenu = selectedItems
      .map((item, index) => `${index + 1}. ${item}`)
      .join("\n");

    try {
      await navigator.clipboard.writeText(formattedMenu);
      setOpen(true);
    } catch (err) {
      console.error("Copy failed");
    }
  };

  useEffect(() => {
    if (openCategory && dropdownRef.current) {
      const headerOffset = 100;
      const elementPosition =
        dropdownRef.current.getBoundingClientRect().top +
        window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }, [openCategory]);

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", px: 2, py: 3 }}>
      {/* BREADCRUMBS */}
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

      {/* TITLE */}
      <Typography
       component="p"
        align="center"
        fontWeight={800}
        mb={4}
        sx={{ fontSize: { xs: "24px", md: "36px" }, color: "#c60000" }}
      >
        Prepare your Menu
      </Typography>

      {/* CATEGORY BUTTONS */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          mb: 5,
        }}
      >
        {prepareMenuData.map((cat) => (
          <Button
            key={cat.category}
            onClick={() =>
              setOpenCategory(
                openCategory === cat.category ? null : cat.category
              )
            }
            endIcon={
              openCategory === cat.category ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )
            }
            sx={{
              width: { xs: "45%", sm: 180, md: 200 },
              height: 48,
              background: "linear-gradient(45deg,#ff4b2b,#c60000)",
              color: "#fff",
              borderRadius: "30px",
              fontWeight: 600,
              textTransform: "none",
              fontSize: { xs: "12px", md: "14px" },
              boxShadow: 2,
            }}
          >
            {cat.category}
          </Button>
        ))}
      </Box>

      {/* DROPDOWN CARD */}
      {prepareMenuData.map(
        (cat) =>
          openCategory === cat.category && (
            <Box
              key={cat.category}
              ref={dropdownRef}
              sx={{ display: "flex", justifyContent: "center", mb: 6 }}
            >
              <Card
                sx={{
                  width: { xs: "95%", sm: 380, md: 420 },
                  borderRadius: 5,
                  p: { xs: 2, md: 3 },
                  border: "2px solid black",
                }}
              >
                {/* VEG */}
                {cat.veg.length > 0 && (
                  <>
                    <Box display="flex" alignItems="center" mb={1}>
                      <VegNonVegIndicator type="VEG" />
                      <Typography  component="p" fontWeight={600}>VEG</Typography>
                    </Box>

                    {cat.veg.map((item) => (
                      <Box
                        key={item}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography  component="p" sx={{fontSize:{xs:"12px",md:"14px"}}}>
                          {item}
                        </Typography>
                        <Checkbox
                          checked={selectedItems.includes(item)}
                          onChange={(e) => handleToggleItem(e, item)}
                        />
                      </Box>
                    ))}

                    {cat.nonVeg.length > 0 && <Divider sx={{ my: 2 }} />}
                  </>
                )}

                {/* NON VEG */}
                {cat.nonVeg.length > 0 && (
                  <>
                    <Box display="flex" alignItems="center" mb={1}>
                      <VegNonVegIndicator type="NONVEG" />
                      <Typography  component="p" fontWeight={600}>NON VEG</Typography>
                    </Box>

                    {cat.nonVeg.map((item) => (
                      <Box
                        key={item}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography  component="p" sx={{fontSize:{xs:"12px",md:"14px"}}}>
                          {item}
                        </Typography>
                        <Checkbox
                          checked={selectedItems.includes(item)}
                          onChange={(e) => handleToggleItem(e, item)}
                        />
                      </Box>
                    ))}
                  </>
                )}

                {/* OTHER */}
                {cat.other && cat.other.length > 0 && (
                  <>
                    {(cat.veg.length > 0 || cat.nonVeg.length > 0) && (
                      <Divider sx={{ my: 2 }} />
                    )}

                    <Box display="flex" alignItems="center" mb={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          backgroundColor: "#555",
                          mr: 1,
                        }}
                      />
                      <Typography  component="p" fontWeight={600}>OTHER</Typography>
                    </Box>

                    {cat.other.map((item) => (
                      <Box
                        key={item}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography  component="p" sx={{fontSize:{xs:"12px",md:"14px"}}}>{item}</Typography>
                        <Checkbox
                          checked={selectedItems.includes(item)}
                          onChange={(e) => handleToggleItem(e, item)}
                        />
                      </Box>
                    ))}
                  </>
                )}
              </Card>
            </Box>
          )
      )}

      {/* MY MENU CARD */}
      {selectedItems.length > 0 && (
        <Box
          sx={{
            position: { xs: "relative", md: "fixed" },
            right: { md: 30 },
            bottom: { md: 30 },
            width: { xs: "100%", md: 300 },
            mt: { xs: 3, md: 0 },
          }}
        >
          <Card
            sx={{
              borderRadius: 5,
              p: 3,
              border: "2px solid black",
              backgroundColor: "#eee",
            }}
          >
            <Typography
             component="p"
              fontWeight={700}
              align="center"
              mb={2}
              color="#c60000"
            >
              My Menu
            </Typography>

            {selectedItems.map((item, index) => {
              const type = getItemType(item);

              return (
                <Box
                  key={item}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mb: 1 }}
                >
                  <Box display="flex" alignItems="center">
                    <VegNonVegIndicator type={type} />
                    <Typography  component="p" sx={{ fontSize: "14px" }}>
                      {index + 1}. {item}
                    </Typography>
                  </Box>

                  <DeleteIcon
                    sx={{ cursor: "pointer", fontSize: 18 }}
                    onClick={() => handleRemoveItem(item)}
                  />
                </Box>
              );
            })}

            <Box textAlign="center" mt={3}>
              <Button
                fullWidth
                onClick={handleCopyMenu}
                variant="contained"
                sx={{
                  backgroundColor: "#c60000",
                  color: "white",
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
      )}

      {/* SNACKBAR */}
      <Snackbar
        open={open}
        autoHideDuration={1800}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" icon={false}>
          Menu copied
        </Alert>
      </Snackbar>
    </Box>
  );
};