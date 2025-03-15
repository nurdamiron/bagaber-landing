// components/sections/Contact.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Section from '../layout/Section';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors, shadows } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';

const Contact = () => {
  const { isMobile } = useResponsive();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  
  return (
    <Section
      title="Начните повышать свой рейтинг уже сейчас"
      subtitle="Первые 50 отзывов бесплатно"
      style={styles.section}
      id="contact"
    >
      <View style={styles.contactContainer}>
        <View style={styles.formContainer}>
          <ThemedText 
            variant="h5" 
            style={styles.formTitle}
            fontFamily="Montserrat-SemiBold"
          >
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
          
          <TouchableOpacity 
            style={styles.submitButton}
            activeOpacity={0.8}
          >
            <ThemedText 
              variant="button" 
              color="white"
              fontFamily="Montserrat-Medium"
            >
              Отправить сообщение
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 60,
    backgroundColor: colors.backgroundLight,
  },
  contactContainer: {
    maxWidth: 500,
    width: '100%',
    marginHorizontal: 'auto',
    marginTop: 30,
  },
  formContainer: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 30,
    ...shadows.medium,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formTitle: {
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    top: 14,
    zIndex: 1,
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
    borderColor: colors.border,
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
    justifyContent: 'center',
  },
  
  // Media queries for larger screens
  '@media (min-width: 768px)': {
    contactContainer: {
      maxWidth: 600,
    },
  },
});

export default Contact;