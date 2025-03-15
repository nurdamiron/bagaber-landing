// components/layout/Section.tsx
import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ThemedText from '../ThemedText';
import { colors } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';

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
  id?: string; // For web anchors
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
  id,
}: SectionProps) => {
  const { isMobile } = useResponsive();
  
  const sectionPadding = isMobile 
    ? { paddingVertical: 40, paddingHorizontal: 16 } 
    : { paddingVertical: 60, paddingHorizontal: 20 };
  
  const content = (
    <View 
      style={[styles.container, containerStyle]}
      // For web - add id for anchor navigation
      {...(id && { id })}
    >
      {title && (
        <ThemedText
          style={[
            styles.title,
            align === 'left' && { textAlign: 'left' },
            align === 'right' && { textAlign: 'right' },
            isMobile && styles.titleMobile,
            titleStyle,
          ]}
          variant="h2"
          fontFamily="Montserrat-Bold"
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
            isMobile && styles.subtitleMobile,
            subtitleStyle,
          ]}
          variant="subtitle1"
          color="secondary"
          fontFamily="Montserrat-Regular"
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
        style={[styles.section, sectionPadding, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {content}
      </LinearGradient>
    );
  }

  return <View style={[styles.section, sectionPadding, style]}>{content}</View>;
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    width: '100%',
  },
  container: {
    maxWidth: 1200,
    width: '100%',
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: colors.text,
  },
  titleMobile: {
    fontSize: 28,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: colors.textSecondary,
  },
  subtitleMobile: {
    fontSize: 16,
    marginBottom: 30,
    paddingHorizontal: 0,
  },
});

export default Section;