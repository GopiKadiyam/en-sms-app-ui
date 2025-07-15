module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        primary: 'var(--color-primary)',
        text: 'var(--color-text)',
        nav: 'var(--color-nav)',
        sidebar: 'var(--color-sidebar)',
        'sidebar-text': 'var(--color-sidebar-text)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
      },
    },
  },
  plugins: [],
}; 