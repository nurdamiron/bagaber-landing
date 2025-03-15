// app/index.tsx - исправленная версия
import React from 'react';
import { ScrollView, StyleSheet, View, Platform, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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

// Theme & Utilities
import { colors } from '../constants/Colors';

export default function LandingScreen() {
  const { height } = Dimensions.get('window');

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      {/* Убираем edges={['top']} для лучшей совместимости */}
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true} // Включаем индикатор скролла
          scrollEnabled={true} // Явно указываем, что скролл разрешен
          bounces={true} // Добавляем отскок при скролле для лучшего UX
          keyboardShouldPersistTaps="handled" // Улучшаем поведение при наличии форм
        >
          <Hero />
          <ProblemSolution />
          <Features />
          <HowItWorks />
          <Testimonials />
          <Pricing />
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
    // Убираем фиксированную высоту и позволяем контейнеру расширяться
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1, // Позволяет контенту расширяться
    // Не устанавливаем фиксированную высоту, чтобы контент мог прокручиваться
  },
});