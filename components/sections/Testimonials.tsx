// components/sections/Testimonials.tsx
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Section from '../layout/Section';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';

const Testimonials = () => {
  const { isMobile, isTablet } = useResponsive();

  // Определяем ширину карточек с отзывами на основе типа устройства
  const getCardWidth = () => {
    if (isMobile) return '100%';
    if (isTablet) return '48%';
    return '31%';
  };

  return (
    <Section
      title={content.testimonials.title}
      subtitle={content.testimonials.subtitle}
      style={styles.section}
      id="testimonials"
    >
      {/* Статистические данные */}
      <View style={[styles.statsContainer, isMobile && styles.statsContainerMobile]}>
        {content.testimonials.stats.map((stat, index) => (
          <View key={index} style={[
            styles.statBox, 
            isMobile && styles.statBoxMobile
          ]}>
            <ThemedText 
              variant="h2" 
              color="primary" 
              style={[
                styles.statValue,
                isMobile && { fontSize: 32 }
              ]}
            >
              {stat.value}
            </ThemedText>
            <ThemedText variant="subtitle2" color="secondary" style={styles.statLabel}>
              {stat.label}
            </ThemedText>
          </View>
        ))}
      </View>

      {/* Карточки с отзывами */}
      <View style={[
        styles.testimonialCards, 
        isMobile && styles.testimonialCardsMobile,
        isTablet && { justifyContent: 'space-around' }
      ]}>
        {content.testimonials.items.map((testimonial) => (
          <View 
            key={testimonial.id} 
            style={[
              styles.testimonialCard,
              { width: getCardWidth() }
            ]}
          >
            <View style={styles.quoteIconContainer}>
              <Ionicons name="chatbubble" size={22} color={colors.primary} />
            </View>
            
            {/* Текст отзыва */}
            <ThemedText variant="body1" style={styles.testimonialText}>
              "{testimonial.text}"
            </ThemedText>
            
            {/* Информация об авторе */}
            <View style={styles.authorContainer}>
              <View style={styles.authorAvatar}>
                {testimonial.avatar ? (
                  <Image source={testimonial.avatar} style={styles.avatarImage} />
                ) : (
                  <Ionicons name="person" size={24} color={colors.primary} />
                )}
              </View>
              <View style={styles.authorInfo}>
                <ThemedText variant="subtitle2" style={styles.authorName}>
                  {testimonial.author}
                </ThemedText>
                <ThemedText variant="caption" color="secondary">
                  {testimonial.company}
                </ThemedText>
              </View>
            </View>
          </View>
        ))}
      </View>
      
      {/* Дополнительная информация */}
      <View style={styles.additionalInfo}>
        <ThemedText 
          variant="subtitle1" 
          color="secondary" 
          style={[
            styles.additionalInfoText,
            isMobile && { fontSize: 16, lineHeight: 24 }
          ]}
        >
          Присоединяйтесь к сотням довольных продавцов и начните улучшать свой рейтинг на Kaspi уже сегодня!
        </ThemedText>
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 80,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 40,
    marginHorizontal: '10%',
  },
  statsContainerMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  statBox: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    minWidth: '25%',
    marginBottom: 16,
  },
  statBoxMobile: {
    width: '80%',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
  },
  statLabel: {
    textAlign: 'center',
  },
  testimonialCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 40,
  },
  testimonialCardsMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  testimonialCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    position: 'relative',
    ...shadows.medium,
  },
  quoteIconContainer: {
    position: 'absolute',
    top: -15,
    left: 24,
    width: 36,
    height: 36,
    backgroundColor: colors.backgroundLight,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testimonialText: {
    marginTop: 16,
    marginBottom: 24,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontWeight: '600',
  },
  additionalInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  additionalInfoText: {
    textAlign: 'center',
    maxWidth: 700,
  },
});

export default Testimonials;