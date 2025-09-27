import { Injectable } from '@nestjs/common';
import crypto from 'crypto';


interface ICryptoService {
    encrypt(keyvalue: string): IEncryptResult;
    decrypt(encrypted: string, iv: string, tag: string): string;
}

interface IEncryptResult {
    encrypted: string;
    iv: string;
    tag: string;
}

@Injectable()
export class CryptoService implements ICryptoService {

    private readonly algorithm = 'aes-256-gcm';
    private readonly key: Buffer;

    constructor() {

        const masterKey = process.env.MASTER_KEY;
        if (!masterKey) {
            throw new Error('MASTER_KEY environment variable is not set');
        }

        this.key = crypto.createHash('sha256').update(masterKey).digest();
    }

    
    //##############################################################
    // ECRYPTION
    //##############################################################
    encrypt(keyvalue: string): IEncryptResult {

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

        const encrypted = Buffer.concat([
            cipher.update(keyvalue, 'utf8'),
            cipher.final()
        ]);

        const tag = cipher.getAuthTag();

        return {
            encrypted: encrypted.toString('hex'),
            iv: iv.toString('hex'),
            tag: tag.toString('hex')
        };
    }

    //##############################################################
    // DECRYPTION
    //##############################################################
    decrypt(keyvalue: string): string {

        const encryptedParts = keyvalue.split(':');

        if (encryptedParts.length !== 3) {
            throw new Error('Invalid encrypted data format');
        }

        const encrypted = encryptedParts[0];
        const iv = encryptedParts[1];
        const tag = encryptedParts[2];
        
        const decipher = crypto.createDecipheriv(
            this.algorithm,
            this.key,
            Buffer.from(iv, 'hex')
        );
        decipher.setAuthTag(Buffer.from(tag, 'hex'));

        const decrypted = Buffer.concat([
            decipher.update(Buffer.from(encrypted, 'hex')),
            decipher.final()
        ]);

        return decrypted.toString('utf8');
    }
}