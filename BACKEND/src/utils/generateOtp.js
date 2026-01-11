import crypto from 'crypto';

export const generateOtp = async () => {
    return crypto.randomInt(100000, 999999).toString();
};