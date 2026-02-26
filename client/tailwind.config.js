/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f5f7fa',
                    100: '#e4e9f0',
                    200: '#cdddcf',
                    300: '#b0bcc2',
                    400: '#8c9fad',
                    500: '#6d8396',
                    600: '#55687a',
                    700: '#43515f',
                    800: '#343f4a',
                    900: '#2a313a',
                    DEFAULT: '#6d8396',
                },
                sage: {
                    50: '#f2f7f2',
                    100: '#e1ede1',
                    200: '#c5dbc5',
                    300: '#a1c2a1',
                    400: '#75a375',
                    500: '#568556',
                    DEFAULT: '#568556',
                },
                gold: {
                    50: '#fff9eb',
                    100: '#feeec7',
                    200: '#fddd8c',
                    300: '#fbc54b',
                    400: '#f9ac1b',
                    500: '#e38d0a',
                    DEFAULT: '#e38d0a',
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            }
        },
    },
    plugins: [],
}
