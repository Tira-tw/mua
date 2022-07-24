require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN || "",  // your bot token
    PREFIX: process.env.PREFIX || "-", //<= default is #  // bot prefix
    OWNER_ID: process.env.OWNER_ID || "848164182334898216", //your client id
}