module.exports = function (app, shopData) {
  // Handle our routes
  app.get("/list", function (req, res) {
    let sqlquery = "SELECT * FROM books"; // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("./");
      }
      //res.send(result);
      //updated code
      let newData = Object.assign({}, shopData, { availableBooks: result });
      console.log(newData);
      res.render("list.ejs", newData);
    });
    //the updated code now creates a new object call newData by merging the shop data object
  });
  app.get("/bargainbook", function (req, res) {
    let sqlquery = "SELECT * FROM books WHERE price <20 ;"; // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("./");
      }

      //updated code
      let newData = Object.assign({}, shopData, { availableBooks: result });
      console.log(newData);
      res.render("list.ejs", newData);
    });
    //the updated code now creates a new object call newData by merging the shop data object
  });

  app.get("/", function (req, res) {
    res.render("index.ejs", shopData);
  });
  app.get("/about", function (req, res) {
    res.render("about.ejs", shopData);
  });
  app.get("/search", function (req, res) {
    res.render("search.ejs", shopData);
  });
  app.get("/addbook", function (req, res) {
    res.render("addbooks.ejs", shopData);
  });
  app.get("/search-result", function (req, res) {
    let sqlquery =
      "SELECT * FROM books WHERE name LIKE" + "'%" + req.query.keyword + "%'";
    //this will now use the sql query to find resultes in the database
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("./");
      }
      let newData = Object.assign({}, shopData, { availableBooks: result });
      res.render("search-result.ejs", newData);
    });
  });
  app.get("/register", function (req, res) {
    res.render("register.ejs", shopData);
  });
  app.post("/registered", function (req, res) {
    // saving data in database
    res.send(
      " Hello " +
        req.body.first +
        " " +
        req.body.last +
        " you are now registered!  We will send an email to you at " +
        req.body.email
    );
  });
  app.post("/bookadded", function (req, res) {
    // saving data in database
    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
    // execute sql query
    let newrecord = [req.query.name, req.query.price];
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        return console.error(err.message);
      } else {
        res.send(
          " This book is added to database, name: " +
            req.body.name +
            " price " +
            req.body.price
        );
      }
    });
  });
};
