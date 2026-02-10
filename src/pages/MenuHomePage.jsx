import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useRef, useState } from "react";
import CustomerCard from "../components/common/CustomerCard";
import { GetStarted } from "./GetStarted/GetStarted.jsx";
import FryingPanLoader from "../components/common/Preloader/FryingPanLoader.jsx";

const testimonials = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export const MenuHomePage = () => {
  const trackRef = useRef(null);
  const indexRef = useRef(0);
  const intervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // ✅ ADDED (ONLY THIS)
  const [loading, setLoading] = useState(true);

  const CARD_WIDTH = 300;
  const GAP = 24;
  const VISIBLE_CARDS = 3;
  const INNER_PADDING = 8;

  const PAUSE_TIME = 1500;
  const SLIDE_TIME = 1100;

  useEffect(() => {
    const savedPosition = localStorage.getItem("hogistSliderPosition");
    if (savedPosition) {
      indexRef.current = parseInt(savedPosition);

      setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.style.transition = "none";
          trackRef.current.style.transform = `translateX(-${
            indexRef.current * (CARD_WIDTH + GAP)
          }px)`;
        }
      }, 100);
    }

    startSlider();
  }, []);

  // ✅ ADDED (ONLY THIS)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // preloader duration

    return () => clearTimeout(timer);
  }, []);

  const saveCurrentPosition = () => {
    localStorage.setItem(
      "hogistSliderPosition",
      indexRef.current.toString()
    );
  };

  const slideTestimonials = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    stopSlider();

    let exitingCardIndex;
    let exitingCard;

    if (direction === "forward") {
      exitingCardIndex = indexRef.current;
      indexRef.current += 1;

      if (indexRef.current >= testimonials.length) {
        indexRef.current = 0;
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        saveCurrentPosition();
        return;
      }
    } else if (direction === "backward") {
      indexRef.current -= 1;
      exitingCardIndex = indexRef.current + VISIBLE_CARDS;

      if (indexRef.current < 0) {
        indexRef.current = testimonials.length - 1;
        track.style.transition = "none";
        track.style.transform = `translateX(-${
          indexRef.current * (CARD_WIDTH + GAP)
        }px)`;
        saveCurrentPosition();
        return;
      }
    }

    exitingCard = track.children[exitingCardIndex];

    if (exitingCard) {
      exitingCard.style.transition = "opacity 600ms ease";
      exitingCard.style.opacity = "0";
    }

    track.style.transition = `transform ${SLIDE_TIME}ms cubic-bezier(0.4,0,0.2,1)`;
    track.style.transform = `translateX(-${
      indexRef.current * (CARD_WIDTH + GAP)
    }px)`;

    setTimeout(() => {
      if (exitingCard) {
        exitingCard.style.transition = "none";
        exitingCard.style.opacity = "1";
      }
      saveCurrentPosition();
    }, SLIDE_TIME);
  };

  const startSlider = () => {
  stopSlider(); // ✅ Always clear previous interval first

  intervalRef.current = setInterval(() => {
    const track = trackRef.current;
    if (!track) return;

    const exitingCard = track.children[indexRef.current];

    if (exitingCard) {
      exitingCard.style.transition = "opacity 600ms ease";
      exitingCard.style.opacity = "0";
    }

    indexRef.current += 1;

    track.style.transition = `transform ${SLIDE_TIME}ms cubic-bezier(0.4,0,0.2,1)`;
    track.style.transform = `translateX(-${
      indexRef.current * (CARD_WIDTH + GAP)
    }px)`;

    setTimeout(() => {
      if (exitingCard) {
        exitingCard.style.transition = "none";
        exitingCard.style.opacity = "1";
      }

      if (indexRef.current >= testimonials.length) {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        indexRef.current = 0;
      }

      saveCurrentPosition();
    }, SLIDE_TIME);
  }, PAUSE_TIME + SLIDE_TIME);
};


  const stopSlider = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    if (!isHovered) startSlider();
    else stopSlider();
    return stopSlider;
  }, [isHovered]);

  useEffect(() => {
    const handleVisibility = () => {
      stopSlider();
      if (!document.hidden && !isHovered) {
        if (trackRef.current) {
          trackRef.current.style.transition = "none";
          trackRef.current.style.transform = `translateX(-${
            indexRef.current * (CARD_WIDTH + GAP)
          }px)`;
        }
        startSlider();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [isHovered]);

  useEffect(() => {
    return () => {
      saveCurrentPosition();
    };
  }, []);

  // ✅ ADDED (ONLY THIS)
  if (loading) {
    return <FryingPanLoader />;
  }

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 4, md: 5 },
        overflow: "hidden",
        backgroundColor: "#f5f4f4",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 2,
          px: { xs: 2 },
          ml: { md: "1px" },
          mt: 5,
        }}
      >
        <Typography
        component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "24px", sm: "30px", md: "36px" },
            mr: { md: 16 },
            
          }}
        >
          Hear it from those who trust Hogist
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: { xs: 0.5, md: 2 },
            ml: { md: -18 },
            mt: { xs: 1 },
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "#ff2e2e",
              color: "#fff",
              width: { xs: 28, sm: 32, md: 28 },
              height: { xs: 28, sm: 32, md: 28 },
              p: { xs: 0.5, sm: 1 },
              
            }}
            onClick={() => slideTestimonials("backward")}
          >
            <ArrowBackIosNewIcon
              sx={{ fontSize: { xs: 14, sm: 16, md: 14 } }}
            />
          </IconButton>

          <IconButton
            sx={{
              backgroundColor: "#ff2e2e",
              color: "#fff",
              width: { xs: 28, sm: 32, md: 28 },
              height: { xs: 28, sm: 32, md: 28 },
              p: { xs: 0.5, sm: 1 },
            }}
            onClick={() => slideTestimonials("forward")}
          >
            <ArrowForwardIosIcon
              sx={{ fontSize: { xs: 14, sm: 16, md: 14 } }}
            />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          px: `${INNER_PADDING}px`,
          width: {
            xs: `${CARD_WIDTH}px`,
            sm: `${
              VISIBLE_CARDS * CARD_WIDTH + (VISIBLE_CARDS - 1) * GAP
            }px`,
            md: `${
              VISIBLE_CARDS * CARD_WIDTH + (VISIBLE_CARDS - 1) * GAP
            }px`,
          },
          mx: "auto",

          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            width: { xs: "60px", sm: "120px", md: "120px" },
            zIndex: 100,
            pointerEvents: "none",
          },

          "&::before": {
            left: 0,
            background:
              "linear-gradient(to right, #f5f4f4 0%, transparent 30%)",
          },

          "&::after": {
            right: 0,
            background:
              "linear-gradient(to left, #f5f4f4 0%, transparent 30%)",
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          ref={trackRef}
          sx={{
            display: "flex",
            gap: `${GAP}px`,
            width: "max-content",
          }}
        >
          {[...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials].map(
            (_, index) => (
              <Box
                key={index}
                sx={{
                  flexShrink: 0,
                  width: CARD_WIDTH,
                }}
              >
                <CustomerCard index={index} />
              </Box>
            )
          )}
        </Box>
      </Box>

      <GetStarted />
    </Box>
  );
};