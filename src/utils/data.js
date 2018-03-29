export function getSeverityValue(data) {
  if (Number(data) === 1) return '1 - Emergency';
  if (Number(data) === 2) return '2 - Critical';
  if (Number(data) === 3) return '3 - Major';
  if (Number(data) === 4) return '4 - Minor';

  return 'N/A';
}
