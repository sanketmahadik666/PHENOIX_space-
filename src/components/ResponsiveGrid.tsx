import { ReactNode } from "react";

interface ResponsiveGridProps {
    minItemWidth?: number; // Minimum width in pixels before wrapping
    gap?: number; // Gap in pixels (or can use tailwind classes if preferred, but manual control is nice)
    children: ReactNode;
    className?: string;
}

export const ResponsiveGrid = ({
    minItemWidth = 300,
    gap = 24,
    children,
    className = ""
}: ResponsiveGridProps) => (
    <div
        className={`grid w-full ${className}`}
        style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`,
            gap: `${gap}px`,
        }}
    >
        {children}
    </div>
);
