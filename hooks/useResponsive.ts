// hooks/useResponsive.ts
import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Пороги для разных размеров экрана
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const useResponsive = () => {
  const [dimensions, setDimensions] = useState<ScaledSize>(Dimensions.get('window'));
  
  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
    };
    
    const subscription = Dimensions.addEventListener('change', onChange);
    
    return () => {
      // В новых версиях RN
      if (subscription?.remove) {
        subscription.remove();
      } else {
        // Для обратной совместимости
        Dimensions.removeEventListener('change', onChange);
      }
    };
  }, []);
  
  const { width, height } = dimensions;
  
  // Определяем текущий размер экрана
  const getScreenSize = (): ScreenSize => {
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };
  
  // Удобные проверки для разных размеров
  const isXs = width < breakpoints.sm;
  const isSm = width >= breakpoints.sm && width < breakpoints.md;
  const isMd = width >= breakpoints.md && width < breakpoints.lg;
  const isLg = width >= breakpoints.lg && width < breakpoints.xl;
  const isXl = width >= breakpoints.xl;
  
  // Проверки для более общих случаев
  const isMobile = width < breakpoints.md;
  const isTablet = width >= breakpoints.md && width < breakpoints.lg;
  const isDesktop = width >= breakpoints.lg;
  
  // Функция для получения стилей в зависимости от размера экрана
  const getResponsiveStyles = (styles: Record<ScreenSize | 'default', any>) => {
    const currentSize = getScreenSize();
    return styles[currentSize] || styles.default;
  };
  
  // Функция для получения значения в зависимости от размера экрана
  const getResponsiveValue = <T>(values: Record<ScreenSize | 'default', T>): T => {
    const currentSize = getScreenSize();
    return values[currentSize] || values.default;
  };
  
  return {
    width,
    height,
    screenSize: getScreenSize(),
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isMobile,
    isTablet,
    isDesktop,
    getResponsiveStyles,
    getResponsiveValue,
  };
};