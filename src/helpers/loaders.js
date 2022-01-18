import fs from 'fs';
import { convertLinkFontNameToFontName } from './converters';

export const loadFontsBaseLinksDictionary = (fontsLinksPath) => {
  const links = fs.readFileSync(fontsLinksPath)
    .toString()
    .split('\r\n')
    .map((line) => line.replace(/"/g, ''))
    .filter((line) => !!line);

  return Object.fromEntries(links.map((link) => {
    const linkFontName = link.substring(link.indexOf('=') + 1);
    const fontName = convertLinkFontNameToFontName(linkFontName);
    return [fontName, link];
  }));
};
