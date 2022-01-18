import fs from 'fs';
import { createFont, getFontDirPath } from './helpers/generators';
import { FONT_TYPES_DICTIONARY } from './constants';

const addFontTypeToFont = (font, fontType) => ({
  ...font,
  fontTypes: {
    ...font.fontTypes,
    ...fontType,
  },
});

export const generateFontsFromDirs = (basePath, dirNames) => dirNames.map((dirName) => {
  const fontDirPath = getFontDirPath(basePath, dirName);
  let font = createFont(dirName);

  const fullFileNames = fs.readdirSync(fontDirPath);
  fullFileNames.forEach((fullFileName) => {
    const [typedFileName] = fullFileName.split('.');
    const [, fontTypeFormFile] = typedFileName.split('-');
    const fontType = FONT_TYPES_DICTIONARY[fontTypeFormFile];
    font = addFontTypeToFont(font, { [fontType]: { fileName: fullFileName } });
  });

  return font;
});
