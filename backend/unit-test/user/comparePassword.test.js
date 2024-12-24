import bcrypt from 'bcrypt';
import { userService } from '../../services/userService';

jest.mock('bcrypt');

describe('comparePassword', () => {
    const mockPasswords = {
        inputPassword: 'Test@123',
        storedPassword: '$dsdf$asdcdf%sfsdf$ddfd'
    }
    const { comparePassword } = userService();
    it('should return true if password match', async () => {
        bcrypt.compare.mockResolvedValueOnce(true);
        const result = await comparePassword(
            mockPasswords.inputPassword, mockPasswords.storedPassword
        )
        expect(result).toBe(true);
        expect(bcrypt.compare).toHaveBeenCalledWith(
            mockPasswords.inputPassword, mockPasswords.storedPassword
        )
    })
    it('Should throw an error if password do not match', async () => {
        bcrypt.compare.mockResolvedValueOnce(false);
        await expect(comparePassword(
            mockPasswords.inputPassword, mockPasswords.storedPassword
        )).rejects.toThrowError('Invalid credentials');
    })
})