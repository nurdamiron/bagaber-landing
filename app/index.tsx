// app/index.tsx
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

// Components
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import HowItWorks from '../components/sections/HowItWorks';
import ProblemSolution from '../components/sections/ProblemSolution';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing';
import Contact from '../components/sections/Contact';
import FAQ from '../components/sections/FAQ';

// Theme & Utilities
import { colors } from '../constants/Colors';

export default function LandingScreen() {
  // Load custom Montserrat fonts
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });
  
  // Remove any potential black banner/header
  React.useLayoutEffect(() => {
    if (Platform.OS === 'web') {
      const bannerElements = document.querySelectorAll('[id^="index"]');
      bannerElements.forEach(element => {
        if (element.tagName !== 'DIV' && element.style && element.style.backgroundColor === '#000') {
          element.style.display = 'none';
        }
      });
    }
  }, []);

  // Add meta tags for web
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Set viewport for proper mobile display
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
      document.head.appendChild(meta);
      
      // Set description for SEO
      const metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = 'Bagaber - сервис для автоматического повышения рейтинга Kaspi-магазина через сбор отзывов покупателей';
      document.head.appendChild(metaDescription);
      
      // Set page title
      document.title = 'Bagaber - Повышайте рейтинг Kaspi-магазина автоматически';
    }
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <Header />
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Hero />
          <ProblemSolution />
          <Features />
          <HowItWorks />
          <Testimonials />
          <Pricing />
          <FAQ />
          <Contact />
          <Footer />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 70, // Add padding for the fixed header
  },
});