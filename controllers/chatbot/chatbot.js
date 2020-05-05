const dialogflow=require('dialogflow');
const config =require('../../config/keys');
const structjson=require('../chatbot/structjson');

const sessionClient = new dialogflow.SessionsClient();
const sessionPath =sessionClient.sessionPath(config.googleProjectID,config.dialogFlowSessionID)

exports.textQuery= async(text,parameters)=>{
    console.log(parameters)
    const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: text,
            // The language used by the client (en-US)
            languageCode: config.dialogFlowSessionLanguageCode,
          },
        },
        queryParams:{
            payload:{
                data:parameters
            }
        }
      };
   let responses = await sessionClient.detectIntent(request);
   responses= await handleActions(responses)
   console.log(responses);
//   console.log('Detected intent');
//   const result = responses[0].queryResult;
//   console.log(`  Query: ${result.queryText}`);
//   console.log(`  Response: ${result.fulfillmentText}`);
//   if (result.intent) {
//     console.log(`  Intent: ${result.intent.displayName}`);
//   } else {
//     console.log(`  No intent matched.`);
//   }
  return responses;
}
exports.eventQuery= async(event,parameters)=>{
  console.log(parameters)
  const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name: event,
          parameters:structjson.jsonToStructProto(parameters),
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
    };
 let responses = await sessionClient.detectIntent(request);
 responses= await handleActions(responses)
 console.log(responses);
//   console.log('Detected intent');
//   const result = responses[0].queryResult;
//   console.log(`  Query: ${result.queryText}`);
//   console.log(`  Response: ${result.fulfillmentText}`);
//   if (result.intent) {
//     console.log(`  Intent: ${result.intent.displayName}`);
//   } else {
//     console.log(`  No intent matched.`);
//   }
return responses;
}
const handleActions =(responses)=>{
    return responses;
}


