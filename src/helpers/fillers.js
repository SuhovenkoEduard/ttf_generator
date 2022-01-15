export const getTypeOfExtension = (extension) => (extension === 'ttf' ? 'truetype' : 'opentype');

export const fillFileUrl = (name, extension) => (
  `../../../dist/fonts/${name}.${extension}`
);

export const fillFontCssTemplate = (fontName, { fileName, extension, type }) => `@font-face {
  font-family: "${fontName}";
  src: url("${fillFileUrl(fileName, extension)}") format("${type}");
}
`;
