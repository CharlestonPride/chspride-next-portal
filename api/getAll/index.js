module.exports = async function (context, req) {
  console.log(context.bindings.req.params.partitionKey);
  context.res = {
    body: context.bindings.documents,
  };
};
