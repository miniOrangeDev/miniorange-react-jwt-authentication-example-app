const JWT_1 = require("./JWT");
const JWTSigner_1 = require("./JWTSigner").default;
const JWTVerifier_1 = require("./JWTVerifier").default;
const asn1js = require("asn1js");
const pkijs = require("pkijs");

class JWTBuilder {
    constructor() {
        this.header = {
            typ: 'JWT',
            cty: 'JWT'
        };
        this.payload = {};
        this.createdJwt = new JWT_1.JWT();
        this.secret = "";
    }

    parseJwt(jwt) {
        let parts = jwt.split(".");
        if (parts.length !== 3) {
            return new JWT_1.JWT();
        }
        let parsedJwt = new JWT_1.JWT();
        parsedJwt.setHeader(parsedJwt.parseStringComponent(parts[0]));
        parsedJwt.setPayload(parsedJwt.parseStringComponent(parts[1]));
        parsedJwt.setSign(parts[2]);
        this.createdJwt = parsedJwt;
        this.header = parsedJwt.getHeader();
        this.payload = parsedJwt.getPayload();
        return parsedJwt;
    }

    getHeaderString() {
        return this.base64urlEncode(JSON.stringify(this.header));
    }

    getPayloadString() {
        return this.base64urlEncode(JSON.stringify(this.payload));
    }

    base64urlEncode(input) {
        return btoa(input)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    base64urlDecode(input) {
        // Convert from base64url to base64
        input = input.replace(/-/g, '+').replace(/_/g, '/');
        // Pad with "=" characters to make the length a multiple of 4
        while (input.length % 4) {
            input += '=';
        }
        return atob(input);
    }

    async verifyJwtWithPublicKey(publicKey) {
        if (this.createdJwt.isEmpty()) {
            throw new Error("Attributes required to verify a JWT are empty.");
        }
        const signature = this.base64urlDecode(this.createdJwt.getSign());
        const data = `${this.getHeaderString()}.${this.getPayloadString()}`;
        // alert(data);

        const importedPublicKey = await this.importPublicKeyFromCertificate(publicKey);
        const isVerified = await crypto.subtle.verify(
            { name: 'RSASSA-PKCS1-v1_5' },
            importedPublicKey,
            Uint8Array.from(signature, c => c.charCodeAt(0)),
            new TextEncoder().encode(data)
        );
        return isVerified;
    }

    async importPublicKeyFromCertificate(pem) {
        const pemContents = pem.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n)/g, '');
        const binaryDerString = this.base64urlDecode(pemContents);
        const binaryDer = new Uint8Array([...binaryDerString].map(char => char.charCodeAt(0)));

        try {
            const asn1 = asn1js.fromBER(binaryDer.buffer);
            const cert = new pkijs.Certificate({ schema: asn1.result });
            const publicKeyInfo = cert.subjectPublicKeyInfo;
            const spkiBuffer = publicKeyInfo.toSchema().toBER(false);

            return await crypto.subtle.importKey(
                'spki',
                spkiBuffer,
                {
                    name: 'RSASSA-PKCS1-v1_5',
                    hash: 'SHA-256',
                },
                true,
                ['verify']
            );
        } catch (error) {
            console.error("Error importing public key from certificate:", error);
            throw error;
        }
    }
}

export default JWTBuilder;
