import * as dynamoDb from "./libs/dynamoDbLib";
import { success, failure } from "./libs/responseLib";
import { createLogger } from "./utils/logger";

const logger = createLogger("createNote");

const notesTable = process.env.NOTES_TABLE;

export async function handler(event, context) {
  const data = JSON.parse(event.body);
  const userId = event.requestContext.identity.cognitoIdentityId;
  const noteId = event.pathParameters.noteId;

  const note = await getNote(userId, noteId);

  // check for existing note
  if (!note) {
    return failure(404, { message: "Note not found" });
  } else {
    const params = {
      TableName: notesTable,
      Item: {
        userId,
        noteId,
        content: data.content,
        attachment: data.attachment,
        createdAt: Date.now()
      }
    };

    try {
      const res = await dynamoDb.call("put", params);
      logger.info("Note updated: ", { note: params.Item, results: res });
      return success(200, params.Item);
    } catch (e) {
      logger.error("Error updating note: ", { error: e });
      return failure(500, { error: e });
    }
  }
}

async function getNote(userId, noteId) {
  const params = {
    TableName: notesTable,
    Key: {
      userId,
      noteId
    }
  };

  return await dynamoDb.call("get", params);
}
