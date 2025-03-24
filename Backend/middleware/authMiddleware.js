import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const serviceAccount = JSON.parse(
    readFileSync(join(__dirname, '..', 'firebase-admin-config.json'), 'utf8')
);

let firebaseApp;
try {
    firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin SDK initialized successfully');
} catch (error) {
    if (error.code !== 'app/duplicate-app') {
        console.error('Firebase Admin SDK initialization error:', error);
        firebaseApp = admin.app();
    }
}

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            console.log('Decoded token:', decodedToken);
            req.user = decodedToken;
            next();
        } catch (verifyError) {
            // Check for network-related errors
            if (verifyError.code === 'auth/argument-error' && verifyError.message.includes('ENOTFOUND')) {
                console.error('Network Error during token verification:', verifyError);
                // You might want to implement a retry mechanism here
                return res.status(503).json({ 
                    success: false, 
                    message: 'Service temporarily unavailable. Please try again.' 
                });
            }
            throw verifyError;
        }
    } catch (error) {
        console.error('Auth Error:', error);
        res.status(401).json({ 
            success: false, 
            message: 'Invalid token',
            error: error.message
        });
    }
};

// Add a health check endpoint
export const checkFirebaseConnection = async () => {
    try {
        await admin.auth().listUsers(1);
        return true;
    } catch (error) {
        console.error('Firebase connection check failed:', error);
        return false;
    }
};
