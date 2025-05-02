// jest.setup.ts
globalThis.Request = require('node-fetch').Request;
globalThis.Response = require('node-fetch').Response;
