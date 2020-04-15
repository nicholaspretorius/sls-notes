import handler from "./libs/handlerLib";
import uuid from "uuid";

import * as dynamoDb from "./libs/dynamoDbLib";
// import { success, failure } from "./libs/responseLib";
import { createLogger } from "./utils/logger";

const logger = createLogger("createNote");

const notesTable = process.env.NOTES_TABLE;

export const main = handler(async (event, context) => {
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

  const res = await dynamoDb.call("put", params);
  logger.info("Res: ", { result: res });

  return {
    body: params.Item,
    code: 201
  };
  // try {
  //   await dynamoDb.call("put", params);

  //   logger.info("Note: ", { note: params.Item });

  //   return success(201, params.Item);
  // } catch (e) {
  //   logger.info("Error creating note: ", { error: e });

  //   return failure(500, e);
  // }
});
