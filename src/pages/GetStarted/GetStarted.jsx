import { Box, Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import backgroundImage from "../../assets/getStarted/menu-bg.jpeg";
import { useNavigate } from "react-router-dom";

export const GetStarted = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        mb: 5,
        px: isMobile ? 2 : 6,
        py: 8,
        position: "relative",
        overflow: "hidden",
        minHeight: "200px",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 1,
          transition: "opacity 0.6s ease-out",
          zIndex: 0,
          width: "100%",
          height: "900px",
        },

        "& > *": {
          position: "relative",
          zIndex: 1,
        },

        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
      }}
    >
      <Typography
        component="p"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "26px", sm: "30px", md: "40px" },
          mb: 5,
          color: "white",
        }}
      >
        Get Started
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 8,
          width: "100%",
          maxWidth: 1200,
          justifyContent: "center",
        }}
      >
        {/* ================= CARD 1 ================= */}
        <Card
          onClick={() => navigate("/customerfav")}
          sx={{
            flex: 1,
            maxWidth: isMobile ? "100%" : 400,
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            height: { xs: 180, md: 230 },
            minHeight: 190,
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            transition: "transform 0.35s ease, box-shadow 0.35s ease",

            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))",
              opacity: 0,
              transition: "opacity 0.35s ease",
              zIndex: 1,
            },

            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
            },

            "&:hover::after": {
              opacity: 1,
            },

            "&:hover .hover-btn": {
              opacity: 1,
              transform: "translateY(0)",
            },

            "&:hover .card-text": {
              opacity: 0.25,
            },
          }}
        >
          <CardContent
            className="card-text"
            sx={{
              p: 5,
              position: "relative",
              zIndex: 2,
              transition: "opacity 0.3s ease",
            }}
          >
            <Typography
              component="p"
              sx={{
                fontWeight: 600,
                fontSize: isMobile ? "22px" : "28px",
                mb: 2,
                color: "#c60000",
              }}
            >
              Customer Favorites
            </Typography>

            <Typography
              component="p"
              sx={{
                fontWeight: 600,
                color: "#000",
                fontSize: isMobile ? "16px" : "18px",
              }}
            >
              Tried, tested, and loved by customers
            </Typography>
          </CardContent>

          <Box
            className="hover-btn"
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              opacity: 0,
              transform: "translateY(12px)",
              transition: "all 0.35s ease",
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
                backgroundColor: "#fff",
                color: "#c60000",
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                fontFamily:theme.typography.fontFamily
              }}
            >
              Explore
            </Box>
          </Box>
        </Card>

        {/* ================= CARD 2 ================= */}
        <Card
        onClick={() => navigate("/preparemenu")}
          sx={{
            flex: 1,
            maxWidth: isMobile ? "100%" : 400,
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            height: { xs: 180, md: 230 },
            minHeight: 190,
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            transition: "transform 0.35s ease, box-shadow 0.35s ease",

            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))",
              opacity: 0,
              transition: "opacity 0.35s ease",
              zIndex: 1,
            },

            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
            },

            "&:hover::after": {
              opacity: 1,
            },

            "&:hover .hover-btn": {
              opacity: 1,
              transform: "translateY(0)",
            },

            "&:hover .card-text": {
              opacity: 0.25,
            },
          }}
        >
          <CardContent
            className="card-text"
            sx={{
              p: 5,
              position: "relative",
              zIndex: 2,
              transition: "opacity 0.3s ease",
            }}
          >
            <Typography
              component="p"
              sx={{
                fontWeight: 600,
                fontSize: isMobile ? "22px" : "28px",
                mb: 2,
                color: "#c60000",
              }}
            >
              Prepare Your Menu
            </Typography>

            <Typography
              component="p"
              sx={{
                fontWeight: 600,
                color: "#000",
                fontSize: isMobile ? "16px" : "18px",
              }}
            >
              Drag, drop, and enjoy your own creation
            </Typography>
          </CardContent>

          <Box
            className="hover-btn"
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              opacity: 0,
              transform: "translateY(12px)",
              transition: "all 0.35s ease",
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
                backgroundColor: "#fff",
                color: "#c60000",
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                fontFamily:theme.typography
              }}
            >
              Explore
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};