import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBZLN2jTTKV34SneGPoWRz1zoRpX5uODjs",
  authDomain: "sierra-blu.firebaseapp.com",
  projectId: "sierra-blu",
  storageBucket: "sierra-blu.firebasestorage.app",
  messagingSenderId: "941030513456",
  appId: "1:941030513456:web:56209a1495d69f217086f5",
  measurementId: "G-ZP054BPJ8Q"
};

const app = initializeApp(firebaseConfig);
// Note: getAnalytics() requires window object, ensure it's called client-side if using Next.js
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, analytics };
