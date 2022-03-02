module.exports = async function (context, req) {
  var id = context.bindingData.id;
  if (context.bindings.document.id !== id || req.body.id !== id) {
    context.res = {
      status: 404,
    };
  } else {
    context.bindings.outputDocument = req.body;
  }
};
