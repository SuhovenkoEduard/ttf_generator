export const convertFileNameToFontName = (fileName) => fileName
  .replace(/([A-Z])([a-z])/g, ' $1$2')
  .replace(/^[ ]/, '');

export const convertLinkFontNameToFontName = (linkFontName) => linkFontName
  .replace(/\+/g, ' ');
