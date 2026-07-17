import { Platform } from 'react-native';

export const Typography = {
  // Font families
  fonts: {
    regular: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    mono: Platform.select({
      ios: 'Courier New',
      android: 'monospace',
    }),
  },

  // Font sizes
  size: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    display: 30,
  },

  // Font weights
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
} as const;