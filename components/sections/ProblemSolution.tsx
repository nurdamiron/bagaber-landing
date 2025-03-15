import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Section from '../layout/Section';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';

const ProblemSolution = () => {
  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth < 768;
  
  return (
    <Section
      title={content.problemSolution.title}
      subtitle={content.problemSolution.subtitle}
      style={styles.section}
      id="problem-solution"
    >
      <View style={[styles.container, isMobile && styles.containerMobile]}>
        {/* Колонка с проблемами */}
        <View style={[styles.column, isMobile && styles.columnMobile]}>
          <View style={styles.columnHeader}>
            <View style={[styles.iconCircle, styles.problemIconCircle]}>
              <Ionicons name="alert-circle" size={24} color={colors.error} />
            </View>
            <ThemedText variant="h4" style={styles.columnTitle}>Проблемы</ThemedText>
          </View>
          
          {content.problemSolution.problems.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={[styles.cardIcon, styles.problemIcon]}>
                <Ionicons name={item.icon} size={20} color={colors.error} />
              </View>
              <ThemedText variant="subtitle1" style={styles.cardTitle}>
                {item.title}
              </ThemedText>
              <ThemedText variant="body2" color="secondary" style={styles.cardDescription}>
                {item.description}
              </ThemedText>
            </View>
          ))}
        </View>
        
        {/* Центральная стрелка для десктопа */}
        {!isMobile && (
          <View style={styles.arrowContainer}>
            <View style={styles.arrowLine} />
            <View style={styles.arrowCircle}>
              <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
            </View>
          </View>
        )}
        
        {/* Колонка с решениями */}
        <View style={[styles.column, isMobile && styles.columnMobile]}>
          <View style={styles.columnHeader}>
            <View style={[styles.iconCircle, styles.solutionIconCircle]}>
              <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            </View>
            <ThemedText variant="h4" style={styles.columnTitle}>Решения</ThemedText>
          </View>
          
          {content.problemSolution.solutions.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={[styles.cardIcon, styles.solutionIcon]}>
                <Ionicons name={item.icon} size={20} color={colors.success} />
              </View>
              <ThemedText variant="subtitle1" style={styles.cardTitle}>
                {item.title}
              </ThemedText>
              <ThemedText variant="body2" color="secondary" style={styles.cardDescription}>
                {item.description}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 80,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginTop: 40,
  },
  containerMobile: {
    flexDirection: 'column',
  },
  column: {
    flex: 1,
    maxWidth: '45%',
  },
  columnMobile: {
    maxWidth: '100%',
    marginBottom: 40,
  },
  columnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  problemIconCircle: {
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
  },
  solutionIconCircle: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  columnTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    ...shadows.small,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  problemIcon: {
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
  },
  solutionIcon: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  cardTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  cardDescription: {
    lineHeight: 22,
  },
  // Стрелка между колонками
  arrowContainer: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  arrowLine: {
    height: 2,
    backgroundColor: colors.primary,
    width: '100%',
    position: 'absolute',
  },
  arrowCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },
});

export default ProblemSolution;