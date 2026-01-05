import { useEffect, useState } from "react";

/**
 * Returns a scaling factor based on the window width.
 * Useful for scaling non-responsive elements or creating dynamic typography.
 * 
 * @param min Minimum scale factor (default: 0.8)
 * @param max Maximum scale factor (default: 1.2)
 * @param breakpoint Width at which scale is 1 (default: 1200)
 */
export const useScale = (min = 0.8, max = 1.2, breakpoint = 1400) => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const update = () => {
            if (typeof window === 'undefined') return;
            
            const width = window.innerWidth;
            // Linear interpolation
            // If width == breakpoint, result is 1
            // If width < breakpoint, result < 1 etc.
            // Clamped between min and max
            const rawScale = 1 + (width - breakpoint) * 0.0005; 
            
            const factor = Math.min(
                max,
                Math.max(min, rawScale)
            );
            setScale(factor);
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [min, max, breakpoint]);

    return scale;
};
