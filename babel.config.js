module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          _: 'lodash',
          '@': './src',
          '@assets': './src/assets',
          '@context': './src/context',
          '@screens': './src/screens',
          '@constants': './src/constants',
          '@components': './src/components',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
