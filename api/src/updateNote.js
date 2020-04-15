import handler from "./libs/handlerLib";
import * as dynamoDb from "./libs/dynamoDbLib";
// import { success, failure } from "./libs/responseLib";
import { createLogger } from "./utils/logger";

const logger = createLogger("createNote");

const notesTable = process.env.NOTES_TABLE;

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const userId = event.requestContext.identity.cognitoIdentityId;
  const noteId = event.pathParameters.noteId;

  const params = {
    TableName: notesTable,
    Key: {
      userId,
      noteId
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":content": data.content,
      ":attachment": data.attachment
    },
    ReturnValues: "ALL_NEW"
  };

  //try {
  const results = await dynamoDb.call("update", params);
  logger.info("Note updated: ", { results });

  if (!results.Attributes) {
    throw new Error("Error updating note");
  }

  return {
    body: results.Attributes,
    code: 200
  };
  //   return success(200, results.Attributes);
  // } catch (e) {
  //   logger.error("Error updating note: ", { error: e });
  //   return failure(500, { error: e });
  // }
});
