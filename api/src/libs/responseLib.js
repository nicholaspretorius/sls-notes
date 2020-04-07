export function success(statusCode, body) {
  return buildResponse(statusCode, body);
}

export function failure(statusCode, body) {
  return buildResponse(statusCode, body);
}

function buildResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
}
