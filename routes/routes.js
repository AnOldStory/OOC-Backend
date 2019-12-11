var indexRouter = require("./index");
var bookRouter = require("./book");
var loginRouter = require("./login");
const adminRouter = require("./admin");
const signInRouter = require("./signIn");
const ticketRouter = require("./ticket");
//var usersRouter = require("./users");

/* preprosessing  */

/* router  */
module.exports = function(app) {
  app.use("/", indexRouter);
  app.use("/api/book", bookRouter);
  app.use("/api/login", loginRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/signin", signInRouter);
  app.use("/api/ticket", ticketRouter);
  //app.use("*", (err, req, res, next) => {
  //  res.sendFile("../public/warn.html");
  //});

  // error handler
  app.use( function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    console.log("FaDe");
    console.log(err)
    // render the error page
    
    //res.status(err.status || 500);
    res.sendFile("../public/warn.html");
  });
};
