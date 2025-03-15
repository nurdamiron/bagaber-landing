// components/sections/ProblemSolution.tsx
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Section from '../layout/Section';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';

const ProblemSolution = () => {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <Section
      title="Проблемы продавцов на Kaspi"
      subtitle="Наш сервис превращает проблемы в возможности"
      style={styles.section}
      id="problem-solution"
    >
      <View style={styles.columnContainer}>
        {/* Problems Column */}
        <View style={styles.column}>
          <View style={styles.columnHeader}>
            <View style={styles.columnHeaderIcon}>
              <Ionicons name="alert-circle" size={24} color="#fff" />
            </View>
            <ThemedText 
              variant="h4" 
              style={styles.columnTitle}
              fontFamily="Montserrat-SemiBold"
            >
              Проблемы
            </ThemedText>
          </View>
          
          {/* Problem Cards */}
          {content.problemSolution.problems.map((problem) => (
            <View key={problem.id} style={styles.card}>
              <View style={styles.cardIconContainer}>
                <Ionicons name={problem.icon} size={24} color={colors.error} />
              </View>
              <View style={styles.cardContent}>
                <ThemedText 
                  variant="subtitle1" 
                  style={styles.cardTitle}
                  fontFamily="Montserrat-SemiBold"
                >
                  {problem.title}
                </ThemedText>
                <ThemedText 
                  variant="body2" 
                  color="secondary" 
                  style={styles.cardDescription}
                  fontFamily="Montserrat-Regular"
                >
                  {problem.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
        
        {/* Solutions Column */}
        <View style={styles.column}>
          <View style={[styles.columnHeader, styles.solutionHeader]}>
            <View style={[styles.columnHeaderIcon, styles.solutionHeaderIcon]}>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
            </View>
            <ThemedText 
              variant="h4" 
              style={styles.columnTitle}
              fontFamily="Montserrat-SemiBold"
            >
              Решения
            </ThemedText>
          </View>
          
          {/* Solution Cards */}
          {content.problemSolution.solutions.map((solution) => (
            <View key={solution.id} style={styles.card}>
              <View style={[styles.cardIconContainer, styles.solutionIconContainer]}>
                <Ionicons name={solution.icon} size={24} color={colors.success} />
              </View>
              <View style={styles.cardContent}>
                <ThemedText 
                  variant="subtitle1" 
                  style={styles.cardTitle}
                  fontFamily="Montserrat-SemiBold"
                >
                  {solution.title}
                </ThemedText>
                <ThemedText 
                  variant="body2" 
                  color="secondary" 
                  style={styles.cardDescription}
                  fontFamily="Montserrat-Regular"
                >
                  {solution.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 60,
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 800,
    marginHorizontal: 'auto',
    marginTop: 30,
  },
  column: {
    width: '100%',
    marginBottom: 40,
  },
  columnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  columnHeaderIcon: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  solutionHeaderIcon: {
    backgroundColor: colors.success,
  },
  solutionHeader: {
    marginTop: 40,
  },
  columnTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  solutionIconContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  cardDescription: {
    lineHeight: 22,
  },
  
  // Media queries for larger screens
  '@media (min-width: 768px)': {
    columnContainer: {
      flexDirection: 'row',
    },
    column: {
      width: '48%',
    },
  },
});

export default ProblemSolution;