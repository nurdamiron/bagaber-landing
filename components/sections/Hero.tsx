import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors } from '../../constants/Colors';

// Hero section - главная секция лендинга
const Hero = () => {
  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth < 768;
  
  // Обработчик для кнопок
  const handleButtonPress = (id: string) => {
    if (Platform.OS === 'web') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <View style={styles.container} id="hero">
      <LinearGradient
        colors={['#F0F4FF', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.content}>
          <View style={[styles.textContainer, isMobile && styles.textContainerMobile]}>
            <ThemedText variant="h1" style={styles.title}>
              {content.hero.title}
            </ThemedText>
            
            <ThemedText 
              variant="subtitle1" 
              color="secondary" 
              style={styles.subtitle}
            >
              {content.hero.subtitle}
            </ThemedText>
            
            <View style={[styles.buttonContainer, isMobile && styles.buttonContainerMobile]}>
              <TouchableOpacity 
                style={styles.primaryButton} 
                onPress={() => handleButtonPress('contact')}
              >
                <ThemedText variant="button" color="white">
                  {content.hero.cta}
                </ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => handleButtonPress('features')}
              >
                <ThemedText variant="button" color="primary">
                  {content.hero.secondaryCta}
                </ThemedText>
                <Ionicons 
                  name="arrow-forward" 
                  size={18} 
                  color={colors.primary} 
                  style={styles.arrowIcon} 
                />
              </TouchableOpacity>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <ThemedText variant="h4" color="primary">200+</ThemedText>
                <ThemedText variant="caption" color="secondary">Активных продавцов</ThemedText>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <ThemedText variant="h4" color="primary">+0.5★</ThemedText>
                <ThemedText variant="caption" color="secondary">Средний рост рейтинга</ThemedText>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <ThemedText variant="h4" color="primary">10ч</ThemedText>
                <ThemedText variant="caption" color="secondary">Экономия времени в неделю</ThemedText>
              </View>
            </View>
          </View>
          
          {!isMobile && (
            <View style={styles.imageContainer}>
              {/* Здесь будет изображение или иллюстрация */}
              <View style={styles.imagePlaceholder}>
                <View style={styles.kaspiPhone}>
                  <View style={styles.phoneHeader}>
                    <View style={styles.phoneCamera} />
                  </View>
                  <View style={styles.phoneScreen}>
                    <View style={styles.ratingCard}>
                      <ThemedText variant="subtitle2" color="text">Рейтинг магазина</ThemedText>
                      <View style={styles.ratingStars}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <Ionicons key={star} name="star" size={20} color="#FFD700" />
                        ))}
                        <ThemedText variant="subtitle1" style={{marginLeft: 8}}>4.9</ThemedText>
                      </View>
                    </View>
                    <View style={styles.messageContainer}>
                      <View style={styles.message}>
                        <ThemedText variant="caption">Спасибо за покупку! Оставьте, пожалуйста, отзыв о нашем магазине</ThemedText>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
        
        {/* Декоративные элементы */}
        <View style={[styles.shape, styles.shape1]} />
        <View style={[styles.shape, styles.shape2]} />
        <View style={[styles.shape, styles.shape3]} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'web' ? '100vh' : 'auto',
    minHeight: 600,
    width: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 80, // Чтобы контент не перекрывался с хедером
  },
  content: {
    flexDirection: 'row',
    maxWidth: 1200,
    width: '100%',
    paddingHorizontal: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    maxWidth: 600,
    paddingRight: 40,
  },
  textContainerMobile: {
    paddingRight: 0,
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 48,
    fontWeight: '800',
  },
  subtitle: {
    marginBottom: 32,
    fontSize: 20,
    lineHeight: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  buttonContainerMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginRight: 16,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  arrowIcon: {
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  statItem: {
    marginRight: 20,
    alignItems: Platform.OS === 'web' ? 'flex-start' : 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginRight: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 300,
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kaspiPhone: {
    width: 280,
    height: 550,
    backgroundColor: '#FFF',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  phoneHeader: {
    height: 60,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneCamera: {
    width: 80,
    height: 20,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  ratingCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
    }),
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  messageContainer: {
    alignItems: 'flex-end',
  },
  message: {
    backgroundColor: '#E1F5FE',
    borderRadius: 16,
    borderBottomRightRadius: 4,
    padding: 16,
    maxWidth: '80%',
  },
  // Декоративные формы
  shape: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.1,
  },
  shape1: {
    width: 200,
    height: 200,
    backgroundColor: colors.primary,
    top: '10%',
    right: '5%',
  },
  shape2: {
    width: 150,
    height: 150,
    backgroundColor: colors.accent,
    bottom: '15%',
    left: '10%',
  },
  shape3: {
    width: 100,
    height: 100,
    backgroundColor: colors.secondary,
    top: '40%',
    left: '5%',
  },
});

export default Hero;