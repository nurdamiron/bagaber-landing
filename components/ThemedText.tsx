// components/ThemedText.tsx
import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors } from '../constants/Colors';

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
  fontFamily?: string;
  onPress?: () => void;
}

const ThemedText = ({
  children,
  variant = 'body1',
  color = 'text',
  style,
  align = 'auto',
  fontFamily,
  onPress,
  ...props
}: ThemedTextProps) => {

  // Get font family based on variant
  const getFontFamily = () => {
    if (fontFamily) return { fontFamily };
    
    // Default font families based on variant
    switch (variant) {
      case 'h1':
      case 'h2':
      case 'h3':
        return { fontFamily: 'Montserrat-Bold' };
      case 'h4':
      case 'h5':
      case 'subtitle1':
      case 'subtitle2':
      case 'button':
        return { fontFamily: 'Montserrat-SemiBold' };
      case 'overline':
        return { fontFamily: 'Montserrat-Medium' };
      default:
        return { fontFamily: 'Montserrat-Regular' };
    }
  };

  // Get color style
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

  const textStyle = [
    styles.base,
    styles[variant],
    getColorStyle(),
    getFontFamily(),
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
    // Base styles
  },
  h1: {
    fontSize: 42,
    lineHeight: 52,
  },
  h2: {
    fontSize: 32,
    lineHeight: 40,
  },
  h3: {
    fontSize: 28,
    lineHeight: 36,
  },
  h4: {
    fontSize: 24,
    lineHeight: 32,
  },
  h5: {
    fontSize: 20, 
    lineHeight: 28,
  },
  subtitle1: {
    fontSize: 18,
    lineHeight: 28,
  },
  subtitle2: {
    fontSize: 16,
    lineHeight: 24,
  },
  body1: {
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    lineHeight: 22,
  },
  button: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
  },
  overline: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default ThemedText;