// components/layout/Footer.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '../ThemedText';
import { content } from '../../constants/content';
import { colors } from '../../constants/Colors';
import { useResponsive } from '../../hooks/useResponsive';

const Footer = () => {
  const { isMobile } = useResponsive();
  const currentYear = new Date().getFullYear();
  
  // Function to handle contact links
  const handleContactPress = (type: string, value: string) => {
    if (Platform.OS === 'web') {
      if (type === 'email') {
        window.location.href = `mailto:${value}`;
      } else if (type === 'phone') {
        window.location.href = `tel:${value}`;
      } else if (type === 'map') {
        window.open(`https://maps.google.com/?q=${encodeURIComponent(value)}`, '_blank');
      }
    } else {
      if (type === 'email') {
        Linking.openURL(`mailto:${value}`);
      } else if (type === 'phone') {
        Linking.openURL(`tel:${value}`);
      } else if (type === 'map') {
        Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(value)}`);
      }
    }
  };
  
  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        {/* Contact info */}
        <View style={styles.section}>
          <ThemedText 
            variant="h5" 
            style={styles.sectionTitle}
            fontFamily="Montserrat-SemiBold"
          >
            Контакты
          </ThemedText>
          
          <TouchableOpacity 
            style={styles.contactItem} 
            onPress={() => handleContactPress('email', 'info@bagaber.kz')}
          >
            <Ionicons name="mail-outline" size={18} color={colors.primary} style={styles.contactIcon} />
            <ThemedText 
              variant="body2" 
              style={styles.contactText}
              fontFamily="Montserrat-Regular"
            >
              info@bagaber.kz
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem} 
            onPress={() => handleContactPress('phone', '+7 (777) 123-45-67')}
          >
            <Ionicons name="call-outline" size={18} color={colors.primary} style={styles.contactIcon} />
            <ThemedText 
              variant="body2" 
              style={styles.contactText}
              fontFamily="Montserrat-Regular"
            >
              +7 (777) 123-45-67
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem} 
            onPress={() => handleContactPress('map', 'г. Алматы, ул. Сатпаева 90/20')}
          >
            <Ionicons name="location-outline" size={18} color={colors.primary} style={styles.contactIcon} />
            <ThemedText 
              variant="body2" 
              style={styles.contactText}
              fontFamily="Montserrat-Regular"
            >
              г. Алматы, ул. Сатпаева 90/20
            </ThemedText>
          </TouchableOpacity>
        </View>
        
        {/* Copyright & Links */}
        <View style={styles.bottom}>
          <ThemedText 
            variant="caption" 
            color="secondary"
            fontFamily="Montserrat-Regular"
          >
            © {currentYear} Bagaber. Все права защищены
          </ThemedText>
          
          <View style={styles.links}>
            <TouchableOpacity style={styles.link}>
              <ThemedText 
                variant="caption" 
                color="secondary"
                fontFamily="Montserrat-Regular"
              >
                О нас
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link}>
              <ThemedText 
                variant="caption" 
                color="secondary"
                fontFamily="Montserrat-Regular"
              >
                Политика конфиденциальности
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.backgroundLight,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  container: {
    maxWidth: 1200,
    width: '100%',
    marginHorizontal: 'auto',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 16,
    color: colors.text,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIcon: {
    marginRight: 10,
  },
  contactText: {
    color: colors.textSecondary,
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  links: {
    flexDirection: 'row',
    marginTop: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  link: {
    marginHorizontal: 10,
    marginVertical: 4,
  },
  
  // Media queries for larger screens
  '@media (min-width: 768px)': {
    bottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    links: {
      marginTop: 0,
    },
  },
});

export default Footer;