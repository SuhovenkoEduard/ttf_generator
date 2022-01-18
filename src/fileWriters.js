import fs from 'fs';
import {
  fillExternalSrc,
  fillFileSrc, fontCssFillers,
} from './helpers/fillers';
import { convertFontNameToDirName } from './helpers/converters';

export const writeOutputCss = (outputCssPath, fonts) => {
  if (fs.existsSync(outputCssPath)) {
    fs.truncateSync(outputCssPath);
  } else {
    fs.openSync(outputCssPath, 'w');
  }
  fonts.forEach(({ fontName, fontTypes }) => {
    const {
      regular, italic, bold, italicBold,
    } = fontTypes;
    const dirName = convertFontNameToDirName(fontName);
    const { fileName: regularFileName } = regular;
    const { fileName: italFileName = '' } = italic;
    const { fileName: boldFileName = '' } = bold;
    const { fileName: italBoldFileName = '' } = italicBold;

    const regularSrc = regularFileName ? fillFileSrc(dirName, regularFileName) : '';
    const italicSrc = italFileName ? fillFileSrc(dirName, italFileName) : '';
    const boldSrc = boldFileName ? fillFileSrc(dirName, boldFileName) : '';
    const italicBoldSrc = italBoldFileName ? fillFileSrc(dirName, italBoldFileName) : '';

    const srcs = {
      regular: regularSrc,
      italic: italicSrc || regularSrc,
      bold: boldSrc || regularSrc,
      italicBold: italicBoldSrc || boldSrc || italicSrc || regularSrc,
    };

    const sequences = [
      `/* fontName: ${fontName} */\r\n`,
      ...Object.entries(srcs).map(([fontType, fontSrc]) => (fontSrc ? fontCssFillers[fontType](fontName, fontSrc) : '')),
    ];
    sequences.forEach((sequence) => fs.appendFileSync(outputCssPath, sequence));
  });
};

export const writeOutputJson = (outputJsonPath, fonts) => {
  fs.writeFileSync(outputJsonPath, JSON.stringify(fonts, null, '  '));
};
