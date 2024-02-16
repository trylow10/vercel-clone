// import ngrok from "@ngrok/ngrok";
// import dotenv from "dotenv";
// dotenv.config();
// const PORT = process.env.PORT || 3000;
// const TOKEN = process.env.AUTHTOKEN;
// const PROVIDER = process.env.VERIFY_WEBHOOK_PROVIDER;
// const SECRET = process.env.VERIFY_WEBHOOK_SECRET;

// export const ngrockInnit = async () => {
//   // Establish connectivity
//   const listener = await ngrok.forward({
//     addr: PORT,
//     verify_webhook_provider: PROVIDER,
//     verify_webhook_secret: SECRET,
//     authtoken: TOKEN,
//   });
//   return listener;
// };
// ngrockInnit();
