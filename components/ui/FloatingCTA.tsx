// components/ui/FloatingCTA.tsx
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated, Dimensions, Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ThemedText from '../ThemedText';
import { colors } from '../../constants/Colors';

interface FloatingCTAProps {
  text: string;
  onPress: () => void;
  showAfterScroll?: number; // Show after scrolling this many pixels
  hideOnSections?: string[]; // IDs of sections where the button should be hidden
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({
  text,
  onPress,
  showAfterScroll = 300,
  hideOnSections = [],
}) => {
  const [visible, setVisible] = useState(false);
  const opacity = new Animated.Value(0);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setDimensions(Dimensions.get('window'));
    };

    const subscription = Dimensions.addEventListener('change', handleResize);
    return () => {
      subscription.remove();
    };
  }, []);

  // Handle scroll visibility for web
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleScroll = () => {
        // Check if we should show based on scroll position
        const shouldShow = window.scrollY > showAfterScroll;
        
        // Check if we're in a section where we should hide the button
        let shouldHide = false;
        if (hideOnSections.length > 0) {
          hideOnSections.forEach((sectionId) => {
            const section = document.getElementById(sectionId);
            if (section) {
              const rect = section.getBoundingClientRect();
              // If the section is in view (with some buffer)
              if (rect.top < window.innerHeight && rect.bottom > 0) {
                shouldHide = true;
              }
            }
          });
        }

        // Determine final visibility
        const newVisible = shouldShow && !shouldHide;
        
        if (newVisible !== visible) {
          setVisible(newVisible);
          Animated.timing(opacity, {
            toValue: newVisible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [visible, showAfterScroll, hideOnSections]);

  // Don't render anything on native if not visible
  if (!visible && Platform.OS !== 'web') {
    return null;
  }

  // Apply styles based on platform and visibility
  const containerStyles = [
    styles.container,
    dimensions.width < 768 ? styles.mobilePosition : styles.desktopPosition,
    { opacity: Platform.OS === 'web' ? (visible ? 1 : 0) : 1 }
  ];

  // Use appropriate component for different platforms
  if (Platform.OS === 'web') {
    return (
      <View style={containerStyles}>
        <TouchableOpacity 
          onPress={onPress}
          style={styles.buttonContainer}
        >
          <LinearGradient
            colors={['#4E6AFF', '#6C63FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <ThemedText 
              variant="button" 
              color="white"
              fontFamily="Montserrat-SemiBold"
              style={styles.buttonText}
            >
              {text}
            </ThemedText>
            <Ionicons name="arrow-forward" size={18} color="#fff" style={styles.arrowIcon} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  } else {
    // For native platforms use Animated.View
    return (
      <Animated.View style={[containerStyles, { opacity }]}>
        <TouchableOpacity 
          onPress={onPress}
          activeOpacity={0.9}
          style={styles.buttonContainer}
        >
          <LinearGradient
            colors={['#4E6AFF', '#6C63FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <ThemedText 
              variant="button" 
              color="white"
              fontFamily="Montserrat-SemiBold"
              style={styles.buttonText}
            >
              {text}
            </ThemedText>
            <Ionicons name="arrow-forward" size={18} color="#fff" style={styles.arrowIcon} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
    ...Platform.select({
      web: {
        position: 'fixed',
      },
      default: {
        position: 'absolute',
      },
    }),
  },
  desktopPosition: {
    bottom: 40,
    right: 40,
  },
  mobilePosition: {
    bottom: 20,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(78, 106, 255, 0.3)',
      },
      ios: {
        shadowColor: '#4E6AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    marginRight: 8,
  },
  arrowIcon: {
    marginLeft: 8,
  },
});

export default FloatingCTA;