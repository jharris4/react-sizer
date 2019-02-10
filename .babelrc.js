
let presets;
if (process.env.BABEL_ENV === 'es') {
  presets = [["@babel/preset-env", { "modules": false }]];
}
else {
  presets = ["@babel/preset-env"];
}

const plugins = [
  "@babel/plugin-proposal-object-rest-spread",
  "@babel/plugin-transform-react-jsx"
];

module.exports = {
  presets,
  plugins
};