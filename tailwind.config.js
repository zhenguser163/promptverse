/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Notion / Linear style palette */
        bg:       { DEFAULT: '#F7F8FA', secondary: '#F4F4F5', white: '#FFFFFF' },
        border:   { DEFAULT: '#E5E7EB', light: '#F0F0F0' },
        text:     { primary: '#111827', secondary: '#374151', tertiary: '#6B7280', muted: '#9CA3AF' },
        accent:   { DEFAULT: '#2563EB', hover: '#1D4ED8', light: '#EFF6FF' },
        /* status colors */
        verified: { bg: '#ECFDF5', text: '#065F46', dot: '#10B981' },
        testing:  { bg: '#FFFBEB', text: '#92400E', dot: '#F59E0B' },
        draft:    { bg: '#F3F4F6', text: '#4B5563', dot: '#9CA3AF' },
        private:  { bg: '#EFF6FF', text: '#1E40AF', dot: '#3B82F6' },
        shared:   { bg: '#F5F3FF', text: '#5B21B6', dot: '#8B5CF6' },
      },
      fontSize: {
        '2xs': ['11px', '16px'],
      },
    },
  },
  plugins: [],
}
