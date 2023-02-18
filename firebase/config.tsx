import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const config = {
    apiKey: 'AIzaSyAfqo4JEu--BnaR2cCheXnhbuZTfEVBOOE',
    authDomain: 'soleauthenticity-8f48f.firebaseapp.com',
    projectId: 'soleauthenticity-8f48f',
    storageBucket: 'soleauthenticity-8f48f.appspot.com',
    messagingSenderId: '471540007884',
    appId: '1:471540007884:web:67f472ca8b49864bbe5369',
    measurementId: 'G-3S5T6N6CFY',
};

const app = initializeApp(config);
export const auth: any = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
