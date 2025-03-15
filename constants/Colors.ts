// constants/Colors.ts
export const colors = {
  // Brand colors
  primary: '#4E6AFF',    // Main brand color - more vibrant blue
  secondary: '#6C63FF',  // Secondary brand color
  accent: '#FF5678',     // Accent color for highlights and CTAs
  
  // Background colors
  background: '#FFFFFF',      // Main background
  backgroundLight: '#F8F9FE', // Light background for cards, sections
  backgroundDark: '#F0F2F5',  // Darker background for contrast
  
  // Text colors
  text: '#172B4D',           // Primary text color - darker for better readability
  textSecondary: '#5E6C84',  // Secondary text for descriptions, subtitles
  
  // State colors
  success: '#36B37E', // Success state - green
  error: '#FF5252',   // Error state - red
  warning: '#FFAB00', // Warning state - amber
  info: '#2684FF',    // Info state - blue
  
  // UI elements
  border: '#E6E8EC',  // Border color - lighter for subtle separation
  shadow: 'rgba(0, 0, 0, 0.08)', // Shadow color - more subtle
  
  // Gradient presets
  gradients: {
    primary: ['#4E6AFF', '#6C63FF'],
    secondary: ['#6C63FF', '#8E99FF'],
    accent: ['#FF5678', '#FF8C94'],
    light: ['#F0F4FF', '#FFFFFF'],
  },
};

// Shadows for different elevations
export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
};