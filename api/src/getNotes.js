import handler from "./libs/handlerLib";
import * as dynamoDb from "./libs/dynamoDbLib";
// import { success, failure } from "./libs/responseLib";
import { createLogger } from "./utils/logger";

const logger = createLogger("getNotes");

const notesTable = process.env.NOTES_TABLE;

export const main = handler(async (event, context) => {
  const params = {
    TableName: notesTable,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  //try {
  const res = await dynamoDb.call("query", params);

  logger.info("Notes: ", res.Items);

  if (!res.Items) {
    throw new Error("No items found");
  }

  return {
    body: res.Items,
    code: 200
  };
  //   return success(200, res.Items);
  // } catch (e) {
  //   logger.info("Error retrieving notes: ", { error: e });

  //   return failure(500, e);
  // }
});
