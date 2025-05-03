// This is a stub module to replace @shopify/shopify-api/runtime/node
// This helps avoid the "Package path ./runtime/node is not exported" error

// Export a fake Node object that matches the interface expected by Shopify API
exports.Node = {
  fetch: global.fetch,
  Headers: global.Headers,
  Request: global.Request,
  Response: global.Response,
  crypto: require('crypto'),
  base64Encode: (data) => Buffer.from(data).toString('base64'),
  base64Decode: (data) => Buffer.from(data, 'base64').toString(),
};

module.exports = exports; 