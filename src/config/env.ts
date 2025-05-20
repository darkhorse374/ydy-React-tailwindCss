const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const config = {
  google: {
    clientId: getEnvVar('VITE_GOOGLE_OAUTH_CLIENT_ID'),
  },
} as const;