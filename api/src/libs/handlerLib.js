import * as debug from "./debugLib";
import { createLogger } from "./../utils/logger";

const logger = createLogger("handlerLib");

export default function handler(lambda) {
  return function(event, context) {
    return (
      Promise.resolve()
        // Start debugger
        .then(() => debug.init(event, context))
        // Run the Lambda
        .then(() => lambda(event, context))
        // On success
        .then(responseBody => [responseBody.code, responseBody.body])
        // On failure
        .catch(e => {
          // Print debug messages
          logger.error("Error retrieving note: ", { error: e });
          debug.flush(e);
          let statusCode = 500;
          if (e.name === "ApiError") {
            statusCode = e.statusCode;
          }
          return [statusCode, { error: e.message }];
        })
        // Return HTTP response
        .then(([statusCode, body]) => ({
          statusCode,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify(body)
        }))
        // Cleanup debugger
        .finally(debug.end)
    );
  };
}
