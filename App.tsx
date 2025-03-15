import React from 'react';
import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useColorScheme } from './hooks/useColorScheme';

// Основной компонент лендинга
import LandingScreen from './app/index';

function App() {
  const colorScheme = useColorScheme();
  
  // Загружаем шрифты, если необходимо
  const [fontsLoaded] = useFonts({
    // Здесь можно добавить кастомные шрифты
    // 'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
  });

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