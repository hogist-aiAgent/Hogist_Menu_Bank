// CustomerCard.jsx
import { Avatar, Card, CardContent, Rating, Typography } from "@mui/material";
import theme from "../../theme/theme";

const testimonials = [
  {
    id: 1,
    name: "Brinda Ghanesh",
    feedback:
      "Professional team, great taste, timely delivery. Hogist made our anniversary dinner memorable. Highly recommended.",
    rating: 5,
  },
  {
    id: 2,
    name: "Venkat Krisshna",
    feedback:
      "Excellent service, tasty food; they customized Jain menu perfectly, delivered on time, and earned repeat order again.",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Janose Berdeen I",
    feedback:
      "Best caterer in Chennai!. Sensational food and homestyle catering, perfect choice for weddings, parties, events.",
    rating: 5,
  },
  {
    id: 4,
    name: "Syed Irfan",
    feedback:
      "Professional service, fair pricing, excellent food, and timely delivery, best choice for small party catering in Chennai.",
    rating: 5,
  },
];

const CustomerCard = ({ index = 0 }) => {
  const testimonial = testimonials[index % testimonials.length];

  return (
    <Card
      sx={{
        width: { xs: "90%", md: "100%" },
        height: 173,
        borderRadius: "16px",
        mt: 2,
        mb: 6,
        ml: { xs: 0.5 },
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#fff",
        color: "#000",
        transition: "transform 0.3s ease",
        zIndex: 1,
        boxShadow: "0px 1px 8px #29282871",

        /* CURVED RADIAL FILL (Swigo-like) */
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at bottom right, #000 0%, #000 45%, transparent 60%)",
          transform: "scale(0)",
          transformOrigin: "bottom right",
          transition: "transform 0.6s ease",
          zIndex: -1,
        },

        "&:hover::before": {
          transform: "scale(2.5)",
        },

        "&:hover": {
          transform: "translateY(-4px)",
          color: "#f3e6e6",
        },
      }}
    >
      <CardContent
        sx={{ display: "flex", alignItems: "center", gap: 2, pb: 1 }}
      >
        <Avatar
          sx={{
            width: 25,
            height: 25,
            bgcolor: "#ff2e2e",
            color: "#fff",
            fontSize: { xs: 14 },
          }}
        >
          {testimonial.name.charAt(0)}
        </Avatar>
        <Typography
          component="p"
          fontWeight={600}
          sx={{ fontSize: { xs: "12px", md: "16px" } }}
        >
          {testimonial.name}
        </Typography>
      </CardContent>

      <CardContent
        component="p"
        sx={{
          pt: 0,
          fontSize: { xs: "10px", md: "11px" },
          lineHeight: 1.5,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        {testimonial.feedback}
      </CardContent>

      <CardContent sx={{ pt: 0 }}>
        <Rating value={testimonial.rating} precision={0.5} readOnly />
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
