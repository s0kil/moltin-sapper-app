export async function requestApi(queryData) {
  // TODO : Do Not Hard Code API URL
  return fetch("http://0.0.0.0:8000/api", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: queryData
  })
    .then(response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      throw error;
    });
}
