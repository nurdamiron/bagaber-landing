import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Section from '../layout/Section';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';

const Contact = () => {
  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth < 768;
  
  // Состояние для формы
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  // Состояние для активного FAQ вопроса
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Обработчик изменения полей формы
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  
  // Переключение активного FAQ вопроса
  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };
  
  return (
    <Section
      title={content.contact.title}
      subtitle={content.contact.subtitle}
      style={styles.section}
      id="contact"
    >
      <View style={[styles.contentContainer, isMobile && styles.contentContainerMobile]}>
        {/* Форма обратной связи */}
        <View style={[styles.formContainer, isMobile && styles.formContainerMobile]}>
          <View style={styles.formInner}>
            <ThemedText variant="h4" style={styles.formTitle}>
              Свяжитесь с нами
            </ThemedText>
            
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ваше имя"
                placeholderTextColor={colors.textSecondary}
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Телефон"
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => handleInputChange('phone', text)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="chatbubble-outline" size={20} color={colors.textSecondary} style={[styles.inputIcon, styles.textareaIcon]} />
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Ваше сообщение"
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={formData.message}
                onChangeText={(text) => handleInputChange('message', text)}
              />
            </View>
            
            <TouchableOpacity style={styles.submitButton}>
              <ThemedText variant="button" color="white">
                Отправить сообщение
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* FAQ и контактная информация */}
        <View style={[styles.infoContainer, isMobile && styles.infoContainerMobile]}>
          {/* Контактная информация */}
          <View style={styles.contactInfoContainer}>
            <ThemedText variant="h4" style={styles.infoTitle}>
              Контактная информация
            </ThemedText>
            
            {content.contact.info.map((item, index) => (
                              <View key={index} style={styles.contactInfoItem}>
                <View style={styles.contactIconContainer}>
                  <Ionicons name={item.icon} size={20} color={colors.primary} />
                </View>
                <ThemedText variant="body1" style={styles.contactInfoText}>
                  {item.value}
                </ThemedText>
              </View>
            ))}
          </View>
          
          {/* FAQ */}
          <View style={styles.faqContainer}>
            <ThemedText variant="h4" style={styles.infoTitle}>
              Часто задаваемые вопросы
            </ThemedText>
            
            {content.contact.faq.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <TouchableOpacity 
                  style={styles.faqQuestion} 
                  onPress={() => toggleFaq(index)}
                >
                  <ThemedText variant="subtitle2" style={styles.faqQuestionText}>
                    {faq.question}
                  </ThemedText>
                  <Ionicons 
                    name={activeFaq === index ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color={colors.primary} 
                  />
                </TouchableOpacity>
                
                {activeFaq === index && (
                  <View style={styles.faqAnswer}>
                    <ThemedText variant="body2" color="secondary">
                      {faq.answer}
                    </ThemedText>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
      
      {/* Кнопка CTA */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity style={styles.ctaButton}>
          <ThemedText variant="button" color="white" style={styles.ctaButtonText}>
            {content.contact.cta}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 80,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  contentContainerMobile: {
    flexDirection: 'column',
  },
  // Стили для формы
  formContainer: {
    flex: 1,
    maxWidth: '48%',
  },
  formContainerMobile: {
    maxWidth: '100%',
    marginBottom: 40,
  },
  formInner: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 32,
    ...shadows.medium,
  },
  formTitle: {
    marginBottom: 24,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    top: 14,
  },
  textareaIcon: {
    top: 14,
  },
  input: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    paddingVertical: 12,
    paddingLeft: 40,
    paddingRight: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: 'transparent',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  textarea: {
    height: 120,
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  // Стили для информационного блока
  infoContainer: {
    flex: 1,
    maxWidth: '48%',
  },
  infoContainerMobile: {
    maxWidth: '100%',
  },
  infoTitle: {
    marginBottom: 24,
    fontWeight: '600',
  },
  // Контактная информация
  contactInfoContainer: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 32,
    marginBottom: 32,
    ...shadows.small,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfoText: {
    flex: 1,
  },
  // FAQ
  faqContainer: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 32,
    ...shadows.small,
  },
  faqItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundLight,
    paddingBottom: 16,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionText: {
    flex: 1,
    marginRight: 8,
  },
  faqAnswer: {
    marginTop: 12,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: colors.primary,
  },
  // CTA
  ctaContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 16,
  },
});

export default Contact;