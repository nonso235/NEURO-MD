const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUd1WWlrYXRldFB1SFgvNGNOdFZxamdCMnZlUk5PRTlIS093WUVROEpXVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEFCRFdEbnpWTmZiNWREaGJKWkFQbkI5bjdNNGFHMmF0b1laTFJ1VGpFWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1UERaeEQwSm82UHIzV3lJUlZuTG5LYmNtVHI4RktndjZHaTJuUlhRMFV3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0bmVFNFhkYWM2YUlMRmVUdG1PQ21YckF3L1dvM1RCSTJPRVJNR3M4WG1NPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRHV1FvZnlHSys2Y0I3aXY1Vi9vRCtuRmJUSHNJWnRGMVYyWVBLWFpGbDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im84ZzRJcWd0QlJFWHlyVDllR2hvUXNCK2JyQ2JkYjJCQUdiaVdZaW9WU009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0dDUFZQbTdhUnUycG0yaWpJWkMvTUNWYzRPaEVtVmFXaHhuSk9tT2hIMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicEZiYWlRQ2RPd2FKbGdkTGErTnEwbFNlY0Q1Y1hYd25oR3VxbFZVNDdsbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilk5RnBGa29acHA4eXlZSEV0akZaZk9BaG9JbFhBM3JPRzlrdkxMWGlwMHkwbml1d214WkloWXpqaGZHZHB1Znd6NXBIRStUdUhMZjhEeSs1VmNhQmdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjEsImFkdlNlY3JldEtleSI6ImNzYVF1ZEtZMnhTcE9YYjk1aEV0Z01CS1A1L3pwMXBNVHZTQ3V5QURRR0k9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODEzOTU5ODk4NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJENDg3RkJCNDgyRjA3OUZCNzY2Mjg0MEQ1NkYxMDIxMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUzMjMzNzQ3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MTM5NTk4OTg1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkY2N0FDODkxODU4QjNDRjk4MEM3NzZERDE3OENBMDJEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTMyMzM3NDl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjEyM0xPVFVTIiwibWUiOnsiaWQiOiIyMzQ4MTM5NTk4OTg1OjIyQHMud2hhdHNhcHAubmV0IiwibGlkIjoiNzcyNjY2NDYyNDk1NTg6MjJAbGlkIiwibmFtZSI6Ik1lbGlvZGFzIPCfmIjwn5iIIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKSzUvcHdIRU1IeWdNUUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJBc3hwd0xTTFlTOG1RS21WRVNjVGUrcEQ1ZW91azhCdFpTWFNlcURkNVFvPSIsImFjY291bnRTaWduYXR1cmUiOiJ2Ry9iZldTVjlhWTVIWnJvU2VlZXZsRXlkTExoSmZZTEpUd3d3YW9Yd2xUMjdjeVJFTUpTRkdRQUdoVXFxZGQwYWZOeUlNK3VYV0hFeGRucmlJRmlDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiR0k0Rk1ubXNWbDhEanpRbDM1Rzc5UGNFVDZON0tFanpLS2pyb0VzUzBTS1RvRFpmNzRLL2J2WWxIS3FqZkJoQkVkV3JUVFdEUzBkblJHbElscXU5aHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTM5NTk4OTg1OjIyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFMTWFjQzBpMkV2SmtDcGxSRW5FM3ZxUStYcUxwUEFiV1VsMG5xZzNlVUsifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MzIzMzc0MiwibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLWmoifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "meliodas",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "NEURO-MD",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'NEURO-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/grlqyj.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

