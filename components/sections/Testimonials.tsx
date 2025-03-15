// components/sections/Testimonials.tsx
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Section from '../layout/Section';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';
import { Ionicons } from '@expo/vector-icons';

const Testimonials = () => {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <Section
      title="Отзывы наших клиентов"
      subtitle="Что говорят продавцы, которые уже используют Bagaber"
      style={styles.section}
      id="testimonials"
    >
      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        {content.testimonials.stats.map((stat, index) => (
          <View key={index} style={styles.statBox}>
            <ThemedText 
              variant="h3" 
              color="primary" 
              style={styles.statValue}
              fontFamily="Montserrat-Bold"
            >
              {stat.value}
            </ThemedText>
            <ThemedText 
              variant="caption" 
              color="secondary" 
              style={styles.statLabel}
              fontFamily="Montserrat-Regular"
            >
              {stat.label}
            </ThemedText>
          </View>
        ))}
      </View>
      
      {/* Testimonial Cards */}
      <View style={styles.testimonialContainer}>
        {content.testimonials.items.map((testimonial, index) => (
          <View key={index} style={styles.testimonialRow}>
            <View style={styles.messageIcon}>
              <Ionicons name="chatbubble-ellipses" size={20} color="#fff" />
            </View>
            <View style={styles.testimonialContent}>
              <ThemedText 
                variant="body2" 
                style={styles.testimonialText}
                fontFamily="Montserrat-Regular"
              >
                "{testimonial.text}"
              </ThemedText>
              
              <View style={styles.authorContainer}>
                <View style={styles.avatar}>
                  <ThemedText 
                    variant="h4" 
                    color="white"
                    fontFamily="Montserrat-Medium"
                  >
                    {testimonial.author.charAt(0)}
                  </ThemedText>
                </View>
                <View style={styles.authorInfo}>
                  <ThemedText 
                    variant="subtitle2" 
                    fontFamily="Montserrat-SemiBold"
                  >
                    {testimonial.author}
                  </ThemedText>
                  <ThemedText 
                    variant="caption" 
                    color="secondary"
                    fontFamily="Montserrat-Regular"
                  >
                    {testimonial.company}
                  </ThemedText>
                </View>
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
    paddingVertical: 60,
    backgroundColor: colors.backgroundLight,
  },
  
  // Stats styling
  statsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 800,
    marginHorizontal: 'auto',
    marginBottom: 60,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    ...shadows.medium,
  },
  statBox: {
    alignItems: 'center',
    padding: 16,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 6,
    color: colors.primary,
  },
  statLabel: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
  
  // Testimonial styling
  testimonialContainer: {
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  testimonialRow: {
    marginBottom: 30,
    position: 'relative',
  },
  messageIcon: {
    position: 'absolute',
    left: -12,
    top: -12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  testimonialContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    marginLeft: 16,
    ...shadows.small,
    borderWidth: 1,
    borderColor: colors.border,
  },
  testimonialText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  
  // Media queries for larger screens
  '@media (min-width: 768px)': {
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statBox: {
      width: '33.33%',
      borderBottomWidth: 0,
      borderRightWidth: 1,
      borderRightColor: colors.border,
    },
    statBox3: {
      borderRightWidth: 0,
    },
  },
});

export default Testimonials;