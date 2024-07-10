const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU5iVUFpZnNlZjQ5NGZhby9od3hrbmViSnBzdmpsVS9RTUVVdWxHY2VYST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWHhHdGFKazIyZThIK0pPWm51OFIxK0huMnRJbHkwQXIxZGt0eWVmeVV4dz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjRmE0SlJBNERpbzVwOXl3SEFWMk9WNU42WklHK25vdStzNkVmYk5RUWtFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkQXpJUFh6a3ZGaDc2UUU2MnhaK3dUQXRSRFYvcVBWMWFmRVhKa2hVdTAwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNNdjV4c2pvdkZOSmQvWWxPMDZwSEpVWG9WbVY3TER2QlVZK21sOEtaRUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9qR043SS93a3lZN243Vk42b3hZQ0VVOE9SZm9jRUpwZDQrM29UZlFRZ0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUEzZTBudzJBWFN1ODUvNXFhQWQ4MW9UR1lBZXQrcDJSZzlrUU92RnVVRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0tocDJBcXdwSlBSc3kwbmhyV2JzVUVtSDhxemVOZG5DeTI3MU1xbG1SQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1wVVlqOEJKTlBzZHNWL25GM2FMUy9vNUx5Q0V3UG1FdmUweU9zdHBmUUdPWlBPeXg5U3h4REE1Y3hwYURNVjdnRHpjbjNVNzA3aUhLSTh3d2RBaGpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIxLCJhZHZTZWNyZXRLZXkiOiJrd08xR01mZk0xb2tieDhKNDNLMEU1YjFxSWhuRHEvL1RyNmNBNEwvWjdnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJLT1J5Q0x2bFN3ZUdWY3hDLTA5VVJ3IiwicGhvbmVJZCI6IjIwNjc1ZTUzLTY0NTYtNGM4Yy05YjFmLWMzOGM2ZTIyZDliYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQQmN5UndBbjZtTkl4Uy9hWTZ3S3BjTCtEblk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOFlQdExoYUd2YWZCeDVBYkllSlJjQjZxQ1l3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJBVEozWERHIiwibGFzdFByb3BIYXNoIjoiM0w3ZEZFIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQXdJQWc9PSJ9LCJtZSI6eyJpZCI6IjI1NDc3MTI1NTE5MjoyMkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE2ODE4NzA5NDExODQwMjoyMkBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BmNm5Jb0VFSm5wdTdRR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlovLzd2cXpDajZrWDZQYUxvU2JwR2FIMmhvdURrRlZqYkR3SjVmMUc5bFU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjFvaWxrQ0d4eHRZTmNLS1VtNjRNMzJrTnhnR1lrdjVsY0g5cTJhNXNoa0EvNjlCdERWZzNhUmE2NUExNUN4Sks2N3pzc0Q4a0FVdVdqSkZrMXlTREN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJGb3BZSmV2ODV4UFYxSUE4VThUYlJ2OFIySlR2YUJJQ0dwK2dHR0NtVEgvT0ZOY2dSOHh5NC9oY3AvWHAvN3p1VndzTCtRWWR4M2M1bENkZUVBYzNndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc3MTI1NTE5MjoyMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXZi8rNzZzd28rcEYrajJpNkVtNlJtaDlvYUxnNUJWWTJ3OENlWDlSdlpWIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwNjQ0NzY0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlPNyJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
