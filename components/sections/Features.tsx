// components/sections/Features.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Section from '../layout/Section';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';

const Features = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  // Расчёт количества элементов в строке на основе типа устройства
  const getColumnCount = () => {
    if (isDesktop) return 3; // Desktop - 3 колонки
    if (isTablet) return 2;  // Tablet - 2 колонки
    return 1; // Mobile - 1 колонка
  };
  
  const columnCount = getColumnCount();
  
  return (
    <Section
      title={content.features.title}
      subtitle={content.features.subtitle}
      withGradient
      gradientColors={['#FFFFFF', '#F8F9FE']}
      style={styles.section}
      id="features"
    >
      <View style={[
        styles.featuresContainer,
        { flexDirection: columnCount === 1 ? 'column' : 'row' }
      ]}>
        {content.features.items.map((feature) => (
          <View 
            key={feature.id} 
            style={[
              styles.featureCard,
              isMobile && styles.featureCardMobile,
              { width: columnCount === 1 ? '100%' : `${100 / columnCount - 4}%` }
            ]}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={feature.icon} size={28} color={colors.primary} />
            </View>
            <ThemedText variant="h5" style={styles.featureTitle}>
              {feature.title}
            </ThemedText>
            <ThemedText variant="body2" color="secondary" style={styles.featureDescription}>
              {feature.description}
            </ThemedText>
          </View>
        ))}
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 80,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  featureCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    marginHorizontal: 8,
    ...shadows.small,
    flex: 1,
    minHeight: 220,
  },
  featureCardMobile: {
    marginHorizontal: 0,
    padding: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    marginBottom: 12,
  },
  featureDescription: {
    lineHeight: 22,
  },
});

export default Features;