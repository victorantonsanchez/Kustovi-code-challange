import config from '../config.js';
import jsonwebtoken from 'jsonwebtoken';

class Token {
    
    constructor() {}
    
    // Generate new token for a user register in DB
    async create(user = {}) {
        if (!user) {
            return;
        }

        const tokenData = {
            metadata: {
                audience: config.app.token.audience,
            },
            content: {
              issuer: user.id,
            },
          };
      
          const accessToken = this.cipher(
            tokenData.content,
            tokenData.metadata,
          );

          return {
            access_token: accessToken,
            token_type: 'Bearer'
          };
    }

    // Sign token for security
    cipher(content, metadata) {
        return jsonwebtoken.sign(content, config.app.token.password, metadata);
    }
        
    // Check data token
    verify(token, audience) {
        return jsonwebtoken.verify(token, config.app.token.password, { audience });
    }
}

export default new Token();