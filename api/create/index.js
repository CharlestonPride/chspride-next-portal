module.exports = async function (context, req) {
  req.body.envId = context.bindings.req.params.partitionKey;

  context.bindings.outputDocument = req.body;

  var message = {
    content: [
      {
        type: "text/html",
        value: `<div>A new record was added to ${
          context.bindings.req.params.collection
        }</div><div><code>${JSON.stringify(req.body)}</code></div>`,
      },
    ],
  };
  return message;
};
