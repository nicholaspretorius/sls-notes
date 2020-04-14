import * as debug from "./debugLib";

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
          debug.flush(e);
          return [500, { error: e.message }];
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
