import fs from 'fs';
import {
  fillBoldFontCssTemplate,
  fillExternalSrc,
  fillFileSrc, fillItalicBoldFontCssTemplate,
  fillItalicFontCssTemplate,
  fillRegularFontCssTemplate,
} from './helpers/fillers';

export const writeOutputCss = (outputCssPath, fonts) => {
  if (fs.existsSync(outputCssPath)) {
    fs.truncateSync(outputCssPath);
  } else {
    fs.openSync(outputCssPath, 'w');
  }
  fonts.forEach(({ fontName, fontTypes }) => {
    const {
      regular, ital, bold, italBold,
    } = fontTypes;
    const { fileName: regularFileName, link: regularLink } = regular;
    const { fileName: italFileName = regularFileName, link: italLink } = ital;
    const { fileName: boldFileName = regularFileName, link: boldLink } = bold;
    const { fileName: italBoldFileName = regularFileName, link: italBoldLink } = italBold;

    const regularSrc = regularLink ? fillExternalSrc(regularLink) : fillFileSrc(regularFileName);
    const italSrc = italLink ? fillExternalSrc(italLink) : fillFileSrc(italFileName);
    const boldSrc = boldLink ? fillExternalSrc(boldLink) : fillFileSrc(boldFileName);
    const italBoldSrc = italBoldLink
      ? fillExternalSrc(italBoldLink) : fillFileSrc(italBoldFileName);

    //fs.appendFileSync(outputCssPath, `/* fontName: ${fontName} */\r\n`);
    fs.appendFileSync(outputCssPath, fillRegularFontCssTemplate(fontName, fillFileSrc(regularFileName)));
    //fs.appendFileSync(outputCssPath, fillItalicFontCssTemplate(fontName, italSrc));
    //fs.appendFileSync(outputCssPath, fillBoldFontCssTemplate(fontName, boldSrc));
    //fs.appendFileSync(outputCssPath, fillItalicBoldFontCssTemplate(fontName, italBoldSrc));
  });
};

export const writeOutputJson = (outputJsonPath, fonts) => {
  fs.writeFileSync(outputJsonPath, JSON.stringify(fonts, null, '  '));
};
