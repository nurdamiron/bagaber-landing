import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Section from '../layout/Section';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';

const Pricing = () => {
  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth < 768;

  return (
    <Section
      title={content.pricing.title}
      subtitle={content.pricing.subtitle}
      withGradient
      gradientColors={['#FFFFFF', '#F8F9FE']}
      style={styles.section}
      id="pricing"
    >
      <View style={[styles.plansContainer, isMobile && styles.plansContainerMobile]}>
        {content.pricing.plans.map((plan) => (
          <View 
            key={plan.id} 
            style={[
              styles.planCard,
              plan.popular && styles.popularPlan,
              isMobile && styles.planCardMobile,
            ]}
          >
            {plan.popular && (
              <View style={styles.popularBadge}>
                <ThemedText variant="caption" color="white">
                  Популярный выбор
                </ThemedText>
              </View>
            )}
            
            <ThemedText variant="h4" style={styles.planTitle}>
              {plan.title}
            </ThemedText>
            
            <ThemedText variant="caption" color="secondary" style={styles.planDescription}>
              {plan.description}
            </ThemedText>
            
            <View style={styles.priceContainer}>
              <ThemedText variant="h2" color={plan.popular ? 'primary' : 'text'} style={styles.price}>
                {plan.price}
              </ThemedText>
              <ThemedText variant="caption" color="secondary" style={styles.period}>
                / {plan.period}
              </ThemedText>
            </View>
            
            <View style={styles.featuresContainer}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={plan.popular ? colors.primary : colors.success}
                    style={styles.featureIcon}
                  />
                  <ThemedText variant="body2" style={styles.featureText}>
                    {feature}
                  </ThemedText>
                </View>
              ))}
            </View>
            
            <TouchableOpacity
              style={[
                styles.planButton,
                plan.popular && styles.popularPlanButton,
              ]}
            >
              <ThemedText 
                variant="button" 
                color={plan.popular ? 'white' : 'primary'}
              >
                {plan.cta}
              </ThemedText>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      
      <View style={styles.noteContainer}>
        <ThemedText variant="caption" color="secondary" style={styles.noteText}>
          {content.pricing.note}
        </ThemedText>
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 80,
  },
  plansContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    flexWrap: 'wrap',
  },
  plansContainerMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  planCard: {
    width: 330,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 32,
    margin: 16,
    position: 'relative',
    ...shadows.medium,
  },
  planCardMobile: {
    width: '100%',
    maxWidth: 380,
    marginBottom: 32,
  },
  popularPlan: {
    borderColor: colors.primary,
    borderWidth: 2,
    transform: [{ translateY: -8 }],
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
  },
  planTitle: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  planDescription: {
    textAlign: 'center',
    marginBottom: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  price: {
    fontWeight: '700',
  },
  period: {
    marginBottom: 8,
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
  },
  planButton: {
    backgroundColor: colors.backgroundLight,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  popularPlanButton: {
    backgroundColor: colors.primary,
  },
  noteContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noteText: {
    textAlign: 'center',
  },
});

export default Pricing;