import { useMemo } from "react";

export const useDesignTokens = () => {
    const tokens = useMemo(
        () => ({
            // Palette
            colors: {
                primary: "#C47F6B", // Terracotta
                secondary: "#8DA399", // Sage
                background: "#EBE9E4", // Stone
                text: "#2C2C2C", // Charcoal
                subtext: "#5c5c5c",
                white: "#FFFFFF"
            },
            // Spacing (rem)
            spacing: {
                xs: "0.5rem",
                sm: "1rem",
                md: "2rem",
                lg: "4rem",
                xl: "8rem"
            },
            // Animation
            animation: {
                duration: 1.2, // seconds (for framer-motion)
                easing: [0.22, 1, 0.36, 1] as const, // Custom soft ease
                staggerDelay: 0.2
            },
            font: {
                serif: "font-serif",
                sans: "font-sans"
            }
        }),
        []
    );

    return tokens;
};
