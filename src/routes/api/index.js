import cache from "node-cache";
import { graphql } from "graphql";
import jsonParser from "fast-json-body";
import { resolvers } from "./_resolvers.js";
import { schema } from "./_schema.js";
import stringHash from "string-hash";
import json from "like-json";

// TODO : Consider LevelDB Cache | https://github.com/Level/level
const queryCache = new cache({
  stdTTL: 60 * 60 * 1 // cache for 1 Hour
});

export async function post(request, response, next) {
  jsonParser(request, (error, body) => {
    if (error) {
      console.log(error);

      response.writeHead(404, {
        "Content-Type": "application/json"
      });

      response.end(
        json.stringify({
          message: `Not found`
        })
      );
    }

    let variables =
      body.variables !== undefined ? JSON.parse(body.variables) : undefined;

    // Compute A Unique String Hash Based On GraphQL Query
    const queryHash = stringHash(body.query);

    queryCache.get(queryHash, (err, value) => {
      if (!err) {
        if (value == undefined) {
          graphql({
            schema: schema,
            source: body.query,
            variableValues: variables,
            operationName: body.operationName,
            rootValue: resolvers
          })
            .then(queryData => {
              const responseData = json.stringify(queryData);

              queryCache.set(queryHash, responseData, (error, success) => {
                if (error) console.log(error);
              });

              response.end(responseData);
            })
            .catch(error => console.log(error));
        } else {
          response.end(value);
        }
      }
    });
  });

  // queryCache.flushAll();
  // console.log(queryCache.getStats());

  // next();
}
