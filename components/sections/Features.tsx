// components/sections/Features.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Section from '../layout/Section';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';

const Features = () => {
  const { isMobile, isTablet } = useResponsive();
  
  // Добавляем CSS для грид-системы только на веб
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      try {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
          /* Desktop grid styles */
          @media (min-width: 992px) {
            .features-grid {
              display: grid !important;
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 30px !important;
              width: 100% !important;
              max-width: 1200px !important;
              margin: 0 auto !important;
            }
            
            .feature-card {
              height: 100% !important;
              min-height: 280px !important;
              margin-bottom: 0 !important;
            }
          }
          
          /* Tablet grid styles */
          @media (min-width: 768px) and (max-width: 991px) {
            .features-grid {
              display: grid !important;
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 25px !important;
              width: 100% !important;
              max-width: 900px !important;
              margin: 0 auto !important;
            }
            
            .feature-card {
              height: 100% !important;
              min-height: 260px !important;
              margin-bottom: 0 !important;
            }
          }
          
          /* Basic styles for all screen sizes */
          .feature-card {
            transition: all 0.3s ease !important;
            background-color: ${colors.background} !important;
            border-radius: 16px !important;
            padding: 30px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Hover effect only for non-touch devices */
          @media (hover: hover) {
            .feature-card:hover {
              transform: translateY(-5px) !important;
              box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12) !important;
            }
          }
          
          .feature-icon {
            width: 80px !important;
            height: 80px !important;
            border-radius: 16px !important;
            background-color: rgba(78, 106, 255, 0.08) !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin-bottom: 24px !important;
          }
          
          /* Mobile specific adjustments */
          @media (max-width: 767px) {
            .feature-card {
              padding: 24px !important;
              margin-bottom: 20px !important;
              width: 100% !important;
            }
            
            .feature-icon {
              width: 70px !important;
              height: 70px !important;
              margin-bottom: 20px !important;
            }
          }
        `;
        document.head.appendChild(styleSheet);
      } catch (e) {
        console.warn('Ошибка при добавлении стилей грид-системы:', e);
      }
    }
  }, []);
  
  return (
    <Section
      title={content.features.title}
      subtitle={content.features.subtitle}
      withGradient
      gradientColors={['#FFFFFF', '#F8F9FE']}
      style={styles.section}
      id="features"
    >
      <View 
        style={[
          styles.featuresContainer,
          isMobile && styles.featuresContainerMobile
        ]}
        className={Platform.OS === 'web' ? 'features-grid' : undefined}
      >
        {content.features.items.map((feature) => (
          <View 
            key={feature.id} 
            style={[
              styles.featureCard,
              isMobile && styles.featureCardMobile,
            ]}
            className={Platform.OS === 'web' ? 'feature-card' : undefined}
          >
            <View 
              style={styles.iconContainer}
              className={Platform.OS === 'web' ? 'feature-icon' : undefined}
            >
              <Ionicons 
                name={feature.icon} 
                size={isMobile ? 28 : 32} 
                color={colors.primary} 
              />
            </View>
            
            <View style={styles.textContainer}>
              <ThemedText 
                variant="h5" 
                style={[
                  styles.featureTitle,
                  isMobile && styles.featureTitleMobile
                ]}
                fontFamily="Montserrat-SemiBold"
              >
                {feature.title}
              </ThemedText>
              
              <ThemedText 
                variant="body2" 
                color="secondary" 
                style={[
                  styles.featureDescription,
                  isMobile && styles.featureDescriptionMobile
                ]}
                fontFamily="Montserrat-Regular"
              >
                {feature.description}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  featuresContainerMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  featureCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: '30%', // Для нативных платформ
    ...shadows.medium,
    // Обеспечиваем корректные стили для нативных платформ
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  featureCardMobile: {
    width: '100%',
    padding: 24,
    marginBottom: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(78, 106, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  textContainer: {
    flex: 1, // Чтобы текст занимал всё доступное пространство
  },
  featureTitle: {
    marginBottom: 16,
    fontSize: 20,
    lineHeight: 28,
  },
  featureTitleMobile: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 12,
  },
  featureDescription: {
    lineHeight: 24,
  },
  featureDescriptionMobile: {
    lineHeight: 22,
    fontSize: 14,
  },
});

export default Features;