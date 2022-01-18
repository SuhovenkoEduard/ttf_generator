import fs from 'fs';
import {
  FONTS_CSS, FONT_DIR_NAMES_PATH, FONTS_JSON, FONTS_BASE_PATH,
} from './constants';
import { generateFontsFromDirs } from './fontsGenerators';
import { writeOutputCss, writeOutputJson } from './fileWriters';
import { collectByFontType } from './statsCollectors';

const fontDirNames = JSON.parse(fs.readFileSync(FONT_DIR_NAMES_PATH).toString());

const fonts = generateFontsFromDirs(FONTS_BASE_PATH, fontDirNames);
// const linksDictionary = loadFontsBaseLinksDictionary(GOOGLE_FONTS_LINKS_PATH);

writeOutputCss(FONTS_CSS, fonts);
writeOutputJson(FONTS_JSON, fonts);

const configurations = {
  regular: 'regular',
  bold: 'bold',
  italic: 'italic',
  italicBold: 'italicBold',
};

console.log(collectByFontType(fonts, [
  configurations.regular,
  configurations.bold,
  configurations.italic,
  configurations.italicBold,
]));
