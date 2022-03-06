const releaseServer = 'example.release.proxy.com';
const betaServer = 'example.beta.proxy.com';
const testServer = 'example.test.proxy.com';
const localServer = 'example.local.proxy.com';

export const fetchEnv = (
  env: string | boolean | undefined
): Record<string, string> => {
  switch (env) {
    case 'local':
      return { proxy: localServer };
    case 'test':
      return { proxy: testServer };
    case 'beta':
      return { proxy: betaServer };
    case 'release':
      return { proxy: releaseServer };
    default:
      return { proxy: '' };
  }
};
