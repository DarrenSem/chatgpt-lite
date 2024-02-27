# ChatGPT-Lite: OpenAI REST API standalone wrapper

[![NPM version](https://img.shields.io/npm/v/chatgpt-lite.svg)](https://npmjs.org/package/chatgpt-lite)

ChatGPT-Lite provides dependency-free access to the frequent OpenAI REST API calls from JavaScript (Node or Web).

A tiny one-liner for only the most common use cases, no fluff, no filler. So small you can use it inside a Bookmarklet.

Note: This is NOT a full replacement for the official library from OpenAI, which is located here: https://github.com/openai/openai-node

## Installation

```sh
npm install --save chatgpt-lite
```

## Usage

Have a look at the ChatGPT-Lite [code examples](https://github.com/DarrenSem/chatgpt-lite/examples.js). To expand the core functionality (streaming, function calls, etc.), consider updating the source code based on the [OpenAI API Reference](https://platform.openai.com/docs/api-reference) and [Documentation](https://platform.openai.com/docs).

The code below shows how to get started, using the core `.create()` async function similar to the official chat completions API.

```js
import OpenAI from "chatgpt-lite";

const openai = OpenAI({ // similar to official API, but no need for `new OpenAI({ ... });`
  apiKey: "api_key_can_not_be_omitted", // for minimal size it does NOT currently default to process.env["OPENAI_API_KEY"]
});

async function main() {
  const chatCompletion = await openai.create({ // signature is identical to `await openai.chat.completions.create({ ... });`
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
  });
}

main();
```

## Requirements

In theory, this should work inside any JavaScript runtime environment that provides a built-in `fetch()` async function. In theory.
