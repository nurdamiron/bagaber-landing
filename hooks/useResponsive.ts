// hooks/useResponsive.ts
import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

// Screen size breakpoints (match common CSS breakpoints)
export const breakpoints = {
  xs: 0,    // Extra small devices
  sm: 576,  // Small devices (phones)
  md: 768,  // Medium devices (tablets)
  lg: 992,  // Large devices (desktops)
  xl: 1200, // Extra large devices
};

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const useResponsive = () => {
  // Initialize with current window dimensions
  const [dimensions, setDimensions] = useState<ScaledSize>(Dimensions.get('window'));
  
  useEffect(() => {
    // Function to handle dimension changes
    const onChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
    };
    
    // Add event listener for dimension changes
    const subscription = Dimensions.addEventListener('change', onChange);
    
    // Cleanup function
    return () => {
      subscription.remove();
    };
  }, []);
  
  const { width, height } = dimensions;
  
  // Determine current screen size
  const getScreenSize = (): ScreenSize => {
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };
  
  // Convenience flags for different screen sizes
  const isXs = width < breakpoints.sm;
  const isSm = width >= breakpoints.sm && width < breakpoints.md;
  const isMd = width >= breakpoints.md && width < breakpoints.lg;
  const isLg = width >= breakpoints.lg && width < breakpoints.xl;
  const isXl = width >= breakpoints.xl;
  
  // More general device type flags
  const isMobile = width < breakpoints.md;
  const isTablet = width >= breakpoints.md && width < breakpoints.lg;
  const isDesktop = width >= breakpoints.lg;
  
  // Get orientation
  const isPortrait = height > width;
  const isLandscape = width > height;
  
  // Helper function for responsive styles
  const getResponsiveValue = <T>(values: Record<ScreenSize | 'default', T>): T => {
    const currentSize = getScreenSize();
    return values[currentSize] || values.default;
  };
  
  return {
    // Dimensions
    width,
    height,
    screenSize: getScreenSize(),
    
    // Screen size flags
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    
    // Device type flags
    isMobile,
    isTablet,
    isDesktop,
    
    // Orientation
    isPortrait,
    isLandscape,
    
    // Helper functions
    getResponsiveValue,
  };
};