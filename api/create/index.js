module.exports = async function (context, req) {
  if (req.body.id) {
    context.res = { status: 400 };
    return;
  }
  req.body.envId = "chspride";
  context.bindings.outputDocument = req.body;
};
