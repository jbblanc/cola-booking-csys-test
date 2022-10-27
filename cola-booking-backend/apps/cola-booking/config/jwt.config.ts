import 'dotenv/config';

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    //TODO modify this the much shorter once we implement the refresh_token
    expiresIn: process.env.JWT_EXPIRATION, // 24*3600s => 1 day
  },
};
