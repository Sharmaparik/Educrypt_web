import crypto from 'crypto'

const secretKey = process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_SECRET_KEY

const OPENSSL_CIPHER_NAME = process.env.NEXT_PUBLIC_OPENSSL_CIPHER_NAME;
const AEC_CBC_KEY = process.env.NEXT_PUBLIC_AEC_CBC_KEY;
const CIPHER_KEY_LEN = process.env.NEXT_PUBLIC_CIPHER_KEY_LEN;
const ini_vector = process.env.NEXT_PUBLIC_INI_VECTOR;


const fixKey = (key) => {
    if (key.length < CIPHER_KEY_LEN) {
      // 0 pad to length 16
      return key.padEnd(CIPHER_KEY_LEN, '0');
    }
    if (key.length > CIPHER_KEY_LEN) {
      // truncate to 16 bytes
      return key.slice(0, CIPHER_KEY_LEN);
    }
    return key;
  };

  function get_keys(key, string) {
    const keyArray = key.split('');
    const stringArray = string.split('');
    let result = '';
    
    stringArray.forEach(value => {
        result += keyArray[value];
    });

    return result;
}

export const get_token = () => {
    const user_id = 0;
    let string  = user_id+"0161086410274515";
    return string.substring(0, 16);
}

  export const encrypt = (string, key) => {
    const cbcKey = key ? get_keys(AEC_CBC_KEY, key) : AEC_CBC_KEY;
    const iniVector = key ? get_keys(ini_vector, key) : ini_vector;
    const cipher = crypto.createCipheriv(OPENSSL_CIPHER_NAME, Buffer.from(fixKey(cbcKey)), Buffer.from(iniVector));
    let encrypted = cipher.update(string, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted + ":" + Buffer.from("1234567890123456").toString('base64');
  };

  export const decrypt = (string, key) => {
    const cbcKey = key ? get_keys(AEC_CBC_KEY, key) : AEC_CBC_KEY;
    const iniVector = key ? get_keys(ini_vector, key) : ini_vector;
    const [encryptedData] = string.split(':')
    const decipher = crypto.createDecipheriv(OPENSSL_CIPHER_NAME, Buffer.from(fixKey(cbcKey)), Buffer.from(iniVector));
  
    let decrypted = decipher.update(Buffer.from(encryptedData, 'base64'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return JSON.parse(decrypted.toString('utf8'));
  };


export const ProdscreenWidth = () => {
    if (window.innerWidth < 491) {
        return 1;
    } else if (window.innerWidth < 768) {
        return 2;
    } else if (window.innerWidth < 991) {
        return 3;
    }
    else{ 
        return 5
    }
}

export const ScreenWidth = () => {
    if (window.innerWidth < 491) {
        return 1;
    } else if (window.innerWidth < 768) {
        return 2;
    } else if (window.innerWidth < 991) {
        return 3;
    }
    else{ 
        return 4
    }
}

export const TestScreenWidth = () => {
    if (window.innerWidth < 491) {
        return 1;
    } else if (window.innerWidth < 768) {
        return 2;
    } else if (window.innerWidth < 991) {
        return 3;
    }
    else{ 
        return 3
    }
}


export function isValidData(response) {
    if (Array.isArray(response)) {
      return response.length > 0 ? response : false;
    }
  
    // Handle empty object or empty string cases
    if (response === '{}' || response === '{}' || response === '') {
      return false;
    }
  
    // If response is not an array, empty object, or empty string, return false
    return false;
  }


