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
  
  // Безопасное удаление черной полосы сверху - только для веб-версии
  useEffect(() => {
    // Используем проверку, чтобы избежать ошибки "document is not defined"
    // и заворачиваем весь код в блок try-catch для безопасности
    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof document !== 'undefined') {
      try {
        // Скрытие нежелательных элементов
        const removeBlackBanner = () => {
          try {
            // Скрываем элементы с id, начинающимся с "index"
            const bannerElements = document.querySelectorAll('[id^="index"]');
            bannerElements.forEach(element => {
              if (element.tagName !== 'DIV' && element.style) {
                element.style.display = 'none';
              }
            });
            
            // Также скрываем любые другие нежелательные элементы шапки
            const unwantedHeaders = document.querySelectorAll('header:not(#main-header)');
            unwantedHeaders.forEach(header => {
              if (header && header.style) {
                header.style.display = 'none';
              }
            });
          } catch (e) {
            console.warn('Error hiding banner:', e);
          }
        };
        
        // Запускаем процесс скрытия один раз
        removeBlackBanner();
        
        // Настройка метатегов для SEO
        try {
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
        } catch (e) {
          console.warn('Error setting meta tags:', e);
        }
      } catch (e) {
        console.warn('Error in web initialization:', e);
      }
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
    paddingTop: 80, // Add padding for the fixed header
  },
});