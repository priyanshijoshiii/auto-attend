// Auto-Attend color system
// Single source of truth — never hardcode hex values anywhere else

export const Colors = {
  // Backgrounds
  background: {
    primary: '#F5F5F0',    // main page background
    secondary: '#FFFFFF',  // cards, surfaces
    blue: '#EEF3FC',       // present badge bg, blue tinted surfaces
    yellow: '#FBF5D0',     // warning backgrounds
    danger: '#FCEBEB',     // absent badge bg
    muted: '#F1EFE8',      // holiday, neutral badge bg
  },

  // Brand
  brand: {
    blue: '#5B8FD4',       // primary — buttons, active states, links
    yellow: '#F0D44A',     // accent — highlights, warnings
  },

  // Text
  text: {
    primary: '#2C2C2A',    // headings, important content
    secondary: '#555553',  // body text
    muted: '#888780',      // subtitles, placeholders
    inverse: '#FFFFFF',    // text on dark/blue backgrounds
    blue: '#185FA5',       // text on blue badge
    yellow: '#633806',     // text on yellow badge
    danger: '#A32D2D',     // text on red badge
  },

  // Borders
  border: {
    light: '#E8E8E2',      // card borders, dividers
    medium: '#D4D4CC',     // input borders
  },

  // Attendance status — used everywhere
  status: {
    present: {
      bg: '#EEF3FC',
      text: '#185FA5',
      dot: '#5B8FD4',
    },
    absent: {
      bg: '#FCEBEB',
      text: '#A32D2D',
      dot: '#D94F4F',
    },
    cancelled: {
      bg: '#FBF5D0',
      text: '#633806',
      dot: '#F0D44A',
    },
    holiday: {
      bg: '#F1EFE8',
      text: '#5F5E5A',
      dot: '#AAAAAA',
    },
    ongoing: {
      bg: '#5B8FD4',
      text: '#FFFFFF',
      dot: '#5B8FD4',
    },
  },
} as const;

export type ColorKeys = typeof Colors;