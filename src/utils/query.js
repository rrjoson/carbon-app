export function serialize(data) {
  const entries = Object.entries(data);

  let query = '';
  entries.forEach(([key, values], index) => {
    if (values && values.length !== 0) {
      values.forEach((value) => {
        query = query.concat(`${key}=${value}&`);
      });
    }
  });

  return query;
}
