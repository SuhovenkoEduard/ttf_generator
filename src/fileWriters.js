import fs from 'fs';
import { fillFontCssTemplate } from './helpers/fillers';

export const writeOutputCss = (outputCssPath, fonts) => {
  if (fs.existsSync(outputCssPath)) {
    fs.truncateSync(outputCssPath);
  } else {
    fs.openSync(outputCssPath, 'w');
  }
  fonts.forEach(({ fontName, fontTypes }) => {
    const { regular } = fontTypes;
    const { fileInfo } = regular;
    fs.appendFileSync(outputCssPath, fillFontCssTemplate(fontName, fileInfo));
  });
};

export const writeOutputJson = (outputJsonPath, fonts) => {
  fs.writeFileSync(outputJsonPath, JSON.stringify(fonts, null, '  '));
};
