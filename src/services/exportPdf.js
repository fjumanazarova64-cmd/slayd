import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Exports current presentation slides into high-quality PDF
 * Uses html2canvas on rendered slide element or prints cleanly
 */
export async function exportToPdf(slideElements, title = 'taqdimot') {
  if (!slideElements || slideElements.length === 0) {
    throw new Error('Slayd elementlari topilmadi');
  }

  // A4 Landscape is 297mm x 210mm
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pdfWidth = 297;
  const pdfHeight = 210;

  for (let i = 0; i < slideElements.length; i++) {
    const el = slideElements[i];
    
    const canvas = await html2canvas(el, {
      scale: 2, // 2x retina clarity
      useCORS: true,
      logging: false,
      backgroundColor: null
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    if (i > 0) {
      pdf.addPage('a4', 'landscape');
    }

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  }

  const safeName = `${title.replace(/[^a-zA-Z0-9_\u0400-\u04FF-]/g, '_')}.pdf`;
  pdf.save(safeName);
  return safeName;
}
