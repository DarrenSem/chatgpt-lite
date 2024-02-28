// import OpenAI from "chatgpt-lite"; // ESM.mjs
const OpenAI = require("chatgpt-lite"); // CJS.js

const main = async () => {

  // similar to official API, but no need for `new OpenAI({ ... });`
  const openai = OpenAI({
    // for minimal size it does NOT currently default to setting apiKey = process.env["OPENAI_API_KEY"]
    apiKey: "api_key_can_not_be_omitted"
  });
  console.log("openai:", openai);
  // openai: {
  //   apiKey: 'sk-QiyAbcDe1FGhIjk23l4mnOpQ5RstuV67w89x012y2z34Ab7C',
  //   create: [AsyncFunction: create]
  // }


  // same signature/result as `await openai.chat.completions.create({ ... });`
  const completion = await openai.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo", // model: "gpt-4-turbo-preview", etc.
  });
  console.log("completion:", completion);
  // completion: {
  //   id: 'chatcmpl-8xAbCdEFghI4JklmNopQrs7TuvwxYz',
  //   object: 'chat.completion',
  //   created: 1709167986,
  //   model: 'gpt-3.5-turbo-0125',
  //   choices: [
  //     {
  //       index: 0,
  //       message: [Object],
  //       logprobs: null,
  //       finish_reason: 'stop'
  //     }
  //   ],
  //   usage: { prompt_tokens: 12, completion_tokens: 5, total_tokens: 17 },
  //   system_fingerprint: 'fp_86123a45b6'
  // }

  const {usage} = completion;
  console.log("usage:", usage);
  // usage: { prompt_tokens: 12, completion_tokens: 5, total_tokens: 17 }

  const message = completion.error || completion.choices[0].message;
  console.log("message:", message);
  // message: { role: 'assistant', content: 'This is a test.' }


  const latin = await openai.create( {
    model: "gpt-4",
    messages: [
      { role: "system", content: "You only answer in pig latin." },
      { role: "user", content: "List the first 20 primes." },
    ],
    max_tokens: 20,
  } );
  console.log("latin:", latin);

  const {message: primes} = latin.choices[0];
  console.log("primes:", primes);


  const completion_err_1 = await openai.create({ model: "gpt-1.2-turboff" });
  console.log("completion_err_1:", completion_err_1);
  // error: {
  //   type: "e.g. invalid_request_error",
  //   code: "e.g. model_not_found",
  //   param: "e.g. messages.[0].content",
  //   message: "e.g. Invalid value for 'content': expected a string, got null."
  // }
  console.log("completion_err_1.choices:", completion_err_1.choices);

  const error_1 = completion_err_1.error;
  console.log("error.type:", error_1.type); // "invalid_request_error
  console.log("error.code:", error_1.code); // "model_not_found"
  console.log("error.param:", error_1.param); // <null>
  console.log("error.message:", error_1.message); // "The model `gpt-1.2-turboff` does not exist"


  const completion_err_2 = await openai.create({ model: "gpt-4" });
  console.log("completion_err_2:", completion_err_2);
  console.log("completion_err_2.choices:", completion_err_2.choices);

  const error_2 = completion_err_2.error;
  console.log("error.type:", error_2.type); // "invalid_request_error
  console.log("error.code:", error_2.code); // <null>
  console.log("error.param:", error_2.param); // <null>
  console.log("error.message:", error_2.message); // "'messages' is a required property"


  const completion_err_3 = await openai.create({ model: "gpt-4", messages: [{role: "user"}] });
  console.log("completion_err_3:", completion_err_3);
  console.log("completion_err_3.choices:", completion_err_3.choices);

  const error_3 = completion_err_3.error;
  console.log("error.type:", error_3.type); // "invalid_request_error
  console.log("error.code:", error_3.code); // <null>
  console.log("error.param:", error_3.param); // "messages.[0].content"
  console.log("error.message:", error_3.message); // "Invalid value for 'content': expected a string, got null."


  const completion_err_4 = await openai.create({ model: "gpt-4", messages: [{role: "user", content: "OK?"}], max_tokens: "xyz" });
  console.log("completion_err_4:", completion_err_4);
  console.log("completion_err_4.choices:", completion_err_4.choices);

  const error_4 = completion_err_4.error;
  console.log("error.type:", error_4.type); // "invalid_request_error
  console.log("error.code:", error_4.code); // <null>
  console.log("error.param:", error_4.param); // <null>
  console.log("error.message:", error_4.message); // "'xyz' is not of type 'integer' - 'max_tokens'"

};

main();
