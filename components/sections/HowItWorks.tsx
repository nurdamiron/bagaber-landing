// components/sections/HowItWorks.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Section from '../layout/Section';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';

const HowItWorks = () => {
  const { isMobile, isTablet } = useResponsive();

  return (
    <Section
      title={content.howItWorks.title}
      subtitle={content.howItWorks.subtitle}
      withGradient
      gradientColors={['#F8F9FE', '#FFFFFF']}
      style={styles.section}
      id="how-it-works"
    >
      <View style={[
        styles.stepsContainer, 
        isMobile && styles.stepsContainerMobile,
        isTablet && !isMobile && { justifyContent: 'space-around' }
      ]}>
        {content.howItWorks.steps.map((step, index) => (
          <View 
            key={index} 
            style={[
              styles.stepCard, 
              isMobile && styles.stepCardMobile,
              isTablet && !isMobile && { width: '45%', marginBottom: 40 }
            ]}
          >
            <View style={styles.stepNumberContainer}>
              <ThemedText variant="h3" color="primary" style={styles.stepNumber}>
                {step.number}
              </ThemedText>
            </View>
            
            <View style={styles.stepIconContainer}>
              <Ionicons name={step.icon} size={32} color={colors.primary} />
            </View>
            
            <ThemedText variant="h5" style={styles.stepTitle}>
              {step.title}
            </ThemedText>
            
            <ThemedText variant="body2" color="secondary" style={styles.stepDescription}>
              {step.description}
            </ThemedText>
            
            {/* Стрелка между шагами (кроме последнего) на десктопе */}
            {!isMobile && !isTablet && index < content.howItWorks.steps.length - 1 && (
              <View style={styles.stepArrow}>
                <Ionicons name="arrow-forward" size={24} color={colors.primary} />
              </View>
            )}
            
            {/* Стрелка на планшете (вниз) */}
            {isTablet && !isMobile && index % 2 === 0 && index < content.howItWorks.steps.length - 1 && (
              <View style={styles.tabletStepArrow}>
                <Ionicons name="arrow-forward" size={24} color={colors.primary} />
              </View>
            )}
            
            {/* Стрелка на планшете (следующая строка) */}
            {isTablet && !isMobile && index % 2 === 1 && index < content.howItWorks.steps.length - 2 && (
              <View style={styles.tabletRowArrow}>
                <Ionicons name="arrow-down" size={24} color={colors.primary} />
              </View>
            )}
          </View>
        ))}
      </View>
      
      {/* Дополнительный призыв к действию */}
      <View style={[
        styles.ctaContainer,
        isMobile && { padding: 24 }
      ]}>
        <ThemedText 
          variant="subtitle1" 
          color="secondary" 
          style={[
            styles.ctaText,
            isMobile && { fontSize: 16, lineHeight: 24 }
          ]}
        >
          Начните автоматизировать сбор отзывов уже сегодня и увидите результаты в течение недели
        </ThemedText>
        <TouchableOpacity 
          style={styles.ctaButton}
          activeOpacity={0.8}
        >
          <ThemedText variant="button" color="white">
            Попробовать бесплатно
          </ThemedText>
        </TouchableOpacity>
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 80,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 40,
    marginBottom: 60,
    flexWrap: 'wrap',
  },
  stepsContainerMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepCard: {
    width: '22%',
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
    ...shadows.small,
  },
  stepCardMobile: {
    width: '100%',
    marginBottom: 40,
    padding: 20,
  },
  stepNumberContainer: {
    position: 'absolute',
    top: -20,
    backgroundColor: colors.backgroundLight,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  stepNumber: {
    fontWeight: '700',
  },
  stepIconContainer: {
    width: 70,
    height: 70,
    backgroundColor: colors.backgroundLight,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 16,
  },
  stepTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  stepDescription: {
    textAlign: 'center',
    lineHeight: 22,
  },
  stepArrow: {
    position: 'absolute',
    right: -12,
    top: '50%',
    marginTop: -12,
  },
  // Стрелки для планшета
  tabletStepArrow: {
    position: 'absolute',
    right: -30,
    top: '50%',
    marginTop: -12,
  },
  tabletRowArrow: {
    position: 'absolute',
    bottom: -30,
    left: '50%',
    marginLeft: -12,
  },
  ctaContainer: {
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    padding: 32,
    marginTop: 20,
  },
  ctaText: {
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 600,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
});

export default HowItWorks;