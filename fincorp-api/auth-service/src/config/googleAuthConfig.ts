import { google } from "googleapis";
import dotenv from 'dotenv'
dotenv.config()
const GOOGLE_AUTH_CLIENT_ID=process.env.GOOGLE_AUTH_CLIENT_ID
const GOOGLE_AUTH_CLIENT_SECRET=process.env.GOOGLE_AUTH_CLIENT_SECRET
const GOOGLE_AUTH_REDIRECT_URL=process.env.GOOGLE_AUTH_REDIRECT_URL
if(!GOOGLE_AUTH_CLIENT_ID || !GOOGLE_AUTH_CLIENT_SECRET ){
  throw Error("GOOGLE_AUTH envirionment variables missing")
}
console.log("process.env.GOOGLE_AUTH_CLIENT_ID",process.env.GOOGLE_AUTH_CLIENT_ID)
export const auth2Client = new google.auth.OAuth2(GOOGLE_AUTH_CLIENT_ID,GOOGLE_AUTH_CLIENT_SECRET,"postmessage")
