export const getTypeOfExtension = (extension) => (extension === 'ttf' ? 'truetype' : 'opentype');

export const getFileData = (fileName) => {
  const words = fileName.split('.');
  const [name, extension] = words;
  return [name, extension, getTypeOfExtension(extension)];
};

export const fillFileUrl = (name, extension) => (
  `../../../dist/fonts/${name}.${extension}`
);

export const fillFileSrc = (fileName) => {
  const [name, extension, type] = getFileData(fileName);
  return `src: url("${fillFileUrl(name, extension)}") format("${type}");`;
};

export const fillExternalSrc = (url) => `src: url("${url}");`;

export const fillRegularFontCssTemplate = (fontName, src) => `@font-face {
  font-family: "${fontName}";
  ${src}
}
`;

export const fillItalicFontCssTemplate = (fontName, src) => `@font-face {
  font-family: "${fontName}";
  font-style: italic;
  ${src}
}
`;

export const fillBoldFontCssTemplate = (fontName, src) => `@font-face {
  font-family: "${fontName}";
  font-weight: bold;
  ${src}
}
`;

export const fillItalicBoldFontCssTemplate = (fontName, src) => `@font-face {
  font-family: "${fontName}";
  font-style: italic;
  font-weight: bold;
  ${src}
}
`;
