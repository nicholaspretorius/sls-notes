import * as dynamoDb from "./libs/dynamoDbLib";
import { success, failure } from "./libs/responseLib";
import { createLogger } from "./utils/logger";

const logger = createLogger("getNotes");

const notesTable = process.env.NOTES_TABLE;

export async function handler(event) {
  const params = {
    TableName: notesTable,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const res = await dynamoDb.call("query", params);

    logger.info("Notes: ", res.Items);
    return success(200, res.Items);
  } catch (e) {
    logger.info("Error retrieving notes: ", { error: e });

    return failure(500, e);
  }
}
