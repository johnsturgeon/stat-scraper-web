/** @type {import('tailwindcss').Config} */
module.exports = {
    content: {
        relative: true,
        files: [
            './templates/*.j2',
            './static/*.js'
        ]
    },
    theme: {
        extend: {
            backgroundImage: {
                'body': "url('/static/background.png')"
            },
            colors: {
                blue: {
                    disabled: '#0000ffaa',
                    enabled: '#0000ff'
                }
            }
        },
    },
    plugins: [],
}
