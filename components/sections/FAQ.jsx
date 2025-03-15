// components/sections/FAQ.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Hardcoded FAQ items
const FAQ_ITEMS = [
  {
    question: "Безопасно ли использовать сервис?",
    answer: "Да, сервис использует официальный API и не нарушает правил Kaspi. Мы соблюдаем все требования по безопасности и конфиденциальности."
  },
  {
    question: "Будут ли мои клиенты довольны?",
    answer: "99% клиентов реагируют положительно на внимательный сервис. Наши шаблоны составлены профессиональными маркетологами и не выглядят как спам."
  },
  {
    question: "Как быстро я увижу результаты?",
    answer: "Большинство клиентов отмечают увеличение количества отзывов уже в первую неделю использования сервиса. Заметный рост рейтинга обычно происходит в течение 2-4 недель."
  },
  {
    question: "Можно ли настроить сервис под свой бренд?",
    answer: "Да, вы можете полностью персонализировать все шаблоны сообщений, добавить свой логотип и использовать фирменные цвета в коммуникации с клиентами."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <View style={styles.section} id="faq">
      <View style={styles.container}>
        <Text style={styles.title}>
          Часто задаваемые вопросы
        </Text>
        <Text style={styles.subtitle}>
          Все, что вы хотели знать о нашем сервисе
        </Text>
        
        <View style={styles.faqContainer}>
          {FAQ_ITEMS.map((faq, idx) => (
            <View key={`faq-${idx}`} style={[
              styles.faqItem,
              activeIndex === idx && styles.faqItemActive
            ]}>
              <TouchableOpacity
                style={styles.faqQuestion}
                onPress={() => toggleFAQ(idx)}
                activeOpacity={0.7}
              >
                <Text style={styles.questionText}>
                  {faq.question}
                </Text>
                <View style={styles.iconContainer}>
                  <Ionicons 
                    name={activeIndex === idx ? "remove-circle" : "add-circle"} 
                    size={22} 
                    color="#4E6AFF" 
                  />
                </View>
              </TouchableOpacity>
              
              {activeIndex === idx && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.answerText}>
                    {faq.answer}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
        
        <View style={styles.ctaContainer}>
          <Text style={styles.ctaText}>
            Остались вопросы? Свяжитесь с нами напрямую
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            activeOpacity={0.8}
          >
            <Text style={styles.ctaButtonText}>
              Связаться с нами
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 70,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FE',
    width: '100%',
  },
  container: {
    maxWidth: 1200,
    width: '100%',
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#172B4D',
    fontFamily: 'Montserrat-Bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#5E6C84',
    fontFamily: 'Montserrat-Regular',
  },
  faqContainer: {
    maxWidth: 800,
    width: '100%',
    marginHorizontal: 'auto',
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E6E8EC',
    overflow: 'hidden',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  faqItemActive: {
    borderColor: '#4E6AFF',
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    flex: 1,
    paddingRight: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#172B4D',
    fontFamily: 'Montserrat-SemiBold',
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faqAnswer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#E6E8EC',
  },
  answerText: {
    lineHeight: 24,
    fontSize: 14,
    color: '#5E6C84',
    fontFamily: 'Montserrat-Regular',
  },
  ctaContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  ctaText: {
    textAlign: 'center',
    marginBottom: 16,
    maxWidth: 600,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#5E6C84',
    fontFamily: 'Montserrat-Regular',
  },
  ctaButton: {
    backgroundColor: '#4E6AFF',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    fontFamily: 'Montserrat-Medium',
  },
});

export default FAQ;