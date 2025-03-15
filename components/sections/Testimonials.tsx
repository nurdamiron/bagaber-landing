// components/sections/Testimonials.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Section from '../layout/Section';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';

const Testimonials = () => {
  const { isMobile, isTablet } = useResponsive();
  
  // Добавляем CSS стили только для web версии
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const styleElement = document.createElement('style');
      styleElement.id = 'testimonials-enhanced-styles';
      styleElement.textContent = `
        /* Стили для блока статистики */
        .stats-container {
          display: flex;
          justify-content: center;
          background-color: #FFFFFF;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          padding: 30px;
          margin-bottom: 50px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          border: 1px solid #E6E8EC;
          overflow: hidden;
        }
        
        .stats-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4E6AFF, #6C63FF);
          border-radius: 4px 4px 0 0;
        }
        
        .stat-item {
          text-align: center;
          padding: 0 20px;
          border-right: 1px solid #E6E8EC;
          flex: 1;
        }
        
        .stat-item:last-child {
          border-right: none;
        }
        
        .stat-value {
          font-size: 32px;
          font-weight: 700;
          color: #4E6AFF;
          margin-bottom: 8px;
          line-height: 1.2;
        }
        
        .stat-label {
          font-size: 14px;
          color: #5E6C84;
          white-space: nowrap;
        }
        
        /* Стили для карточек отзывов */
        .testimonials-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .testimonial-card {
          background-color: #FFFFFF;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          padding: 24px;
          position: relative;
          border: 1px solid #E6E8EC;
          transition: all 0.3s ease;
        }
        
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        
        .quote-icon {
          position: absolute;
          top: -15px;
          left: 24px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #4E6AFF;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 8px rgba(78, 106, 255, 0.3);
        }
        
        .testimonial-text {
          font-size: 16px;
          line-height: 1.6;
          color: #172B4D;
          font-style: italic;
          margin-bottom: 16px;
          padding-top: 10px;
        }
        
        .author-container {
          display: flex;
          align-items: center;
          border-top: 1px solid #E6E8EC;
          padding-top: 16px;
        }
        
        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #6C63FF;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 12px;
          color: #FFFFFF;
          font-weight: 600;
          font-size: 18px;
        }
        
        .author-info {
          flex: 1;
        }
        
        .author-name {
          font-weight: 600;
          font-size: 16px;
          color: #172B4D;
          margin-bottom: 2px;
        }
        
        .author-company {
          font-size: 14px;
          color: #5E6C84;
        }
        
        /* Медиа-запросы для адаптивности */
        @media (max-width: 768px) {
          .stats-container {
            flex-direction: column;
            padding: 20px;
          }
          
          .stat-item {
            padding: 15px 0;
            border-right: none;
            border-bottom: 1px solid #E6E8EC;
          }
          
          .stat-item:last-child {
            border-bottom: none;
          }
          
          .testimonial-card {
            padding: 20px;
          }
        }
      `;
      
      // Добавляем стили только если они еще не добавлены
      if (!document.getElementById('testimonials-enhanced-styles')) {
        document.head.appendChild(styleElement);
      }
    }
  }, []);

  return (
    <Section
      title="Отзывы наших клиентов"
      subtitle="Что говорят продавцы, которые уже используют Bagaber"
      style={styles.section}
      id="testimonials"
      withGradient
      gradientColors={['#FFFFFF', '#F8F9FE']}
    >
      {/* Блок со статистикой */}
      <View 
        style={styles.statsContainer}
        className="stats-container"
      >
        {content.testimonials.stats.map((stat, index) => (
          <View 
            key={index} 
            style={[
              styles.statItem,
              index < content.testimonials.stats.length - 1 && styles.statBorder
            ]}
            className="stat-item"
          >
            <ThemedText 
              style={styles.statValue}
              className="stat-value"
              fontFamily="Montserrat-Bold"
            >
              {stat.value}
            </ThemedText>
            <ThemedText 
              style={styles.statLabel}
              color="secondary"
              className="stat-label"
              fontFamily="Montserrat-Regular"
            >
              {stat.label}
            </ThemedText>
          </View>
        ))}
      </View>
      
      {/* Контейнер с отзывами */}
      <View 
        style={styles.testimonialsContainer}
        className="testimonials-container"
      >
        {content.testimonials.items.map((testimonial, index) => (
          <View 
            key={index} 
            style={styles.testimonialCard}
            className="testimonial-card"
          >
            {/* Иконка кавычки */}
            <View 
              style={styles.quoteIcon}
              className="quote-icon"
            >
              <Ionicons name="chatbubble-ellipses" size={20} color="#fff" />
            </View>
            
            {/* Текст отзыва */}
            <ThemedText 
              style={styles.testimonialText}
              className="testimonial-text"
              fontFamily="Montserrat-Regular"
            >
              "{testimonial.text}"
            </ThemedText>
            
            {/* Информация об авторе */}
            <View 
              style={styles.authorContainer}
              className="author-container"
            >
              {/* Аватар автора - первая буква имени */}
              <View 
                style={styles.authorAvatar}
                className="author-avatar"
              >
                <ThemedText 
                  color="white"
                  fontFamily="Montserrat-SemiBold"
                >
                  {testimonial.author.charAt(0)}
                </ThemedText>
              </View>
              
              {/* Имя и компания автора */}
              <View 
                style={styles.authorInfo}
                className="author-info"
              >
                <ThemedText 
                  variant="subtitle2" 
                  style={styles.authorName}
                  className="author-name"
                  fontFamily="Montserrat-SemiBold"
                >
                  {testimonial.author}
                </ThemedText>
                <ThemedText 
                  variant="caption" 
                  style={styles.authorCompany}
                  className="author-company"
                  color="secondary"
                  fontFamily="Montserrat-Regular"
                >
                  {testimonial.company}
                </ThemedText>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  // Стили для блока статистики
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 30,
    marginBottom: 50,
    width: '100%',
    maxWidth: 600,
    marginHorizontal: 'auto',
    ...shadows.medium,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  statBorder: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  // Стили для отзывов
  testimonialsContainer: {
    width: '100%',
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  testimonialCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    position: 'relative',
    ...shadows.medium,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quoteIcon: {
    position: 'absolute',
    top: -15,
    left: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },
  testimonialText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 16,
    paddingTop: 10,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  authorCompany: {
    fontSize: 14,
  },
});

export default Testimonials;