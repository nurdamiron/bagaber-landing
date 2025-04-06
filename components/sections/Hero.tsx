// components/sections/Hero.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';

const Hero = () => {
  const { isMobile, isTablet, width } = useResponsive();
  
  // Add web-specific styles and animations
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const styleElement = document.createElement('style');
      styleElement.id = '-hero-styles';
      styleElement.textContent = `
        /* Gradient animation for the CTA button */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animated-gradient {
          background: linear-gradient(90deg, #4E6AFF, #6C63FF, #FF5678, #6C63FF, #4E6AFF);
          background-size: 300% 300%;
          animation: gradientShift 8s ease infinite;
        }
        
        /* Floating animation for phone mockup */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .floating-phone {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Pulsating effect for the highlight badge */
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .pulsating-badge {
          animation: pulse 2s ease-in-out infinite;
        }
        
        /* Smooth hover effects */
        .hero-cta-button {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hero-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(78, 106, 255, 0.3);
        }
        
        .secondary-button {
          transition: all 0.3s ease;
        }
        
        .secondary-button:hover {
          background-color: rgba(78, 106, 255, 0.1);
        }
        
        /* Text highlight for mobile */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 36px !important;
            line-height: 44px !important;
          }
          
          .hero-subtitle {
            font-size: 18px !important;
          }
        }
      `;
      
      // Add styles if they don't already exist
      if (!document.getElementById('-hero-styles')) {
        document.head.appendChild(styleElement);
      }
    }
  }, []);

  // Handler for CTA buttons
  const handleButtonPress = (id: string) => {
    if (Platform.OS === 'web') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  // Render highlight badge
  const renderHighlightBadge = () => {
    return (
      <View 
        style={styles.highlightBadge}
        className="pulsating-badge"
      >
        <Ionicons name="star" size={16} color="#FFF" style={styles.badgeIcon} />
        <ThemedText 
          variant="caption" 
          color="white"
          fontFamily="Montserrat-SemiBold"
          style={styles.badgeText}
        >
          Первые 50 отзывов бесплатно!
        </ThemedText>
      </View>
    );
  };
  
  // Render smartphone mockup
  const renderPhoneMockup = () => {
    return (
      <View 
        style={styles.phoneMockupContainer}
        className="floating-phone"
      >
        {/* Phone frame */}
        <View style={styles.phoneFrame}>
          {/* Phone notch area */}
          <View style={styles.phoneNotch}>
            <View style={styles.phoneCamera} />
          </View>
          
          {/* Phone screen content */}
          <View style={styles.phoneScreen}>
            {/* Kaspi app header */}
            <View style={styles.kaspiHeader}>
              <ThemedText 
                variant="caption" 
                color="white"
                fontFamily="Montserrat-SemiBold"
              >
                Kaspi.kz
              </ThemedText>
            </View>
            
            {/* Rating card */}
            <View style={styles.ratingCard}>
              <View style={styles.ratingHeader}>
                <ThemedText 
                  variant="caption"
                  fontFamily="Montserrat-Medium"
                >
                  Рейтинг магазина
                </ThemedText>
                <View style={styles.ratingValue}>
                  <ThemedText 
                    variant="subtitle2"
                    fontFamily="Montserrat-Bold"
                    style={{ color: '#4CAF50' }}
                  >
                    4.9
                  </ThemedText>
                  <View style={styles.stars}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Ionicons 
                        key={star} 
                        name="star" 
                        size={12} 
                        color="#FFD700" 
                        style={{ marginLeft: 2 }} 
                      />
                    ))}
                  </View>
                </View>
              </View>
              
              <View style={styles.ratingSeparator} />
              
              <View style={styles.reviewsCount}>
                <ThemedText 
                  variant="caption"
                  fontFamily="Montserrat-Regular"
                  color="secondary"
                >
                  62 отзыва за последний месяц
                </ThemedText>
                <View style={styles.changeIndicator}>
                  <Ionicons name="arrow-up" size={10} color="#4CAF50" />
                  <ThemedText 
                    variant="caption"
                    fontFamily="Montserrat-SemiBold"
                    style={{ color: '#4CAF50', marginLeft: 2 }}
                  >
                    46%
                  </ThemedText>
                </View>
              </View>
            </View>
            
            {/* Message container */}
            <View style={styles.messageContainer}>
              <View style={styles.systemMessage}>
                <ThemedText 
                  variant="caption"
                  fontFamily="Montserrat-Regular"
                  color="secondary"
                  style={{ fontSize: 11 }}
                >
                  Bagaber отправил сообщение вашему клиенту:
                </ThemedText>
              </View>
              
              <View style={styles.clientMessage}>
                <ThemedText 
                  variant="caption" 
                  style={{ color: '#212121', fontSize: 11 }}
                  fontFamily="Montserrat-Regular"
                >
                  Здравствуйте! Благодарим за покупку в нашем магазине. Довольны ли Вы обслуживанием? Оставьте, пожалуйста, отзыв 😊
                </ThemedText>
              </View>
              
              <View style={styles.clientReply}>
                <ThemedText 
                  variant="caption" 
                  style={{ color: '#FFFFFF', fontSize: 11 }}
                  fontFamily="Montserrat-Regular"
                >
                  Да, всё отлично! Товар качественный, доставка быстрая. Обязательно оставлю 5 звезд! 👍
                </ThemedText>
              </View>
              
              <View style={styles.notificationCard}>
                <Ionicons name="notifications" size={16} color="#4E6AFF" style={{ marginRight: 8 }} />
                <ThemedText 
                  variant="caption"
                  fontFamily="Montserrat-Medium"
                  style={{ fontSize: 10 }}
                >
                  Новый отзыв 5★ получен от клиента
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
        
        {/* Decorative elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeCircle3} />
      </View>
    );
  };

  return (
    <View 
      style={styles.container} 
      id="hero"
    >
      <LinearGradient
        colors={['#F0F4FF', '#FBFCFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={[
          styles.content,
          isMobile && { paddingHorizontal: 20 }
        ]}>
          <View style={[
            styles.textContainer, 
            isMobile && styles.textContainerMobile
          ]}>
            {/* Highlight badge */}
            {renderHighlightBadge()}
            
            {/* Main heading */}
            <ThemedText 
              variant="h1" 
              style={[
                styles.title, 
                isMobile && { fontSize: 36, lineHeight: 44, textAlign: 'center' }
              ]}
              className="hero-title"
              fontFamily="Montserrat-Bold"
            >
              Повышайте рейтинг <Text style={styles.highlightText}>Kaspi-магазина</Text> автоматически
            </ThemedText>
            
            <ThemedText 
              variant="subtitle1" 
              color="secondary" 
              style={[
                styles.subtitle,
                isMobile && { textAlign: 'center', fontSize: 18, marginHorizontal: 10 }
              ]}
              className="hero-subtitle"
              fontFamily="Montserrat-Regular"
            >
              Получайте больше 5★ отзывов и увеличивайте продажи без лишних усилий с помощью интеллектуального сервиса Bagaber
            </ThemedText>
            
            <View style={[
              styles.buttonContainer, 
              isMobile && styles.buttonContainerMobile
            ]}>
              {/* Primary CTA button */}
              <TouchableOpacity 
                style={styles.primaryButton} 
                onPress={() => handleButtonPress('contact')}
                activeOpacity={0.9}
                className="hero-cta-button"
              >
                <LinearGradient
                  colors={['#4E6AFF', '#6C63FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                  className="animated-gradient"
                >
                  <ThemedText 
                    variant="button" 
                    color="white"
                    fontFamily="Montserrat-SemiBold"
                  >
                    {content.hero.cta}
                  </ThemedText>
                  <Ionicons name="arrow-forward" size={18} color="#fff" style={styles.buttonIcon} />
                </LinearGradient>
              </TouchableOpacity>
              
              {/* Secondary button */}
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => handleButtonPress('statistics')}
                activeOpacity={0.7}
                className="secondary-button"
              >
                <ThemedText 
                  variant="button" 
                  color="primary"
                  fontFamily="Montserrat-Medium"
                >
                  Посмотреть статистику
                </ThemedText>
              </TouchableOpacity>
            </View>
            
            {/* Client statistics */}
            <View style={[
              styles.statsContainer, 
              isMobile && styles.statsContainerMobile
            ]}>
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Ionicons name="people" size={16} color="#4E6AFF" />
                </View>
                <ThemedText 
                  variant="h5" 
                  color="primary"
                  fontFamily="Montserrat-Bold"
                >
                  200+
                </ThemedText>
                <ThemedText 
                  variant="caption" 
                  color="secondary"
                  fontFamily="Montserrat-Regular"
                >
                  Активных продавцов
                </ThemedText>
              </View>
              
              <View style={styles.statSeparator} />
              
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Ionicons name="star" size={16} color="#4E6AFF" />
                </View>
                <ThemedText 
                  variant="h5" 
                  color="primary"
                  fontFamily="Montserrat-Bold"
                >
                  +0.5★
                </ThemedText>
                <ThemedText 
                  variant="caption" 
                  color="secondary"
                  fontFamily="Montserrat-Regular"
                >
                  Средний рост рейтинга
                </ThemedText>
              </View>
              
              <View style={styles.statSeparator} />
              
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Ionicons name="time" size={16} color="#4E6AFF" />
                </View>
                <ThemedText 
                  variant="h5" 
                  color="primary"
                  fontFamily="Montserrat-Bold"
                >
                  10ч
                </ThemedText>
                <ThemedText 
                  variant="caption" 
                  color="secondary"
                  fontFamily="Montserrat-Regular"
                >
                  Экономия времени в неделю
                </ThemedText>
              </View>
            </View>
          </View>
          
          {/* Right side - Phone mockup */}
          {!isMobile && (
            <View style={styles.imageContainer}>
              {renderPhoneMockup()}
            </View>
          )}
        </View>
        
        {/* Decorative background elements */}
        <View style={[
          styles.shape, 
          styles.shape1, 
          isMobile && { width: 120, height: 120, right: '2%' }
        ]} />
        <View style={[
          styles.shape, 
          styles.shape2, 
          isMobile && { width: 100, height: 100, left: '5%' }
        ]} />
        <View style={[
          styles.shape, 
          styles.shape3, 
          isMobile && { width: 60, height: 60 }
        ]} />
      </LinearGradient>
    </View>
  );
};

// Define Text component for highlighting
const Text = ({ style, children }) => {
  return (
    <ThemedText 
      variant="h1" 
      style={[
        { 
          color: colors.primary,
          textDecorationLine: 'underline',
          textDecorationColor: 'rgba(78, 106, 255, 0.3)', 
          textDecorationStyle: 'solid',
        },
        style
      ]}
      fontFamily="Montserrat-Bold"
    >
      {children}
    </ThemedText>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 700,
  },
  gradient: {
    flex: 1,
    paddingTop: 100, // Increased to account for header
    paddingBottom: 60,
  },
  content: {
    flexDirection: 'row',
    maxWidth: 1200,
    width: '100%',
    paddingHorizontal: 20,
    marginHorizontal: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    maxWidth: 600,
    paddingRight: 40,
    position: 'relative',
  },
  textContainerMobile: {
    paddingRight: 0,
    alignItems: 'center',
  },
  highlightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignSelf: 'flex-start',
    marginBottom: 24,
    ...shadows.small,
  },
  badgeIcon: {
    marginRight: 6,
  },
  badgeText: {
    fontSize: 14,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    marginBottom: 20,
    color: '#172B4D',
    lineHeight: 56,
  },
  highlightText: {
    color: colors.primary,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 30,
    marginBottom: 32,
    color: '#5E6C84',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    alignItems: 'center',
  },
  buttonContainerMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  primaryButton: {
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 16,
    ...shadows.medium,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },
  // Stats styles
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    ...shadows.small,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsContainerMobile: {
    flexDirection: 'column',
    width: '100%',
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statSeparator: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: 16,
    ...Platform.select({
      web: {
        display: 'block',
        '@media (max-width: 768px)': {
          display: 'none',
        },
      },
    }),
  },
  statIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(78, 106, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  // Phone mockup styles
  imageContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneMockupContainer: {
    position: 'relative',
    alignItems: 'center',
    zIndex: 10,
  },
  phoneFrame: {
    width: 280,
    height: 550,
    backgroundColor: '#1F1F1F',
    borderRadius: 40,
    overflow: 'hidden',
    ...shadows.large,
    borderWidth: 8,
    borderColor: '#111',
  },
  phoneNotch: {
    height: 30,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 10,
  },
  phoneCamera: {
    width: 50,
    height: 6,
    backgroundColor: '#222',
    borderRadius: 3,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 12,
  },
  kaspiHeader: {
    height: 50,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  ratingCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...shadows.small,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginLeft: 6,
  },
  ratingSeparator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 10,
  },
  reviewsCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  messageContainer: {
    flex: 1,
  },
  systemMessage: {
    padding: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 12,
  },
  clientMessage: {
    padding: 12,
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    borderTopLeftRadius: 4,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  clientReply: {
    padding: 12,
    backgroundColor: '#4E6AFF',
    borderRadius: 12,
    borderTopRightRadius: 4,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    ...shadows.small,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  // Decorative elements
  decorativeCircle1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    top: -30,
    right: -50,
    zIndex: -1,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 86, 120, 0.15)',
    bottom: 50,
    left: -40,
    zIndex: -1,
  },
  decorativeCircle3: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(78, 106, 255, 0.1)',
    top: 100,
    left: -20,
    zIndex: -1,
  },
  // Background shape styles
  shape: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.1,
    zIndex: 0,
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