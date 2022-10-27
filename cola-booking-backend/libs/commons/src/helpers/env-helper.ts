import 'dotenv/config';

export function isEnvDevelopmentOrLocal(): boolean {
  return isEnvDevelopment() || isEnvLocal();
}

export function isEnvLocal(): boolean {
  return process.env.NODE_ENV.startsWith('local-');
}

export function isEnvDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}
