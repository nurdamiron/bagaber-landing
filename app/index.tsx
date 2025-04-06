// app/index.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

// Import your fixed components here
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import DataVisualization from '../components/sections/DataVisualization';
import FloatingCTA from '../components/ui/FloatingCTA';

// Original Components (you may need to fix these too)
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
import { useResponsive } from '../hooks/useResponsive';

export default function EnhancedLandingScreen() {
  const { isMobile } = useResponsive();
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  
  // Load custom Montserrat fonts
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });
  
  // Web-specific adjustments and meta tags
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof document !== 'undefined') {
      try {
        // Hide any unwanted elements
        const removeUnwantedElements = () => {
          try {
            // Hide elements with id starting with "index"
            const unwantedElements = document.querySelectorAll('[id^="index"]');
            unwantedElements.forEach(element => {
              if (element.tagName !== 'DIV' && element.style) {
                element.style.display = 'none';
              }
            });
            
            // Hide any unwanted headers
            const unwantedHeaders = document.querySelectorAll('header:not(#main-header)');
            unwantedHeaders.forEach(header => {
              if (header && header.style) {
                header.style.display = 'none';
              }
            });
          } catch (e) {
            console.warn('Error hiding elements:', e);
          }
        };
        
        // Run the cleanup once
        removeUnwantedElements();
        
        // Set SEO meta tags
        try {
          // Set viewport for proper mobile display
          const metaViewport = document.createElement('meta');
          metaViewport.name = 'viewport';
          metaViewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
          document.head.appendChild(metaViewport);
          
          // Set description
          const metaDescription = document.createElement('meta');
          metaDescription.name = 'description';
          metaDescription.content = 'Bagaber - сервис для автоматического повышения рейтинга Kaspi-магазина через сбор отзывов покупателей. Увеличьте продажи и повысьте доверие клиентов с помощью положительных отзывов.';
          document.head.appendChild(metaDescription);
          
          // Set page title
          document.title = 'Bagaber - Автоматический сбор отзывов для Kaspi-магазинов';
          
          // Add Open Graph tags for better sharing
          const ogTitle = document.createElement('meta');
          ogTitle.property = 'og:title';
          ogTitle.content = 'Bagaber - Повышайте рейтинг Kaspi-магазина автоматически';
          document.head.appendChild(ogTitle);
          
          const ogDescription = document.createElement('meta');
          ogDescription.property = 'og:description';
          ogDescription.content = 'Автоматизируйте сбор отзывов в Kaspi-магазине и увеличьте продажи. Первые 50 отзывов бесплатно!';
          document.head.appendChild(ogDescription);
          
          // Add custom CSS for smoother scrolling
          const style = document.createElement('style');
          style.textContent = `
            html {
              scroll-behavior: smooth;
            }
            
            body {
              font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            }
            
            /* Custom scrollbar for browsers that support it */
            ::-webkit-scrollbar {
              width: 8px;
            }
            
            ::-webkit-scrollbar-track {
              background: #f1f1f1;
            }
            
            ::-webkit-scrollbar-thumb {
              background: #c9d1e4;
              border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: #4E6AFF;
            }
          `;
          document.head.appendChild(style);
          
        } catch (e) {
          console.warn('Error setting meta tags:', e);
        }
      } catch (e) {
        console.warn('Error in web initialization:', e);
      }
    }
    
    // Set assets loaded to true
    setAssetsLoaded(true);
  }, []);

  // Function to handle CTA button press
  const handleCTAPress = () => {
    if (Platform.OS === 'web') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!fontsLoaded || !assetsLoaded) {
    // Show a loading indicator
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="refresh-circle" size={48} color={colors.primary} />
      </View>
    );
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
          {/* Hero Section */}
          <Hero />
          
          {/* Problem-Solution Section */}
          <ProblemSolution />
          
          {/* Data Visualization Section - NEW */}
          <DataVisualization />
          
          {/* Features Section */}
          <Features />
          
          {/* How It Works Section */}
          <HowItWorks />
          
          {/* Testimonials Section */}
          <Testimonials />
          
          {/* Pricing Section */}
          <Pricing />
          
          {/* FAQ Section */}
          <FAQ />
          
          {/* Contact Section */}
          <Contact />
          
          {/* Footer */}
          <Footer />
        </ScrollView>
        
        {/* Floating CTA Button */}
        {/* We'll implement this after fixing other components */}
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
    paddingTop: 0, // Changed to 0 since the Hero has its own padding
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  }
});