module.exports = async function (context, req) {
  var id = context.bindingData.id;
  if (context.bindings.document.id !== id || req.body.id !== id) {
    context.res = {
      status: 404,
    };
  } else {
    context.bindings.outputDocument = req.body;
    var message = {
      content: [
        {
          type: "text/html",
          value: `<div>There was an update to ${
            context.bindings.req.params.collection
          }</div><div><code>${JSON.stringify(req.body)}</code></div>`,
        },
      ],
    };
    return message;
  }
};
