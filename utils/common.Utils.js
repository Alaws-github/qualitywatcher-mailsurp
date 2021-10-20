import Crypto from 'crypto';

class CommonUtils {
    createRandomEmail() {
        let email = "andrewqualitywatcher+" + Math.floor(Math.random() * 10000000) + '@gmail.com';
        return email;
    }

    randomString(size) {
        return Crypto.randomBytes(size).toString('base64').slice(0, size);
    }
}

export default new CommonUtils()
