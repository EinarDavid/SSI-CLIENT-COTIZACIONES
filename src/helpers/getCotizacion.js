

export const getCotizacion = async (id) => {
  const url = `http://localhost:4000/ssiCotizacion/${id}`
  const resp = await fetch(url);
  const data = await resp.json();

//   console.log(data);
  return data;
}
