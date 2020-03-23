const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session)

const dbConfig = require("../data/dbConfig")

//MIDDLEWARE applied to all endpoints

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(
    session({
      name: "monkey", 
      resave: false,
      saveUninitialized: false,
      secret: "keep it secret, keep it safe",
      cookie: {
        httpOnly: true,
        secure: false,
        //expires in 7 days 
        maxAge: 1000 * 60 * 60 * 24 * 7
      },
      //NEED SESSION STORAGE HERE
      store: new KnexSessionStore({
        knex: dbConfig,  
        createTable: true
      })
     
    })
  );

  server.use((err, req, res, next) => {
    res.status(500).json({
      message: "Something went wrong"
    });
  });
};
