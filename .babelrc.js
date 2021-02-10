module.exports = (api) => {
  const isTest = api.env('test');

  const antPlugins = [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
      },
      'import-antd',
    ],
    [
      'import',
      {
        libraryName: '@ant-design/icons',
        libraryDirectory: 'lib/icons', // TODO: esm
        camel2DashComponentName: false,
      },
      'import-antd-icons',
    ],
  ];

  return {
    plugins: isTest ? [] : antPlugins,
    presets: [
      '@parcel/babel-preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
  };
};
