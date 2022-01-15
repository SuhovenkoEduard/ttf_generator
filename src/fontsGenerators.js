import { convertFileNameToFontName } from './helpers/converters';

export const generateFontsFromFile = (fileNames) => fileNames.map((fileName) => {
  const words = fileName.split('.');
  const [name] = words;
  return {
    fontName: convertFileNameToFontName(name),
    fontTypes: {
      regular: { fileName },
      ital: {},
      bold: {},
      italBold: {},
    },
  };
});
