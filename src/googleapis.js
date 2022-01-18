import fetch from 'node-fetch';

export const checkFontUrl = async (url, patterns) => {
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

export const loadLinksFromGoogleApi = async (fonts, linksDictionary) =>
  // eslint-disable-next-line no-return-await, implicit-arrow-linebreak
  await Promise.all(fonts.map(async (font) => {
    const linkedFont = { ...font };
    if (linksDictionary[font.fontName]) {
      const regularLink = linksDictionary[font.fontName];
      linkedFont.fontTypes.regular.link = regularLink;
      const italUrl = `${regularLink}:ital@1`;
      const boldUrl = `${regularLink}:wght@700`;
      const italBoldUrl = `${regularLink}:ital,wght@1,700`;
      if (await checkFontUrl(italUrl, ['font-style: italic;'])) {
        linkedFont.fontTypes.italic.link = italUrl;
      }
      if (await checkFontUrl(boldUrl, ['font-weight: 700;'])) {
        linkedFont.fontTypes.bold.link = boldUrl;
      }
      if (await checkFontUrl(italBoldUrl, ['font-weight: 700;', 'font-style: italic;'])) {
        linkedFont.fontTypes.italicBold.link = italBoldUrl;
      }
    }
    return linkedFont;
  }));
