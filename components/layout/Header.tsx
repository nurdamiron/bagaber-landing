// components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { content } from '../../constants/content';
import { colors } from '../../constants/Colors';
import ThemedText from '../ThemedText';
import { useResponsive } from '../../hooks/useResponsive';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isMobile } = useResponsive();
  
  // Анимированные значения
  const headerOpacity = new Animated.Value(0);
  const menuHeight = new Animated.Value(0);
  
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleScroll = () => {
        const newScrolled = window.scrollY > 50;
        if (newScrolled !== scrolled) {
          setScrolled(newScrolled);
          Animated.timing(headerOpacity, {
            toValue: newScrolled ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [scrolled]);
  
  // Анимация меню
  useEffect(() => {
    Animated.timing(menuHeight, {
      toValue: menuOpen ? 250 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [menuOpen]);
  
  // Обработчик клика по пункту меню
  const handleNavItemPress = (id: string) => {
    setMenuOpen(false);
    
    // Скролл к секции (для веб)
    if (Platform.OS === 'web') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  // Навигационные пункты
  const navItems = [
    { id: 'features', label: 'Функции' },
    { id: 'how-it-works', label: 'Как это работает' },
    { id: 'testimonials', label: 'Отзывы' },
    { id: 'pricing', label: 'Тарифы' },
    { id: 'contact', label: 'Контакты' },
  ];
  
  // Рендер бургер-меню
  const renderMobileMenu = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuOpen(!menuOpen)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={menuOpen ? 'close-outline' : 'menu-outline'}
            size={28}
            color={colors.text}
          />
        </TouchableOpacity>
        
        <Animated.View style={[styles.mobileMenu, { height: menuHeight, zIndex: 200, }]}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.mobileMenuItem}
              onPress={() => handleNavItemPress(item.id)}
              activeOpacity={0.7}
            >
              <ThemedText variant="subtitle1">{item.label}</ThemedText>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            style={styles.mobileMenuCta}
            onPress={() => handleNavItemPress('contact')}
            activeOpacity={0.8}
          >
            <ThemedText variant="button" color="white">
              {content.hero.cta}
            </ThemedText>
          </TouchableOpacity>
        </Animated.View>
      </>
    );
  };
  
  // Рендер десктоп-меню
  const renderDesktopMenu = () => {
    return (
      <View style={styles.navContainer}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => handleNavItemPress(item.id)}
            activeOpacity={0.7}
          >
            <ThemedText variant="subtitle2">{item.label}</ThemedText>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={() => handleNavItemPress('contact')}
          activeOpacity={0.8}
        >
          <ThemedText variant="button" color="white">
            {content.hero.cta}
          </ThemedText>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <>
      <Animated.View
        style={[
          styles.headerBackground,
          {
            opacity: headerOpacity,
            position: isMobile ? 'absolute' : (Platform.OS === 'web' ? 'fixed' : 'absolute'),
            zIndex: 100,
          },
        ]}
      />
      
      <View style={[
        styles.header,
        isMobile ? { position: 'absolute', zIndex: 100 } : {}
      ]}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <ThemedText 
              variant="h4" 
              style={styles.logo}
              onPress={() => handleNavItemPress('hero')}
            >
              {content.meta.siteName}
            </ThemedText>
          </View>
          
          {isMobile ? renderMobileMenu() : renderDesktopMenu()}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: 80,
    justifyContent: 'center',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: colors.background,
    zIndex: 99,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    height: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      }
    }),
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 16,
  },
  // Мобильное меню
  menuButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileMenu: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    overflow: 'hidden',
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  mobileMenuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  mobileMenuCta: {
    backgroundColor: colors.primary,
    margin: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default Header;