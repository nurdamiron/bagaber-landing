// components/sections/PricingCards.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';

const PricingCards = () => {
  const { isMobile } = useResponsive();
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.plansContainer,
        !isMobile && styles.plansContainerDesktop
      ]}>
        {content.pricing.plans.map((plan) => (
          <View 
            key={plan.id} 
            style={[
              styles.planCard,
              plan.popular && styles.popularPlanCard,
              isMobile ? { width: '100%' } : { flex: 1 }
            ]}
          >
            {plan.popular && (
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
                color={plan.popular ? 'primary' : 'text'} 
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
              style={[
                styles.planButton,
                plan.popular && styles.popularButton
              ]}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  plansContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1200,
    marginHorizontal: 'auto',
    marginTop: 40,
    gap: 30,
  },
  plansContainerDesktop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  planCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 30,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
    position: 'relative',
    maxWidth: 380,
  },
  popularPlanCard: {
    borderColor: colors.primary,
    borderWidth: 2,
    ...shadows.medium,
    zIndex: 1,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: 0,
    right: 0,
    marginHorizontal: 'auto',
    width: 180,
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 2,
    alignItems: 'center',
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
  popularButton: {
    backgroundColor: colors.primary,
  },
  noteContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noteText: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default PricingCards;