// components/ThemedText.tsx
import React from 'react';
import { Text, TextStyle, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { colors } from '../constants/Colors';
import { typography, responsiveFontSize } from '../constants/Typography';

type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'subtitle1' 
  | 'subtitle2' 
  | 'body1' 
  | 'body2' 
  | 'button' 
  | 'caption' 
  | 'overline';

type TextColor = 
  | 'primary' 
  | 'secondary' 
  | 'text' 
  | 'textSecondary' 
  | 'accent' 
  | 'white' 
  | 'error' 
  | 'success';

interface ThemedTextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  style?: TextStyle | TextStyle[];
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  onPress?: () => void;
}

const ThemedText = ({
  children,
  variant = 'body1',
  color = 'text',
  style,
  align = 'auto',
  onPress,
  ...props
}: ThemedTextProps) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const getColorStyle = () => {
    switch (color) {
      case 'primary':
        return { color: colors.primary };
      case 'secondary':
        return { color: colors.textSecondary };
      case 'text':
        return { color: colors.text };
      case 'textSecondary':
        return { color: colors.textSecondary };
      case 'accent':
        return { color: colors.accent };
      case 'white':
        return { color: 'white' };
      case 'error':
        return { color: colors.error };
      case 'success':
        return { color: colors.success };
      default:
        return { color: colors.text };
    }
  };

  // Адаптация стилей для мобильных устройств
  const getResponsiveStyle = () => {
    if (isMobile) {
      switch (variant) {
        case 'h1':
          return styles.h1Mobile;
        case 'h2':
          return styles.h2Mobile;
        case 'h3':
          return styles.h3Mobile;
        case 'h4':
          return styles.h4Mobile;
        case 'h5':
          return styles.h5Mobile;
        default:
          return {};
      }
    }
    return {};
  };

  const textStyle = [
    styles.base,
    styles[variant],
    getColorStyle(),
    getResponsiveStyle(),
    { textAlign: align },
    style,
  ];

  return (
    <Text style={textStyle} onPress={onPress} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: typography.fontFamily,
  },
  h1: {
    fontSize: typography.fontSize['6xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight['5xl'],
  },
  h1Mobile: {
    fontSize: typography.fontSize['4xl'],
    lineHeight: typography.lineHeight['3xl'],
  },
  h2: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight['4xl'],
  },
  h2Mobile: {
    fontSize: typography.fontSize['3xl'],
    lineHeight: typography.lineHeight['2xl'],
  },
  h3: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight['3xl'],
  },
  h3Mobile: {
    fontSize: typography.fontSize['2xl'],
    lineHeight: typography.lineHeight.xl,
  },
  h4: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight['2xl'],
  },
  h4Mobile: {
    fontSize: typography.fontSize.xl,
    lineHeight: typography.lineHeight.lg,
  },
  h5: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.xl,
  },
  h5Mobile: {
    fontSize: typography.fontSize.lg,
    lineHeight: typography.lineHeight.md,
  },
  subtitle1: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.lg,
  },
  subtitle2: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.md,
  },
  body1: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.md,
  },
  body2: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.sm,
  },
  button: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: typography.letterSpacing.wide,
  },
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.xs,
  },
  overline: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: typography.letterSpacing.wider,
    textTransform: 'uppercase',
  },
});

export default ThemedText;