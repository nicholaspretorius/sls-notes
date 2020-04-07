import * as dynamoDb from "./libs/dynamoDbLib";
import { success, failure } from "./libs/responseLib";
import { createLogger } from "./utils/logger";

const logger = createLogger("deleteNote");

const notesTable = process.env.NOTES_TABLE;

export async function handler(event) {
  const params = {
    TableName: notesTable,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.noteId
    }
  };

  try {
    const results = await dynamoDb.call("delete", params);
    logger.info("Deleted note: ", { results });
    return success(200);
  } catch (e) {
    logger.error("Error deleting note: ", { error: e });
    return failure(400, { message: "Error deleting note" });
  }
}
