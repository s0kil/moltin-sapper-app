import { compactGraphQLQuery } from "./_compactGraphqlQuery.js";

/* https://github.com/yoshuawuyts/nanographql */

const getOperationName = /(query|mutation) ?([\w\d-_]+)? ?\(.*?\)? \{/;

export default function graphql(queryString) {
  queryString = Array.isArray(queryString) ? queryString.join("") : queryString;
  queryString = compactGraphQLQuery(queryString);

  const name = getOperationName.exec(queryString);

  return function(variables) {
    let data = { query: queryString };

    if (variables) data.variables = JSON.stringify(variables);

    if (name && name.length) {
      let operationName = name[2];
      if (operationName) data.operationName = name[2];
    }

    return JSON.stringify(data);
  };
}
