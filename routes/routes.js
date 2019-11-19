var indexRouter = require("./index");
var bookRouter = require("./book");
var loginRouter = require("./login");
//var usersRouter = require("./users");

/* preprosessing  */

/* router  */
module.exports = function(app) {
  app.use("/", indexRouter);
  app.use("/book", bookRouter);
  app.use("/login", loginRouter);
  //app.use("/users", usersRouter);

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err);
  });
};
