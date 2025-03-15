// components/sections/Pricing.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Section from '../layout/Section';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';

const Pricing = () => {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <Section
      title="Тарифы"
      subtitle="Выберите подходящий тариф для вашего бизнеса"
      style={styles.section}
      id="pricing"
    >
      <View style={styles.plansContainer}>
        {content.pricing.plans.map((plan) => (
          <View 
            key={plan.id} 
            style={[
              styles.planCard,
              plan.id === 'pro' && styles.popularPlanCard
            ]}
          >
            {plan.id === 'pro' && (
              <View style={styles.popularBadge}>
                <ThemedText 
                  variant="caption" 
                  color="white"
                  fontFamily="Montserrat-Medium"
                >
                  Популярный выбор
                </ThemedText>
              </View>
            )}
            
            <ThemedText 
              variant="h4" 
              style={styles.planTitle}
              fontFamily="Montserrat-Bold"
            >
              {plan.title}
            </ThemedText>
            
            <ThemedText 
              variant="body2" 
              color="secondary" 
              style={styles.planDescription}
              fontFamily="Montserrat-Regular"
            >
              {plan.description}
            </ThemedText>
            
            <View style={styles.priceContainer}>
              <ThemedText 
                variant="h3" 
                color={plan.id === 'pro' ? 'primary' : 'text'} 
                style={styles.price}
                fontFamily="Montserrat-Bold"
              >
                {plan.price}
              </ThemedText>
              <ThemedText 
                variant="caption" 
                color="secondary" 
                style={styles.period}
                fontFamily="Montserrat-Regular"
              >
                / {plan.period}
              </ThemedText>
            </View>
            
            <View style={styles.featuresContainer}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={colors.success}
                    style={styles.featureIcon}
                  />
                  <ThemedText 
                    variant="body2" 
                    style={styles.featureText}
                    fontFamily="Montserrat-Regular"
                  >
                    {feature}
                  </ThemedText>
                </View>
              ))}
            </View>
            
            <TouchableOpacity
              style={styles.planButton}
              activeOpacity={0.8}
            >
              <ThemedText 
                variant="button" 
                color="white"
                fontFamily="Montserrat-Medium"
              >
                {plan.cta}
              </ThemedText>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      
      <View style={styles.noteContainer}>
        <ThemedText 
          variant="caption" 
          color="secondary" 
          style={styles.noteText}
          fontFamily="Montserrat-Regular"
        >
          {content.pricing.note}
        </ThemedText>
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 70,
  },
  plansContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1200,
    marginHorizontal: 'auto',
    marginTop: 40,
  },
  planCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 30,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
    position: 'relative',
  },
  popularPlanCard: {
    borderColor: colors.primary,
    borderWidth: 2,
    transform: [{ translateY: -8 }],
    ...shadows.medium,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -60 }],
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 1,
  },
  planTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  planDescription: {
    textAlign: 'center',
    marginBottom: 24,
    color: colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
  },
  period: {
    marginBottom: 6,
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
  },
  planButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noteText: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  
  // Media queries for larger screens
  '@media (min-width: 768px)': {
    plansContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    planCard: {
      width: '30%',
      marginHorizontal: '1.5%',
    },
  },
});

export default Pricing;