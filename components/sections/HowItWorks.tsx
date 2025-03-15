// components/sections/HowItWorks.tsx
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Section from '../layout/Section';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';

const HowItWorks = () => {
  const { isMobile, isTablet } = useResponsive();
  
  // Добавляем CSS для веб-версии
  React.useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const styleElement = document.createElement('style');
      styleElement.id = 'how-it-works-styles';
      styleElement.textContent = `
        /* Стили для контейнера шагов */
        .steps-container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          gap: 20px;
          position: relative;
        }
        
        /* Адаптивность для планшетов */
        @media (max-width: 992px) {
          .steps-container {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .step-card {
            width: calc(50% - 20px);
            margin-bottom: 30px;
          }
        }
        
        /* Адаптивность для мобильных */
        @media (max-width: 768px) {
          .steps-container {
            flex-direction: column;
            align-items: center;
          }
          
          .step-card {
            width: 100%;
            max-width: 350px;
          }
          
          .arrow-circle {
            display: none;
          }
        }
        
        /* Стили для карточки шага */
        .step-card {
          background-color: #FFFFFF;
          border-radius: 16px;
          padding: 30px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          border: 1px solid #E6E8EC;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
        }
        
        .step-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
          border-color: #D0D5DD;
        }
        
        /* Стили для круглого номера шага */
        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #F0F4FF;
          border: 2px solid #4E6AFF;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #4E6AFF;
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 24px;
        }
        
        /* Стили для иконки */
        .step-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: rgba(78, 106, 255, 0.08);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }
        
        /* Стили для круга со стрелкой */
        .arrow-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #F0F4FF;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 50%;
          right: -20px;
          transform: translateY(-50%);
          z-index: 10;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #E6E8EC;
        }
        
        /* Стили для CTA секции */
        .cta-container {
          background-color: #F8F9FE;
          border-radius: 16px;
          padding: 32px;
          margin-top: 40px;
          text-align: center;
          border: 1px solid #E6E8EC;
        }
        
        .cta-button {
          background-color: #4E6AFF;
          color: white;
          padding: 14px 28px;
          border-radius: 8px;
          display: inline-flex;
          margin-top: 24px;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
        }
        
        .cta-button:hover {
          background-color: #3A56E8;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(78, 106, 255, 0.3);
        }
      `;
      
      // Добавляем стили только если они еще не добавлены
      if (!document.getElementById('how-it-works-styles')) {
        document.head.appendChild(styleElement);
      }
    }
  }, []);
  
  return (
    <Section
      title="Как это работает"
      subtitle="Всего 4 простых шага для увеличения количества отзывов"
      style={styles.section}
      withGradient
      gradientColors={['#F8F9FE', '#FFFFFF']}
      id="how-it-works"
    >
      <View 
        style={styles.stepsContainer}
        className="steps-container"
      >
        {content.howItWorks.steps.map((step, index) => (
          <View 
            key={index} 
            style={styles.stepCard}
            className="step-card"
          >
            {/* Номер шага */}
            <View 
              style={styles.stepNumber}
              className="step-number"
            >
              <ThemedText style={styles.stepNumberText}>
                {step.number}
              </ThemedText>
            </View>
            
            {/* Иконка шага */}
            <View 
              style={styles.iconContainer}
              className="step-icon"
            >
              <Ionicons
                name={step.icon}
                size={32}
                color={colors.primary}
              />
            </View>
            
            {/* Заголовок шага */}
            <ThemedText 
              variant="h5" 
              style={styles.stepTitle}
              fontFamily="Montserrat-SemiBold"
            >
              {step.title}
            </ThemedText>
            
            {/* Описание шага */}
            <ThemedText 
              variant="body2" 
              color="secondary" 
              style={styles.stepDescription}
              fontFamily="Montserrat-Regular"
            >
              {step.description}
            </ThemedText>
            
            {/* Стрелка в круге (только между шагами, кроме последнего) */}
            {index < content.howItWorks.steps.length - 1 && !isMobile && (
              <View 
                style={styles.arrowCircle}
                className="arrow-circle"
              >
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color={colors.primary}
                />
              </View>
            )}
          </View>
        ))}
      </View>
      
      {/* CTA секция */}
      <View 
        style={styles.ctaContainer}
        className="cta-container"
      >
        <ThemedText 
          variant="subtitle1" 
          color="secondary" 
          style={styles.ctaText}
          fontFamily="Montserrat-Regular"
        >
          Начните автоматизировать сбор отзывов уже сегодня и увидите результаты в течение недели
        </ThemedText>
        
        <View 
          style={styles.ctaButton}
          className="cta-button"
        >
          <ThemedText 
            variant="button" 
            color="white"
            fontFamily="Montserrat-SemiBold"
          >
            Попробовать бесплатно
          </ThemedText>
        </View>
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 1200,
    marginHorizontal: 'auto',
    marginTop: 40,
    ...Platform.select({
      web: {
        // Для веб стили будут применяться через CSS
      },
      default: {
        // Для нативных платформ
        flexWrap: 'wrap',
      },
    }),
  },
  stepCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    ...shadows.medium,
    flex: 1,
    maxWidth: 280,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(78, 106, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(78, 106, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  stepDescription: {
    textAlign: 'center',
    lineHeight: 22,
  },
  arrowCircle: {
    position: 'absolute',
    right: -20,
    top: '50%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
    borderWidth: 1,
    borderColor: colors.border,
    zIndex: 10,
    transform: [{ translateY: -20 }],
  },
  ctaContainer: {
    backgroundColor: '#F8F9FE',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginTop: 40,
    borderWidth: 1,
    borderColor: colors.border,
    maxWidth: 700,
    marginHorizontal: 'auto',
    width: '100%',
  },
  ctaText: {
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    ...shadows.small,
  },
});

export default HowItWorks;