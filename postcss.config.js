module.exports = {
  options: {
    postcssOptions: {
      plugins: ["postcss-preset-env"],
      plugins: [require("autoprefixer")({ grid: true })],
    },
  },
};
