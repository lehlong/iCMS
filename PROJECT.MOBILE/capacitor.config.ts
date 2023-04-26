import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'PROJECT.MOBILE',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    androidScheme: "http",
    cleartext: true,
    allowNavigation: [
      "http://sso.d2s.com.vn:4008/"
    ]
  },
};

export default config;
