import handler from "./libs/handlerLib";
import * as dynamoDb from "./libs/dynamoDbLib";
// import { success, failure } from "./libs/responseLib";
// import { createLogger } from "./utils/logger";

// const logger = createLogger("getNote");

const notesTable = process.env.NOTES_TABLE;

// export async function handler(event) {
export const main = handler(async (event, context) => {
  const params = {
    TableName: notesTable,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.noteId
    }
  };

  const res = await dynamoDb.call("get", params);

  if (!res.Item) {
    throw new Error("Item not found", 404);
  }

  return {
    body: res.Item,
    code: 200
  };
});

// try {
//   const res = await dynamoDb.call("get", params);

//   if (res.Item) {
//     return success(200, res.Item);
//   } else {
//     return failure(404, { message: "Note not found." });
//   }
// } catch (e) {
//   logger.error("Error retrieving note: ", { error: e });
//   return failure(500, e);
// }
// }
