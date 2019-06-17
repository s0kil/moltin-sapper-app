// import 'dotenv/config';
require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  MOLTIN_CLIENT_ID: process.env.MOLTIN_CLIENT_ID
};
