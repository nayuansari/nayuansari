module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Merged paths for full coverage (HTML + source files)
    darkMode: "class", // Enables class-based dark mode (e.g., .dark selector in CSS) for light/dark theme switching
    theme: {
        extend: {
            colors: {
                // Core theme colors using CSS variables for dynamic theming (light/dark modes via :root/.dark in CSS)
                // This merges the Shadcn/UI structure with your custom cyan primary and pink accent palette
                // Keeps hardcoded essence (e.g., cyan #00bcd4 ≈ hsl(195 100% 50%), pink #ff4081 ≈ hsl(330 80% 60%))
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",

                // Shadcn/UI essentials for components (fixes bg-card, etc., errors; merged from first config)
                card: "hsl(var(--card))",
                "card-foreground": "hsl(var(--card-foreground))",
                popover: "hsl(var(--popover))",
                "popover-foreground": "hsl(var(--popover-foreground))",
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },

                // Primary: Sophisticated cyan palette (merged from second/third configs: #00bcd4 base, with variants for depth)
                primary: {
                    DEFAULT: "hsl(var(--primary))", // Main: Vibrant cyan (hsl(195 100% 50%) ≈ #00bcd4)
                    foreground: "hsl(var(--primary-foreground))", // White (#ffffff) for contrast
                    light: "hsl(var(--primary-light))", // Lighter cyan for hovers (hsl(195 80% 60%) ≈ #4dd0e1)
                    dark: "hsl(var(--primary-dark))", // Darker cyan for shadows/active (hsl(195 100% 40%))
                },

                // Secondary: Subtle slate/dark blue for backgrounds/cards (merged from second config: #2e2e4a base)
                secondary: {
                    DEFAULT: "hsl(var(--secondary))", // Mid-dark slate (hsl(217 32% 17%) ≈ #2e2e4a in dark mode)
                    foreground: "hsl(var(--secondary-foreground))", // Light gray text (#e0e0e0)
                    light: "hsl(var(--secondary-light))", // Lighter slate for hovers (hsl(217 32% 27%))
                },

                // Muted: Soft grays for subtle elements (merged muted-foreground #a0a0a0 from second config)
                muted: {
                    DEFAULT: "hsl(var(--muted))", // Light slate in light mode, dark in dark
                    foreground: "hsl(var(--muted-foreground))", // Muted gray (#a0a0a0 or hsl(215 20% 65%))
                },

                // Accent: Vibrant pink for highlights (merged from second/third: #ff4081 base, with light variant)
                accent: {
                    DEFAULT: "hsl(var(--accent))", // Bold pink (hsl(330 80% 60%) ≈ #ff4081)
                    foreground: "hsl(var(--accent-foreground))", // White (#ffffff) for contrast
                    light: "hsl(var(--accent-light))", // Softer pink for subtle accents/hovers (hsl(330 80% 70%))
                },

                // Additional neutrals and destructive (improved for completeness; red for errors)
                neutral: {
                    50: "#f8fafc", // Light neutral (merged for flexibility)
                    900: "#0f172a", // Dark neutral
                },
            },
            borderRadius: {
                // Merged refined radii: Shadcn calc-based + polished extensions for neumorphic/modern look
                lg: "var(--radius)", // Base radius from CSS var
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                xs: "4px", // Extra small for fine details
                "2xl": "24px", // Larger for cards/buttons
                "3xl": "32px", // Hero sections
                rounded: "var(--radius, 0.5rem)", // Fallback for consistency
            },
            fontFamily: {
                // Enhanced typography: Inter primary (merged from second/third configs) with fallbacks and variants
                sans: ["Inter", "system-ui", "sans-serif"], // Body text
                display: ["Inter", "ui-serif", "Georgia", "serif"], // Headings for elegance
                mono: ["JetBrains Mono", "ui-monospace", "monospace"], // Code blocks
            },
            fontSize: {
                // Improved responsive sizing with line heights (extended from third config for better readability)
                xs: ["0.75rem", { lineHeight: "1rem" }],
                sm: ["0.875rem", { lineHeight: "1.25rem" }],
                base: ["1rem", { lineHeight: "1.5rem" }],
                lg: ["1.125rem", { lineHeight: "1.75rem" }],
                xl: ["1.25rem", { lineHeight: "1.75rem" }],
                "2xl": ["1.5rem", { lineHeight: "2rem" }],
                "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
                "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
                "5xl": ["3rem", { lineHeight: "1" }],
                "6xl": ["3.75rem", { lineHeight: "1" }],
                "7xl": ["4.5rem", { lineHeight: "1" }],
                "8xl": ["6rem", { lineHeight: "1" }],
                "9xl": ["8rem", { lineHeight: "1" }],
            },
            boxShadow: {
                // Stylish shadows for depth (fully merged from third config; includes medium for cards)
                soft: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
                medium: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Used in .card
                large: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                neumorphic: "8px 8px 16px #d1d9e6, -8px -8px 16px #f8f9fa", // Modern, soft UI depth
                inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)", // For inset effects
            },
            animation: {
                // Smooth animations for dynamic feel (merged from third config)
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-up": "slideUp 0.3s ease-out",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "bounce-gentle": "bounce 2s infinite",
                "spin-slow": "spin 3s linear infinite",
            },
            keyframes: {
                // Keyframes for custom animations (merged from third)
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(10px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
            // Spacing refinements (merged from third for better layout control)
            spacing: {
                18: "4.5rem",
                128: "32rem",
            },
        },
    },
    plugins: [
        // Optional plugins for enhanced features (install via npm if needed, e.g., npm i -D @tailwindcss/forms)
        // require('@tailwindcss/forms'), // Better form controls
        // require('@tailwindcss/typography'), // Rich text styling (prose classes)
        // require('@tailwindcss/aspect-ratio'), // Responsive media ratios
    ],
};