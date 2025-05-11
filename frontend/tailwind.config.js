/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'satoshi-medium': ['Satoshi_Variable-Medium', 'Helvetica', 'sans-serif'],
                'satoshi-bold': ['Satoshi_Variable-Bold', 'Helvetica', 'sans-serif'],
            },
            colors: {
                'primary': '#00aaff',
                'light-blue': '#afd8ff',
                'text': {
                    'primary': '#222222',
                    'secondary': '#5a5a5a',
                    'tertiary': '#555555',
                    'placeholder': '#686868',
                },
                'brand-orange': '#f7881f',
            },
            boxShadow: {
                'card': '0px 0px 14px #d3d3d326',
                'button': '0px 0px 14px #5c5c5c26',
                'logo': '0px 0px 10.25px #94949440',
            },
        },
    },
    plugins: [],
} 