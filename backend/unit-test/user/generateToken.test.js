import jwt from 'jsonwebtoken'
import { userService } from '../../services/userService';

jest.mock('jsonwebtoken');

describe('generateToken', () => {
    const mockUser = {
        _id: '123456789',
        email: 'testuser@gmail.com',
    };
    const mockToken = 'qwweertadafanjhaosdasudoasdasdasdassd313';
    beforeEach(() => {
        process.env.JWT_SECRET = 'testJwtSecret';
    });
    const { generateToken } = userService();
    it('Should generate a token with the correct payload and options', () => {
        jwt.sign.mockReturnValueOnce(mockToken);

        const token = generateToken(mockUser);
        expect(token).toBe(mockToken);
        expect(jwt.sign).toHaveBeenCalledWith(
            { id: mockUser._id, email: mockUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
    })
})