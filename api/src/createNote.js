import uuid from "uuid";
import AWS from "aws-sdk";

import { createLogger } from "./utils/logger";

const logger = createLogger("createNote");

const dbClient = new AWS.DynamoDB.DocumentClient();

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

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

  try {
    const note = await dbClient.put(params).promise();
    logger.info("Note: ", { note });
  } catch (e) {
    // logger to go here
    logger.info("Error creating note: ", { error: e });
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(e)
    };
  }

  return {
    statusCode: 201,
    headers,
    body: JSON.stringify(params.Item)
  };
}
