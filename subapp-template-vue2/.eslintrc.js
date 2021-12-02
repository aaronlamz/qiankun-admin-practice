module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "@vue/prettier"],
    rules: {
        "no-console": "off",
        "prettier/prettier": [
            "error",
            {
                "singleQuote": true,
                "trailingComma": "none",
                "tabWidth": 4,
                "semi": false
            }
        ],
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    globals: {
        "yxApp": true,
        "YX": true
    }
};