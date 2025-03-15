import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { content } from '../../constants/content';
import { colors } from '../../constants/Colors';
import ThemedText from '../ThemedText';

const Footer = () => {
  // Функция для открытия ссылок
  const handleLinkPress = (url: string) => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        {/* Верхняя часть футера */}
        <View style={styles.topSection}>
          <View style={styles.companyInfo}>
            <ThemedText variant="h4" style={styles.logo}>
              {content.meta.siteName}
            </ThemedText>
            <ThemedText variant="body2" color="textSecondary" style={styles.description}>
              {content.meta.description}
            </ThemedText>
            <View style={styles.socialIcons}>
              {content.footer.social.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.socialIcon}
                  onPress={() => handleLinkPress(item.url)}
                >
                  <Ionicons name={item.icon} size={24} color={colors.primary} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.linksContainer}>
            <View style={styles.linksColumn}>
              <ThemedText variant="subtitle1" style={styles.linkTitle}>
                Сервис
              </ThemedText>
              <TouchableOpacity onPress={() => {}}>
                <ThemedText variant="body2" color="textSecondary" style={styles.linkItem}>
                  Функции
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <ThemedText variant="body2" color="textSecondary" style={styles.linkItem}>
                  Тарифы
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <ThemedText variant="body2" color="textSecondary" style={styles.linkItem}>
                  Отзывы
                </ThemedText>
              </TouchableOpacity>
            </View>

            <View style={styles.linksColumn}>
              <ThemedText variant="subtitle1" style={styles.linkTitle}>
                Компания
              </ThemedText>
              {content.footer.links.map((link, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => handleLinkPress(link.url)}
                >
                  <ThemedText variant="body2" color="textSecondary" style={styles.linkItem}>
                    {link.title}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.linksColumn}>
              <ThemedText variant="subtitle1" style={styles.linkTitle}>
                Контакты
              </ThemedText>
              {content.contact.info.map((item, index) => (
                <View key={index} style={styles.contactItem}>
                  <Ionicons name={item.icon} size={16} color={colors.primary} style={styles.contactIcon} />
                  <ThemedText variant="body2" color="textSecondary">
                    {item.value}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Разделительная линия */}
        <View style={styles.divider} />

        {/* Нижняя часть футера */}
        <View style={styles.bottomSection}>
          <ThemedText variant="caption" color="textSecondary">
            {content.footer.copyright}
          </ThemedText>
          <View style={styles.bottomLinks}>
            {content.footer.links.slice(0, 2).map((link, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => handleLinkPress(link.url)}
                style={styles.bottomLink}
              >
                <ThemedText variant="caption" color="textSecondary">
                  {link.title}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.surface,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  container: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  topSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  companyInfo: {
    flex: 1,
    minWidth: 300,
    marginBottom: 30,
    paddingRight: 40,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 16,
  },
  description: {
    marginBottom: 20,
    lineHeight: 22,
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  linksContainer: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  linksColumn: {
    minWidth: 160,
    marginBottom: 30,
  },
  linkTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  linkItem: {
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIcon: {
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 20,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  bottomLinks: {
    flexDirection: 'row',
  },
  bottomLink: {
    marginLeft: 20,
  },
});

export default Footer;