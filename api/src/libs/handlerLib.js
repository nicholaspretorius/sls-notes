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
          logger.error("Error retrieving note: ", { error: e, name: e.name, message: e.message });
          debug.flush(e);
          return [e.name, { error: e.message }];
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
