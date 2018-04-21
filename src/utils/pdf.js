import * as JSPDF from 'jspdf';
import { imgData } from './../assets/logo';
import moment from 'moment';

export function generatePDF(data) {
  console.warn(data)
  const document = new JSPDF.default({ unit: 'pt', lineHeight: 1.75 });

  document.setFont("helvetica");

  document.rect(0, 0, 595, 101, 'F');

  document.addImage(imgData, 'JPEG', 38, 30, 43, 42);
  document.setTextColor(255, 255, 255);

  document.setFontSize(16);
  document.setFontStyle('bold');

  document.text('Glo-cal Advanced Systems, Inc.', 91, 41);

  document.setFontSize(10);

  document.setFontStyle('bold');
  document.text('Activity Report', 91, 59);

  document.setFontStyle('normal');
  document.text(`${moment(data.timeIn).format('YYYY-MM-DD • hh:mma')} • ${Math.floor(moment.duration(moment(data.timeOuts).diff(moment(data.timeIn))).asHours())} hours`, 91, 74);

  document.setTextColor(0, 0, 0);

  document.setFontSize(10);
  document.setFontStyle('bold');
  document.text('Client:', 40, 133);
  document.text('Product Name:', 40, 153);
  document.text('Type of Activity:', 40, 173);
  document.text('Assigned Systems Engineer:', 40, 193);
  document.text('Point Person:', 40, 213);

  document.setFontStyle('normal');
  document.text(data.client, 75, 133);
  document.text(data.productName, 114, 153);
  document.text(data.typeOfActivity, 120, 173);
  document.text(data.assignedSystemsEngineer.join(', '), 182, 193);
  document.text(data.point_person, 109, 213);

  document.setFillColor(240, 240, 240);
  document.rect(40, 228, 520, 1.5, 'F');

  document.setFontSize(14);
  document.setFontStyle('bold');
  document.text('Purpose of Visit', 40, 253);

  let height = 253 + 20;

  const purposeOfVisit = data.purposeOfVisit || '';
  const formattedPurposeOfVisit = document.splitTextToSize(purposeOfVisit, 750);

  document.setFontSize(10);
  document.setFontStyle('normal');
  document.text(formattedPurposeOfVisit, 40, height);

  if (data.purposeOfVisit.split(/\r\n|\r|\n/).length === 1) {
    height = height + Math.ceil(purposeOfVisit.length / 5) + 20;
  } else {
    height = height + (data.purposeOfVisit.split(/\r\n|\r|\n/).length * 20) + 20
  }

  document.setFontSize(14);
  document.setFontStyle('bold');
  document.text('Activity Performed', 40, height);

  const activityPerformed = data.activityPerformed || '';
  const formattedActivityPerformed = document.splitTextToSize(activityPerformed, 750)

  document.setFontSize(10);
  document.setFontStyle('normal');
  height = height + 20;
  document.text(formattedActivityPerformed, 40, height);

  if (data.activityPerformed.split(/\r\n|\r|\n/).length === 1) {
    height = height + Math.ceil(activityPerformed.length / 5) + 20;
  } else {
    height = height + (data.activityPerformed.split(/\r\n|\r|\n/).length * 20) + 20
  }

  document.setFontSize(14);
  document.setFontStyle('bold');
  document.text('Next Activity', 40, height);

  const nextActivity = data.nextActivity || '';
  const formattedNextActivity = document.splitTextToSize(nextActivity, 750);

  document.setFontSize(10);
  document.setFontStyle('normal');
  height = height + 20;
  document.text(formattedNextActivity, 40, height);

  if (data.nextActivity.split(/\r\n|\r|\n/).length === 1) {
    height = height + Math.ceil(nextActivity.length / 5) + 20;
  } else {
    height = height + (data.nextActivity.split(/\r\n|\r|\n/).length * 20) + 20
  }

  document.setFontSize(14);
  document.setFontStyle('bold');
  document.text('Recommendation', 40, height);

  const recommendation = data.recommendations || '';
  const formattedRecommendation = document.splitTextToSize(recommendation, 750);

  document.setFontSize(10);
  document.setFontStyle('normal');
  height = height + 20;
  document.text(formattedRecommendation, 40, height);

  document.save('glo-cal.pdf');
}
