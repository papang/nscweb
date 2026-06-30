import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.CRYPTO_SECRET_KEY || 'NSC-KEY';

/**
 * Encrypts any text or object into an AES ciphertext string
 */
export const encryptData = (data: any): string => {
  try {
    // Convert object to string if necessary
    const stringData = typeof data === 'object' ? JSON.stringify(data) : String(data);
    
    return CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString();
  } catch (error) {
    console.error('Encryption failed:', error);
    return '';
  }
};

/**
 * Decrypts an AES ciphertext string back into its original format
 */
export const decryptData = (ciphertext: string): any => {
  try {
    if (!ciphertext) return null;

    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) return null;

    // Try parsing as JSON, return raw string if it fails
    try {
      return JSON.parse(decryptedText);
    } catch {
      return decryptedText;
    }
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};


export const decryptDataBase64 = (ciphertext: string): any => {
  try {
    if (!ciphertext) return null;

    const decode2 = Buffer.from(ciphertext, 'base64').toString('utf8');
    const decode3 = Buffer.from(decode2.substring(0,decode2.length-9), 'base64').toString('utf8');
    const tobj = JSON.parse(decode3);
    if( tobj ) {
      return tobj;
    }

  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}