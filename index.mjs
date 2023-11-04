import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

import fs from 'fs';
const content = fs.readFileSync('public/index.html', {encoding:'utf-8'});

export const handler = async (event) => {
  let dynamicHtml = content
  if(event.queryStringParameters){
  const command = new PutCommand({
    TableName: "formData",
    Item: {
    content_of:"form",
    userid:event.requestContext.requestId,
    formitems: event.queryStringParameters,
    },
  });
  //const response = await docClient.send(command);
  await docClient.send(command);
     if (event.queryStringParameters && event.queryStringParameters.name) {
    dynamicHtml = `<p>Hey ${event.queryStringParameters.name}!</p>`;
  }
  }
  const response = {
    statusCode: 200,
    body: content,
    headers:{
      "Content-Type":"text/html"
    }
  };
  console.log(response);
  return response;
};
