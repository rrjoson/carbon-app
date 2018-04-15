export function serialize(data) {
  const entries = Object.entries(data);

  let query = '';
  entries.forEach(([key, values], index) => {
    if (values && values.length !== 0) {
      values.forEach((value) => {
        // HACK
        if (key === 'dateRaised') {
          query = query.concat(`to=${value[0]}&from=${value[1]}&`);
        } else {
          query = query.concat(`${key}=${value}&`);
        }
      });
    }
  });

  return query;
}
