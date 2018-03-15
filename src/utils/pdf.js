import * as JSPDF from 'jspdf';
import { imgData } from './../assets/logo';

export function generatePDF(data) {
  const document = new JSPDF.default();

  document.addImage(imgData, 'JPEG', 10, 10, 55, 55);
  document.text(data.activityPerformed, 10, 50);
  document.text(data.addres, 10, 60);
  document.save('glo-cal.pdf');
}
