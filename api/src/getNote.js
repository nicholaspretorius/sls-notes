import handler from "./libs/handlerLib";
import * as dynamoDb from "./libs/dynamoDbLib";
import ApiError from "./libs/errors/ApiError";
// import { success, failure } from "./libs/responseLib";
import { createLogger } from "./utils/logger";

const logger = createLogger("getNote");

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
  logger.info("Results: ", { results: res });

  if (!res.Item) {
    // TODO: Create custom error class extending error to pass statusCode to handlerLib
    throw new ApiError("Item not found", 404);
  }

  return {
    body: res.Item,
    statusCode: 200
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
