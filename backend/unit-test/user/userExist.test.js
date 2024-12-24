import { userService } from '../../services/userService';
import User from '../../model/userModel';

jest.mock('../../model/userModel.js');

const mockUsers = [
    { email: 'testOne@gmail.com', password: 'Asd123!' },
    { email: 'testTwo@gmail.com', password: 'Azx@qw1' },
];

describe('userExist', () => {
    const { checkUserExist } = userService()
    beforeEach(() => {
        User.findOne.mockImplementation(({ email }) =>
            Promise.resolve(mockUsers.find(user => user.email === email) || null)
        );
    });
    it('Should throw an error if the email does not exist', async () => {
        User.findOne.mockResolvedValueOnce(null);
        await expect(checkUserExist('nonexistent@gmail.com')).rejects
            .toThrowError('Email not registered with us');
    })
    it('Should return the user object if the email exist', async () => {
        const email = 'testOne@gmail.com';
        const mockUser = mockUsers.find(user => user.email === email);
        User.findOne.mockResolvedValueOnce(mockUser)
        const result = await checkUserExist(email)
        expect(result).toEqual(mockUser)
    })
})