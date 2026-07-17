export const Layout = {
  // Spacing scale — use multiples of 4
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  // Border radius — everything is pill-soft
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    pill: 100,   // fully rounded buttons and badges
    full: 9999,
  },

  // Screen padding — consistent across all screens
  screen: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 32,
  },

  // Card
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 0.5,
  },

  // Bottom tab bar height
  tabBar: {
    height: 64,
  },
} as const;