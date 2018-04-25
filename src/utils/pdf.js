import moment from 'moment';
import { imgData } from './../assets/logo';

export function generatePDF(data) {
  const pdfMake = window.pdfMake;

  var docDefinition = {
    content: [
      {
        canvas: [
          {
            type: 'rect',
            x: -40,
            y: -40,
            w: 600,
            h: 101,
            color: 'black',
          },
        ]
      },
      {
        columns: [
          {
            width: 42,
            image: imgData,
            margin: [0, 5, 0, 0],
          },
          {
            width: '*',
            text: [
              { text: 'Glo-cal Advanced Systems, Inc.\n', fontSize: 16, bold: true, color: 'white' },
              { text: 'Activity Report\n', fontSize: 14, bold: true, color: 'white' },
              { text: `${moment(data.timeIn).format('YYYY-MM-DD • hh:mma')} • ${Math.floor(moment.duration(moment(data.timeOuts).diff(moment(data.timeIn))).asHours())} hours`, fontSize: 10, color: 'white' },
            ]
          },
        ],
        margin: [0, -75, 0, 30]
      },
      {
        text: [
          { text: 'Client: ', fontSize: 12, bold: true },
          { text: data.client, fontSize: 12 }
        ],
        margin: [ 0, 25, 0, 5 ]
      },
      {
        text: [
          { text: 'Product Name: ', fontSize: 12, bold: true },
          { text: data.productName, fontSize: 12 }
        ],
        margin: [ 0, 0, 0, 5 ]
      },
      {
        text: [
          { text: 'Type of Activity: ', fontSize: 12, bold: true },
          { text: data.typeOfActivity, fontSize: 12 }
        ],
        margin: [ 0, 0, 0, 5 ]
      },
      {
        text: [
          { text: 'Assigned Systems Engineer: ', fontSize: 12, bold: true },
          { text: data.assignedSystemsEngineer.join(', '), fontSize: 12 }
        ],
        margin: [ 0, 0, 0, 5 ]
      },
      {
        text: [
          { text: 'Point Person: ', fontSize: 12, bold: true },
          { text: data.point_person, fontSize: 12 }
        ],
        margin: [ 0, 0, 0, 25 ]
      },
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 515,
            h: 1,
            color: '#f0f0f0',
          },
        ]
      },
      {
        text: [
          { text: 'Purpose of Visit\n', fontSize: 14, bold: true },
          { text: data.purposeOfVisit || '', fontSize: 12 }
        ],
        margin: [ 0, 25, 0, 25 ]
      },
      {
        text: [
          { text: 'Activity Performed\n', fontSize: 14, bold: true },
          { text: data.activityPerformed || '', fontSize: 12 }
        ],
        margin: [ 0, 0, 0, 25 ]
      },
      {
        text: [
          { text: 'Next Activity\n', fontSize: 14, bold: true },
          { text: data.nextActivity || '', fontSize: 12 }
        ],
        margin: [ 0, 0, 0, 25 ]
      },
      {
        text: [
          { text: 'Recommendation\n', fontSize: 14, bold: true },
          { text: data.recommendations || '', fontSize: 12 }
        ],
        margin: [ 0, 0, 0, 25 ]
      }
    ],
    defaultStyle: {
      columnGap: 20,
    },
  };

  pdfMake.createPdf(docDefinition).download('glo-cal.pdf');
}
