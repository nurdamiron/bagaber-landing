import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ThemedText from '../ThemedText';
import { colors } from '../../constants/Colors';

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  titleStyle?: ViewStyle;
  subtitleStyle?: ViewStyle;
  withGradient?: boolean;
  gradientColors?: string[];
  align?: 'left' | 'center' | 'right';
}

const Section = ({
  children,
  title,
  subtitle,
  style,
  containerStyle,
  titleStyle,
  subtitleStyle,
  withGradient = false,
  gradientColors = ['#F8F9FE', '#FFFFFF'],
  align = 'center',
}: SectionProps) => {
  const content = (
    <View style={[styles.container, containerStyle]}>
      {title && (
        <ThemedText
          style={[
            styles.title,
            align === 'left' && { textAlign: 'left' },
            align === 'right' && { textAlign: 'right' },
            titleStyle,
          ]}
          variant="h2"
        >
          {title}
        </ThemedText>
      )}
      {subtitle && (
        <ThemedText
          style={[
            styles.subtitle,
            align === 'left' && { textAlign: 'left' },
            align === 'right' && { textAlign: 'right' },
            subtitleStyle,
          ]}
          variant="subtitle1"
          color="secondary"
        >
          {subtitle}
        </ThemedText>
      )}
      {children}
    </View>
  );

  if (withGradient) {
    return (
      <LinearGradient
        colors={gradientColors}
        style={[styles.section, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {content}
      </LinearGradient>
    );
  }

  return <View style={[styles.section, style]}>{content}</View>;
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  container: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: colors.text,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: colors.textSecondary,
  },
});

export default Section;