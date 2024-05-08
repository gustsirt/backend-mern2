import dotenv from 'dotenv';
dotenv.config()

const configObject = {
  jwt_code: process.env.JWT_SECRET_CODE,
  cookies_code: process.env.COOKIES_SECRET_CODE,
  mongo_uri: process.env.MONGO_URI,
  uadmins: process.env.USERS_ADMIN,
  uadmin_pass: process.env.USER_ADMIN_PASS,
  gh_client_id: process.env.GITHUB_CLIENT_ID,
  gh_client_secret: process.env.GITHUB_CLIENT_SECRET,
  gmail_user_app: process.env.GMAIL_USER_APP,
  gmail_pass_app: process.env.GMAIL_PASS_APP,
  cors_origin: process.env.CORS_ORIGIN,
}

export default configObject