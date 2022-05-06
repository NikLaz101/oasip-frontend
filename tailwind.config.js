module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [{
            light: {
                ...require("daisyui/src/colors/themes")[
                    "[data-theme=garden]"
                ],
                "base-100": "#100057"
            },
        }, ],
    },
}