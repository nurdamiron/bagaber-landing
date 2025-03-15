import React from 'react';
import { Text, TextStyle, StyleSheet, Platform } from 'react-native';
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
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  h1: {
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 58,
  },
  h2: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h3: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  h4: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  h5: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  subtitle1: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 28,
  },
  subtitle2: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
  },
  button: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.4,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  overline: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default ThemedText;