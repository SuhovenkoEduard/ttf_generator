export const hasFontSrc = (fontSrcs) => !!fontSrcs.fileName || !!fontSrcs.link;

export const collectByFontType = (fonts, requiredFontTypes) => {
  const filteredFonts = fonts
    .filter(({ fontTypes }) => Object.entries(fontTypes)
      .every(([fontType, fontSrcs]) => (hasFontSrc(fontSrcs)
        ? requiredFontTypes.includes(fontType)
        : !requiredFontTypes.includes(fontType))));
  return {
    fontNames: filteredFonts.map((filteredFont) => filteredFont.fontName),
    count: filteredFonts.length,
    requiredFontTypes,
  };
};
