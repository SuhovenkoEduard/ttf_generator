import fs from 'fs';
import fetch from 'node-fetch';
import {
  FONTS_CSS, FONTS_FILENAMES_PATH, FONTS_JSON, GOOGLE_FONTS_LINKS_PATH,
} from './constants';
import { generateFontsFromFile } from './fontsGenerators';
import { writeOutputCss, writeOutputJson } from './fileWriters';
import { loadFontsLinksDictionary } from './helpers/loaders';

const fileNames = JSON.parse(fs.readFileSync(FONTS_FILENAMES_PATH).toString());

const checkFontUrl = async (url, patterns) => {
  try {
    const response = await fetch(url);
    if (!response.ok) return false;
    const css = await response.text();
    return patterns.every((pattern) => css.indexOf(pattern) !== -1);
  } catch (e) {
    console.log(e);
  }
  return false;
};

const fonts = generateFontsFromFile(fileNames);
const linksDictionary = loadFontsLinksDictionary(GOOGLE_FONTS_LINKS_PATH);
const linkedFonts = await Promise.all(fonts.map(async (font) => {
  const linkedFont = { ...font };
  if (linksDictionary[font.fontName]) {
    const regularLink = linksDictionary[font.fontName];
    linkedFont.fontTypes.regular.link = regularLink;
    const italUrl = `${regularLink}:ital@1`;
    const boldUrl = `${regularLink}:wght@700`;
    const italBoldUrl = `${regularLink}:ital,wght@1,700`;
    if (await checkFontUrl(italUrl, ['font-style: italic;'])) {
      linkedFont.fontTypes.ital.link = italUrl;
    }
    if (await checkFontUrl(boldUrl, ['font-weight: 700;'])) {
      linkedFont.fontTypes.bold.link = boldUrl;
    }
    if (await checkFontUrl(italBoldUrl, ['font-weight: 700;', 'font-style: italic;'])) {
      linkedFont.fontTypes.italBold.link = italBoldUrl;
    }
  }
  return linkedFont;
}));

writeOutputCss(FONTS_CSS, linkedFonts);
writeOutputJson(FONTS_JSON, linkedFonts);
// console.log(sliceOfFonts);

const currentFonts = linkedFonts.map((linkedFont) => {
  const { fontName, fontTypes } = linkedFont;
  const {
    regular, ital, bold, italBold,
  } = fontTypes;
  const { link: regularLink, fileName } = regular;
  const { link: italLink } = ital;
  const { link: boldLink } = bold;
  const { link: italBoldLink } = italBold;
  return {
    fontName,
    files: {
      regular: !!fileName,
    },
    links: {
      regular: !!regularLink,
      ital: !!italLink,
      bold: !!boldLink,
      italBold: !!italBoldLink,
    },
  };
}).filter(({ links }) => links.regular
  && !links.ital
  && links.bold
  && !links.italBold);
console.log(currentFonts, `\r\nCurrent fonts: ${currentFonts.length}`);
