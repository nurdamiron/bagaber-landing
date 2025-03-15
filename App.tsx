// App.tsx
import React, { useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useColorScheme } from './hooks/useColorScheme';
import { Platform } from 'react-native';

// Основной компонент лендинга
import LandingScreen from './app/index';

function App() {
  const colorScheme = useColorScheme();
  
  // Загружаем шрифты
  const [fontsLoaded] = useFonts({
    // Загружаем системные шрифты для iOS
    ...(Platform.OS === 'ios' ? {
      'SF-Pro-Display-Regular': require('./assets/fonts/SF-Pro-Display-Regular.otf'),
      'SF-Pro-Display-Medium': require('./assets/fonts/SF-Pro-Display-Medium.otf'),
      'SF-Pro-Display-Bold': require('./assets/fonts/SF-Pro-Display-Bold.otf'),
      'SF-Pro-Display-Semibold': require('./assets/fonts/SF-Pro-Display-Semibold.otf'),
    } : {}),
    // Для Android
    ...(Platform.OS === 'android' ? {
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    } : {}),
    // Для веб-версии используем системные шрифты
  });

  // Установка метатегов для веб-версии
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Метатеги для SEO и отображения на мобильных устройствах
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
      document.head.appendChild(meta);
      
      const metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = 'Bagaber - сервис для автоматического повышения рейтинга Kaspi-магазина через сбор отзывов покупателей';
      document.head.appendChild(metaDescription);
      
      // Измените title страницы
      document.title = 'Bagaber - Повышайте рейтинг Kaspi-магазина автоматически';
    }
  }, []);

  // Если шрифты не загрузились, показываем пустой экран
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <LandingScreen />
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);