import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sierraestates.app',
  appName: 'Sierra Estates',
  webDir: 'public',
  server: {
    url: 'http://192.168.1.112:3000',
    cleartext: true
  }
};

export default config;
