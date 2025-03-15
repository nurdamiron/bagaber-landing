// components/sections/Pricing.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Section from '../layout/Section';
import PricingCards from './PricingCards';
import { useResponsive } from '../../hooks/useResponsive';

const Pricing = () => {
  const { isMobile } = useResponsive();
  
  return (
    <Section
      title="Тарифы"
      subtitle="Выберите подходящий тариф для вашего бизнеса"
      style={styles.section}
      id="pricing"
    >
      <PricingCards />
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 70,
  },
});

export default Pricing;