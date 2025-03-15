// Основная цветовая схема приложения
export const colors = {
  primary: '#4E6AFF', // Основной цвет бренда
  secondary: '#6C63FF', // Вторичный цвет
  accent: '#FF5678', // Акцентный цвет
  
  // Фоновые цвета
  background: '#FFFFFF',
  backgroundLight: '#F8F9FE',
  backgroundDark: '#F0F2F5',
  
  // Текстовые цвета
  text: '#172B4D',
  textSecondary: '#5E6C84',
  
  // Цвета состояний
  success: '#4CAF50',
  error: '#FF5252',
  warning: '#FFC107',
  info: '#2196F3',
  
  // Границы и разделители
  border: '#E0E0E0',
  
  // Тени
  shadow: 'rgba(0, 0, 0, 0.1)',
  
  // Градиенты (для использования с LinearGradient)
  gradients: {
    primary: ['#4E6AFF', '#6C63FF'],
    secondary: ['#6C63FF', '#8E99FF'],
    accent: ['#FF5678', '#FF8C94'],
  },
};

// Тени для разных платформ
export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
};