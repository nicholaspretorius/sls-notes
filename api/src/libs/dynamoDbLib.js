import AWS from "aws-sdk";

export function call(action, params) {
  const dbClient = new AWS.DynamoDB.DocumentClient();

  return dbClient[action](params).promise();
}
