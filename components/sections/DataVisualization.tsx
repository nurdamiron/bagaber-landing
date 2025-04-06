// components/sections/DataVisualization.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Section from '../layout/Section';
import ThemedText from '../ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadows } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';

// Sample data for visualizations
const RATING_IMPACT_DATA = {
  title: 'Влияние рейтинга на продажи',
  description: 'Процентный рост продаж в зависимости от рейтинга магазина',
  data: [
    { rating: '3.0★', salesIncrease: 0, color: '#FF5252' },
    { rating: '3.5★', salesIncrease: 15, color: '#FF9800' },
    { rating: '4.0★', salesIncrease: 35, color: '#FFEB3B' },
    { rating: '4.5★', salesIncrease: 62, color: '#8BC34A' },
    { rating: '4.9★', salesIncrease: 94, color: '#4CAF50' },
  ]
};

const REVIEW_STATS = [
  {
    title: '72%',
    description: 'покупателей проверяют отзывы перед покупкой',
    icon: 'search-outline',
    color: '#4E6AFF'
  },
  {
    title: '86%',
    description: 'доверяют отзывам так же, как личным рекомендациям',
    icon: 'people-outline',
    color: '#6C63FF'
  },
  {
    title: '3.2×',
    description: 'выше конверсия у магазинов с рейтингом 4.5+ звезд',
    icon: 'trending-up-outline',
    color: '#36B37E'
  },
  {
    title: '-67%',
    description: 'снижение возвратов благодаря честным отзывам',
    icon: 'arrow-down-outline',
    color: '#FF5678'
  }
];

const COMPARISON_TABLE_DATA = {
  headers: ['Показатель', 'Без сервиса', 'С Bagaber'],
  rows: [
    ['Среднее количество отзывов в месяц', '4-8', '30-50'],
    ['Рейтинг магазина', '3.2★ - 4.0★', '4.5★ - 5.0★'],
    ['Конверсия посетителей', '1.8%', '5.4%'],
    ['Время на работу с отзывами', '10-15 часов/нед', '1-2 часа/нед'],
    ['Скорость реакции на негатив', '1-2 дня', '15-30 минут']
  ]
};

const DataVisualization = () => {
  const { isMobile, width } = useResponsive();
  
  // Add web-specific styles through useEffect
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const styleElement = document.createElement('style');
      styleElement.id = 'data-visualization-styles';
      styleElement.textContent = `
        /* Chart animations */
        .chart-bar {
          transition: height 1s ease-out, opacity 0.8s ease-in;
        }
        
        /* Add hover effect to comparison table */
        .comparison-table tr:hover td {
          background-color: rgba(78, 106, 255, 0.05);
        }
        
        /* Comparison highlight animation */
        .comparison-highlight {
          position: relative;
          overflow: hidden;
        }
        
        .comparison-highlight:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          animation: shimmer 3s infinite;
        }
        
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `;
      
      // Add styles if they don't already exist
      if (!document.getElementById('data-visualization-styles')) {
        document.head.appendChild(styleElement);
      }
    }
  }, []);

  // Rendering the rating impact chart
  const renderRatingChart = () => {
    const maxSalesIncrease = Math.max(...RATING_IMPACT_DATA.data.map(item => item.salesIncrease));
    
    return (
      <View style={styles.chartContainer}>
        <ThemedText 
          variant="subtitle1" 
          style={styles.chartTitle}
          fontFamily="Montserrat-SemiBold"
        >
          {RATING_IMPACT_DATA.title}
        </ThemedText>
        
        <ThemedText 
          variant="body2" 
          color="secondary" 
          style={styles.chartDescription}
          fontFamily="Montserrat-Regular"
        >
          {RATING_IMPACT_DATA.description}
        </ThemedText>
        
        <View style={styles.chart}>
          {RATING_IMPACT_DATA.data.map((item, index) => {
            const barHeight = (item.salesIncrease / maxSalesIncrease) * 200;
            
            return (
              <View key={index} style={styles.barContainer}>
                <View 
                  style={[
                    styles.labelContainer, 
                    { backgroundColor: item.color }
                  ]}
                >
                  <ThemedText 
                    variant="caption" 
                    color="white"
                    fontFamily="Montserrat-SemiBold"
                  >
                    +{item.salesIncrease}%
                  </ThemedText>
                </View>
                
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: barHeight, 
                      backgroundColor: item.color 
                    }
                  ]}
                  className="chart-bar"
                />
                
                <ThemedText 
                  variant="body2" 
                  style={styles.barLabel}
                  fontFamily="Montserrat-Medium"
                >
                  {item.rating}
                </ThemedText>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  // Rendering the statistics cards
  const renderStatCards = () => {
    return (
      <View style={[
        styles.statsContainer,
        isMobile && styles.statsContainerMobile
      ]}>
        {REVIEW_STATS.map((stat, index) => (
          <View 
            key={index} 
            style={styles.statCard}
          >
            <View style={[
              styles.statIconContainer,
              { backgroundColor: `${stat.color}20` } // 20% opacity version of the color
            ]}>
              <Ionicons name={stat.icon} size={28} color={stat.color} />
            </View>
            
            <ThemedText 
              variant="h3" 
              style={[styles.statTitle, { color: stat.color }]}
              fontFamily="Montserrat-Bold"
            >
              {stat.title}
            </ThemedText>
            
            <ThemedText 
              variant="body2" 
              color="secondary" 
              style={styles.statDescription}
              fontFamily="Montserrat-Regular"
            >
              {stat.description}
            </ThemedText>
          </View>
        ))}
      </View>
    );
  };

  // Rendering the comparison table
  const renderComparisonTable = () => {
    return (
      <View style={styles.tableContainer}>
        <ThemedText 
          variant="subtitle1" 
          style={styles.tableTitle}
          fontFamily="Montserrat-SemiBold"
        >
          Сравнение показателей Kaspi-магазинов
        </ThemedText>
        
        {Platform.OS === 'web' ? (
          <table className="comparison-table" style={styles.webTable as any}>
            <thead>
              <tr>
                {COMPARISON_TABLE_DATA.headers.map((header, index) => (
                  <th key={index} style={styles.webTableHeader as any}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_TABLE_DATA.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex} 
                      style={[
                        styles.webTableCell as any,
                        cellIndex === 0 ? styles.webTableFirstColumn as any : null,
                        cellIndex === 2 ? styles.webTableHighlightColumn as any : null
                      ]}
                      className={cellIndex === 2 ? 'comparison-highlight' : ''}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // Native platform fallback
          <View style={styles.nativeTable}>
            {/* Table header row */}
            <View style={styles.nativeTableRow}>
              {COMPARISON_TABLE_DATA.headers.map((header, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.nativeTableCell, 
                    styles.nativeTableHeader,
                    index === 0 ? { flex: 2 } : { flex: 1 }
                  ]}
                >
                  <ThemedText 
                    variant="subtitle2"
                    fontFamily="Montserrat-SemiBold"
                  >
                    {header}
                  </ThemedText>
                </View>
              ))}
            </View>
            
            {/* Table data rows */}
            {COMPARISON_TABLE_DATA.rows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.nativeTableRow}>
                {row.map((cell, cellIndex) => (
                  <View 
                    key={cellIndex} 
                    style={[
                      styles.nativeTableCell,
                      cellIndex === 0 ? { flex: 2 } : { flex: 1 },
                      cellIndex === 2 ? styles.nativeTableHighlightCell : null
                    ]}
                  >
                    <ThemedText 
                      variant="body2"
                      fontFamily={cellIndex === 0 ? "Montserrat-Medium" : "Montserrat-Regular"}
                      color={cellIndex === 2 ? 'primary' : 'text'}
                    >
                      {cell}
                    </ThemedText>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <Section
      title="Доказанная эффективность отзывов"
      subtitle="Данные и статистика, демонстрирующие влияние отзывов на успех Kaspi-магазинов"
      style={styles.section}
      id="statistics"
      withGradient
      gradientColors={['#F8F9FE', '#FFFFFF']}
    >
      {/* Main container */}
      <View style={styles.container}>
        {/* Market statistics cards */}
        {renderStatCards()}
        
        {/* Two-column layout for web, stack for mobile */}
        <View style={[
          styles.twoColumnContainer,
          isMobile && styles.oneColumnContainer
        ]}>
          {/* Column 1: Rating impact chart */}
          <View style={[
            styles.column,
            isMobile && styles.columnMobile
          ]}>
            {renderRatingChart()}
          </View>
          
          {/* Column 2: Comparison table */}
          <View style={[
            styles.column,
            isMobile && styles.columnMobile
          ]}>
            {renderComparisonTable()}
          </View>
        </View>
        
        {/* Call to action */}
        <View style={styles.ctaContainer}>
          <ThemedText 
            variant="subtitle1" 
            style={styles.ctaText}
            fontFamily="Montserrat-SemiBold"
          >
            Повысьте рейтинг своего магазина и увеличьте продажи уже сегодня!
          </ThemedText>
          
          <TouchableOpacity 
            style={styles.ctaButton}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaGradient}
            >
              <ThemedText 
                variant="button" 
                color="white"
                fontFamily="Montserrat-SemiBold"
              >
                Попробовать бесплатно
              </ThemedText>
              <Ionicons 
                name="arrow-forward" 
                size={18} 
                color="#fff" 
                style={styles.ctaArrow} 
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Section>
  );
};

const getWebBoxShadow = (shadowObj) => {
  if (Platform.OS === 'web') {
    return {
      boxShadow: `0px ${shadowObj.shadowOffset?.height || 0}px ${shadowObj.shadowRadius || 0}px rgba(0, 0, 0, ${shadowObj.shadowOpacity || 0})`,
    };
  }
  return shadowObj;
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 70,
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  // Stats cards styles
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  statsContainerMobile: {
    flexDirection: 'column',
  },
  statCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
    width: '23%',
    ...(Platform.OS === 'web' 
      ? { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }
      : {
          ...shadows.medium,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 4,
        }
    ),
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      web: {
        width: 'calc(25% - 20px)',
      },
    }),
  },
  statIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statTitle: {
    fontSize: 28,
    marginBottom: 8,
  },
  statDescription: {
    textAlign: 'center',
  },
  // Two-column layout
  twoColumnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  oneColumnContainer: {
    flexDirection: 'column',
  },
  column: {
    width: '48%',
  },
  columnMobile: {
    width: '100%',
    marginBottom: 30,
  },
  // Chart styles
  chartContainer: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    ...(Platform.OS === 'web' 
      ? { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }
      : {
          ...shadows.medium,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 4,
        }
    ),
    borderWidth: 1,
    borderColor: colors.border,
  },
  chartTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  chartDescription: {
    textAlign: 'center',
    marginBottom: 30,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 250,
    marginTop: 20,
  },
  barContainer: {
    alignItems: 'center',
    width: '18%',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginBottom: 8,
  },
  labelContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
  barLabel: {
    textAlign: 'center',
  },
  // Table styles
  tableContainer: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    ...(Platform.OS === 'web' 
      ? { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }
      : {
          ...shadows.medium,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 4,
        }
    ),
    borderWidth: 1,
    borderColor: colors.border,
  },
  tableTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  // Web table styles
  webTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 14,
  },
  webTableHeader: {
    backgroundColor: '#F0F4FF',
    padding: 12,
    textAlign: 'left',
    fontWeight: '600',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: '#E6E8EC',
  },
  webTableCell: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#E6E8EC',
  },
  webTableFirstColumn: {
    fontWeight: '500',
  },
  webTableHighlightColumn: {
    color: colors.primary,
    fontWeight: '600',
  },
  // Native table styles
  nativeTable: {
    width: '100%',
  },
  nativeTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  nativeTableHeader: {
    backgroundColor: '#F0F4FF',
    paddingVertical: 12,
  },
  nativeTableCell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  nativeTableHighlightCell: {
    backgroundColor: 'rgba(78, 106, 255, 0.05)',
  },
  // CTA styles
  ctaContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  ctaText: {
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: 600,
  },
  ctaButton: {
    borderRadius: 30,
    overflow: 'hidden',
    ...(Platform.OS === 'web' 
      ? { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }
      : {
          ...shadows.medium,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 4,
        }
    ),
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  ctaArrow: {
    marginLeft: 8,
  },
});

export default DataVisualization;