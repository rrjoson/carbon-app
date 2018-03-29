export function serialize(data) {
  const entries = Object.entries(data);

  let query = '';
  entries.forEach(([key, value], index) => {
    query = query.concat(`${key}=${value}${index !== entries.length - 1 ? '&' : ''}`);
  });

  return query;
}
