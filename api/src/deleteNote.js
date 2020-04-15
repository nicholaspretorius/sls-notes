import handler from "./libs/handlerLib";
import * as dynamoDb from "./libs/dynamoDbLib";
// import { success, failure } from "./libs/responseLib";
import { createLogger } from "./utils/logger";

const logger = createLogger("deleteNote");

const notesTable = process.env.NOTES_TABLE;

export const main = handler(async (event, context) => {
  const noteId = event.pathParameters.noteId;
  const params = {
    TableName: notesTable,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId
    }
  };

  const results = await dynamoDb.call("delete", params);
  logger.info("Deleted note: ", { results });

  return {
    body: {
      noteId,
      results
    },
    code: 200
  };
  // try {
  //   const results = await dynamoDb.call("delete", params);
  //   return success(200);
  // } catch (e) {
  //   logger.error("Error deleting note: ", { error: e });
  //   return failure(400, { message: "Error deleting note" });
  // }
});
