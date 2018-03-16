export function getSeverityValue(data) {
  if (data === 1) return '1 - Emergency';
  if (data === 2) return '2 - Critical';
  if (data === 3) return '3 - Major';
  if (data === 4) return '4 - Minor';

  return 'N/A';
}
