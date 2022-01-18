import { convertDirNameToFontName } from './converters';

export const getFontDirPath = (basePath, dirName) => (
  `${basePath}/${dirName}`
);

export const createFont = (dirName) => ({
  fontName: convertDirNameToFontName(dirName),
  fontTypes: {
    regular: {},
    italic: {},
    bold: {},
    italicBold: {},
  },
});
