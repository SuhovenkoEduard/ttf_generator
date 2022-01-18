export const getFileFormatByExtension = (extension) => (extension === 'ttf' ? 'truetype' : 'opentype');

export const getFileData = (fileName) => {
  const words = fileName.split('.');
  const [name, extension] = words;
  return [name, extension, getFileFormatByExtension(extension)];
};

export const fillUrl = (path) => (
  `url("${path}")`
);

export const fillFileFormat = (format) => (
  `format("${format}")`
);

export const fillFilePath = (dirName, fileName, extension) => (
  `../../../dist/fonts/${dirName}/${fileName}.${extension}`
);

export const fillFileSrc = (dirName, fullFileName) => {
  const [fileName, extension, format] = getFileData(fullFileName);
  return `${fillUrl(fillFilePath(dirName, fileName, extension))} ${fillFileFormat(format)}`;
};

export const fillExternalSrc = (url) => `${fillUrl(url)}`;

export const fontCssFillers = {
  regular: (fontName, src) => `@font-face {
  font-family: "${fontName}";
  src: ${src};
}
`,
  italic: (fontName, src) => `@font-face {
  font-family: "${fontName}";
  font-style: italic;
  src: ${src};
}
`,
  bold: (fontName, src) => `@font-face {
  font-family: "${fontName}";
  font-weight: bold;
  src: ${src};
}
`,
  italicBold: (fontName, src) => `@font-face {
  font-family: "${fontName}";
  font-style: italic;
  font-weight: bold;
  src: ${src};
}
`,
};
