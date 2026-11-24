import pptxgen from 'pptxgenjs';
import { THEMES } from '../utils/templates';

/**
 * Exports presentation data to PPTX format using pptxgenjs
 * Fully editable slides for Microsoft PowerPoint, Google Slides, Keynote
 */
export async function exportToPptx(presentation) {
  const ppt = new pptxgen();
  ppt.layout = 'LAYOUT_16x9';
  ppt.author = 'SLIDE AI';
  ppt.company = 'SLIDE AI Platformasi';
  ppt.title = presentation.title || 'Taqdimot';

  const themeObj = THEMES.find(t => t.id === presentation.theme) || THEMES[0];
  const colors = themeObj.pptx;

  presentation.slides.forEach((slide, index) => {
    const pptSlide = ppt.addSlide();
    
    // Background color
    pptSlide.background = { color: colors.bgColor };

    // Watermark / Header brand
    pptSlide.addText('SLIDE AI', {
      x: 0.8,
      y: 0.4,
      fontSize: 10,
      color: colors.accentColor,
      bold: true,
      fontFace: 'Arial'
    });

    // Slide number
    pptSlide.addText(`${index + 1} / ${presentation.slides.length}`, {
      x: 11.5,
      y: 7.0,
      fontSize: 10,
      color: colors.bodyColor,
      align: 'right',
      fontFace: 'Arial'
    });

    if (slide.layout === 'title') {
      // Cover slide
      pptSlide.addText(slide.title, {
        x: 1.0,
        y: 2.2,
        w: 11.3,
        h: 2.0,
        fontSize: 36,
        color: colors.titleColor,
        bold: true,
        align: 'center',
        fontFace: 'Arial',
        valign: 'middle'
      });

      if (slide.subtitle) {
        pptSlide.addText(slide.subtitle, {
          x: 1.5,
          y: 4.4,
          w: 10.3,
          h: 1.2,
          fontSize: 18,
          color: colors.bodyColor,
          align: 'center',
          fontFace: 'Arial'
        });
      }

      if (slide.speaker) {
        pptSlide.addText(`Muallif: ${slide.speaker}`, {
          x: 1.5,
          y: 5.8,
          w: 10.3,
          h: 0.6,
          fontSize: 14,
          color: colors.accentColor,
          align: 'center',
          bold: true,
          fontFace: 'Arial'
        });
      }
    } else if (slide.layout === 'conclusion') {
      // Conclusion slide
      pptSlide.addText(slide.title || 'Xulosa', {
        x: 1.0,
        y: 1.2,
        w: 11.3,
        h: 1.0,
        fontSize: 32,
        color: colors.titleColor,
        bold: true,
        align: 'center',
        fontFace: 'Arial'
      });

      if (slide.content) {
        pptSlide.addText(slide.content, {
          x: 1.5,
          y: 2.4,
          w: 10.3,
          h: 1.0,
          fontSize: 18,
          color: colors.bodyColor,
          align: 'center',
          fontFace: 'Arial'
        });
      }

      if (slide.bullets && slide.bullets.length > 0) {
        const bulletTexts = slide.bullets.map(b => ({
          text: b,
          options: { fontSize: 16, color: colors.bodyColor, bullet: true, breakLine: true }
        }));
        pptSlide.addText(bulletTexts, {
          x: 2.0,
          y: 3.5,
          w: 9.3,
          h: 2.5,
          fontFace: 'Arial',
          margin: 0.1
        });
      }

      if (slide.footerText) {
        pptSlide.addText(slide.footerText, {
          x: 1.5,
          y: 6.2,
          w: 10.3,
          h: 0.8,
          fontSize: 20,
          color: colors.accentColor,
          bold: true,
          align: 'center',
          fontFace: 'Arial'
        });
      }
    } else {
      // Standard / Bullets / Split / Image-text slide
      pptSlide.addText(slide.title, {
        x: 0.8,
        y: 0.8,
        w: 11.5,
        h: 0.9,
        fontSize: 26,
        color: colors.titleColor,
        bold: true,
        fontFace: 'Arial'
      });

      if (slide.content) {
        pptSlide.addText(slide.content, {
          x: 0.8,
          y: 1.8,
          w: 11.5,
          h: 0.9,
          fontSize: 16,
          color: colors.bodyColor,
          fontFace: 'Arial'
        });
      }

      const bulletsStartY = slide.content ? 2.8 : 2.0;

      if (slide.bullets && slide.bullets.length > 0) {
        const bulletTexts = slide.bullets.map(b => ({
          text: b,
          options: { fontSize: 16, color: colors.bodyColor, bullet: true, breakLine: true }
        }));
        pptSlide.addText(bulletTexts, {
          x: 0.8,
          y: bulletsStartY,
          w: slide.highlightText ? 7.0 : 11.5,
          h: 4.2,
          fontFace: 'Arial',
          margin: 0.1
        });
      }

      // If slide has highlight or side card
      if (slide.highlightText) {
        pptSlide.addShape(ppt.ShapeType.roundRect, {
          x: 8.2,
          y: 2.2,
          w: 4.2,
          h: 3.8,
          fill: { color: colors.cardBgColor },
          line: { color: colors.accentColor, width: 1.5 },
          radius: 0.2
        });

        if (slide.highlightTitle) {
          pptSlide.addText(slide.highlightTitle, {
            x: 8.4,
            y: 2.5,
            w: 3.8,
            h: 0.6,
            fontSize: 16,
            color: colors.accentColor,
            bold: true,
            fontFace: 'Arial'
          });
        }

        pptSlide.addText(slide.highlightText, {
          x: 8.4,
          y: 3.2,
          w: 3.8,
          h: 2.5,
          fontSize: 14,
          color: colors.bodyColor,
          fontFace: 'Arial'
        });
      }
    }
  });

  const fileName = `${(presentation.title || 'taqdimot').replace(/[^a-zA-Z0-9_\u0400-\u04FF-]/g, '_')}.pptx`;
  await ppt.writeFile({ fileName });
  return fileName;
}
