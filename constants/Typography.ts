// constants/Typography.ts
import { Platform } from 'react-native';

export const typography = {
  // Основной шрифт для всего приложения
  fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  
  // Резервный вариант для Android
  fontFamilyAndroid: 'Roboto',
  
  // Размеры шрифтов
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    '6xl': 48,
  },
  
  // Толщина шрифта
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Высота строки
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    '2xl': 36,
    '3xl': 40,
    '4xl': 48,
    '5xl': 56,
  },
  
  // Отступы между буквами
  letterSpacing: {
    tighter: -1,
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
};

// Функция для адаптивного размера шрифта в зависимости от размера экрана
export function responsiveFontSize(size: number, factor: number = 0.5): number {
  if (Platform.OS === 'web') {
    // На веб просто возвращаем размер
    return size;
  }
  
  // Здесь можно добавить логику для адаптации под размер экрана
  // Например, использовать Dimensions.get('window').width
  return size;
}