# ChatGPT-Lite: OpenAI REST API standalone wrapper for NodeJS or Web

[![NPM version](https://img.shields.io/npm/v/chatgpt-lite.svg)](https://npmjs.org/package/chatgpt-lite)

ChatGPT-Lite is a minimal standalone JS wrapper for the OpenAI REST API.

It provides dependency-free access to common OpenAI REST API calls, from Node or Web.

The intention is to cover only the most frequent use cases. No fluff, no filler; so tiny that you can use it inside a Bookmarklet.

This is not trying to be a complete replacement for OpenAI's official library, which is located here: https://github.com/openai/openai-node

## Installation

### Node via npm:
```sh
npm install chatgpt-lite
```
```javascript
const OpenAI = require("chatgpt-lite");

const openai = OpenAI({ apiKey: ... });
```

### Web via CDN:
```html
<script type="module">
  import OpenAI from "https://unpkg.com/browse/chatgpt-lite/index.mjs"

  const openai = OpenAI({ apiKey: ... });
</script>
```
or
```html
<script src="https://unpkg.com/browse/chatgpt-lite/index.js"></script>
<script>
  const openai = OpenAI({ apiKey: ... });
</script>
```

## Usage

For ChatGPT-Lite code examples, go here: https://github.com/DarrenSem/chatgpt-lite/examples.

If you wish to expand the core functionality (to add function calls, process streaming, etc.), update/add code to match the OpenAI API signatures -- refer to their official [API Reference](https://platform.openai.com/docs/api-reference) and [Documentation](https://platform.openai.com/docs).

The code below shows how to get started, using the core `.create()` async function similar to the official chat completions API.

```js
import OpenAI from "chatgpt-lite"; // ESM.mjs
// const OpenAI = require("chatgpt-lite"); // CJS.js

async function main() {

  // similar to official API, but no need for `new OpenAI({ ... });`
  const openai = OpenAI({
    // for minimal size it does NOT currently default to setting apiKey = process.env["OPENAI_API_KEY"]
    apiKey: "api_key_can_not_be_omitted"
    // apiKey: process.env["OPENAI_API_KEY"] || await fetchApiKey()
  });
  console.log("openai:", openai);
  // openai: {
  //   apiKey: 'sk-QiyAbcDe1FGhIjk23l4mnOpQ5RstuV67w89x012y2z34Ab7C',
  //   create: [AsyncFunction: create]
  // }

  // same signature/result as `await openai.chat.completions.create({ ... });`
  const completion = await openai.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
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

};

main();
```

## Handling errors

Errors might occur when ChatGPT-Lite is unable to connect to the OpenAI API, or if the API returns a non-success status code (i.e., 4xx or 5xx response).

The returned `Promise` resolves to the `{object}` returned by fetch's `Response.json()`.
Success means this object will contain a property named `choices`.
Failure means it will contain a property named `error` **and** it will be missing the property named `choices`.

```js
const completion = await openai.create({ model: "gpt-1.2-turboff", messages: [ { role: "user" } ] });
console.log("completion:", completion);
// completion: {
//   error: {
//     type: "e.g. invalid_request_error",
//     code: "e.g. model_not_found",
//     param: "e.g. messages.[0].content",
//     message: "e.g. Invalid value for 'content': expected a string, got null."
//   }
// }
console.log("completion.choices:", completion.choices);
// completion.choices: <undefined>
```

## Streaming Responses

Currently this does not provide support for streaming responses. A `stream` option might be added in the future.

### Automated function calls

Currently this does not provide support for function calls / running tools. This option might be added in the future.

## File Uploads

Currently this does not provide support for file uploads. This option might be added in the future.

### Retries

Currently this does not provide support for retrying after certain errors. A `maxRetries` option might be added in the future.

### Timeouts

Currently requests should automatically timeout after the number of minutes that the OpenAI API defines as the default (likely 10 minutes, or perhaps 20). A `timeout` option might be added in the future.

Requests which time out will not be [retried by default](#retries). This might be added in the future.

## Auto-pagination

Currently this does not provide support for any kind of `limit` option to produce paginated output. This might be added in the future.

## Advanced Usage

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` is not returned by any functions. A `raw` option might be added in the future.

## Customizing the fetch client

By default, ChatGPT-Lite uses the built-in `fetch()` async function provided by Node(v18+, released 2022-04-19) or most modern Web browsers. A `fetch` option might be added in the future, to allow for providing a custom `fetch` function, which for example could be used to inspect or alter the `Request` or `Response` before/after each request.

Currently this does not look for a `DEBUG=true` environment variable, but in the future this might be added to log all requests and responses automatically (for debugging purposes).

## Configuring an HTTP(S) Agent (e.g., for proxies)

Currently this does not provide support for any kind of `baseURL` or `httpAgent` options, for example to use the API behind a proxy. This might be added in the future.

## Requirements

In theory, this should work inside any JavaScript runtime environment that provides a built-in `fetch()` async function. In theory.
