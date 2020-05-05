const express = require('express');
const router = express.Router();
const chatbot =require('../controllers/chatbot/chatbot.js')

router.post('/df_text_query',async(req,res)=>{
  let responses=await chatbot.textQuery(req.body.text,req.body.parameters)

  res.send(responses[0].queryResult)
})
router.post('/df_event_query',async(req,res)=>{
  let responses=await chatbot.eventQuery(req.body.event,req.body.parameters)

  res.send(responses[0].queryResult)
})
module.exports = router;