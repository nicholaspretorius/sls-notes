import uuid from "uuid";

import * as dynamoDb from "./libs/dynamoDbLib";
import { success, failure } from "./libs/responseLib";
import { createLogger } from "./utils/logger";

const logger = createLogger("createNote");

const notesTable = process.env.NOTES_TABLE;

export async function handler(event, context) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: notesTable,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDb.call("put", params);

    logger.info("Note: ", { note: params.Item });

    return success(params.Item);
  } catch (e) {
    logger.info("Error creating note: ", { error: e });

    return failure(e);
  }
}
