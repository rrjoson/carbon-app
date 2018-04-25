export function serialize(data) {
  const entries = Object.entries(data);

  let query = '';
  entries.forEach(([key, values], index) => {
    if (values && values.length !== 0) {
      values.forEach((value) => {
        // HACK
        if (key === 'dateRaised') {
          query = query.concat(`from=${value[1]}&to=${value[0]}&`);
        } else if (key === 'timePeriod') {
          query = query.concat(`from=${value[0]}&to=${value[1]}&`);
        } else {
          query = query.concat(`${key}=${value}&`);
        }
      });
    }
  });

  return query;
}
