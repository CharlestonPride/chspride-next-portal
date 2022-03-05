module.exports = async function (context, req) {
  req.body.envId = context.bindings.req.params.partitionKey;

  context.bindings.outputDocument = req.body;
};
