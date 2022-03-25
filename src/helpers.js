export const AJAX = async function (url, year, genre) {
  try {
    if (year || genre) {
      const res = await fetch(`${url}&year=${year}&with_genres=${genre}`);
      const { results } = await res.json();
      return results.slice(0, 10);
    }
    if (!year && !genre) {
      const res = await fetch(url);
      const results = await res.json();
      console.log(results);
    }
  } catch (err) {
    console.log(err);
  }
};
