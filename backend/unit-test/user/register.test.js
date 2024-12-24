import bcrypt from 'bcrypt';
import { userService } from '../../services/userService';
import User from '../../model/userModel';

jest.mock('../../model/userModel.js');
jest.mock('bcrypt');

const mockUsers = [
    { email: 'testOne@gmail.com', password: 'Asd123!' },
    { email: 'testTwo@gmail.com', password: 'Azx@qw1' },
];

const resetMocks = () => {
    User.findOne.mockReset();
    bcrypt.hash.mockReset();
    User.prototype.save = jest.fn();
};


describe('registerUser', () => {
    const { registerUser } = userService();

    beforeEach(() => {
        resetMocks();
        User.findOne.mockImplementation(({ email }) => 
            Promise.resolve(mockUsers.find(user => user.email === email) || null)
        );
    });

    it('should throw an error if the email already exists', async () => {
        User.findOne.mockResolvedValueOnce({ email: 'testOne@gmail.com' });
        await expect(registerUser('testOne@gmail.com', 'password'))
        .rejects
        .toThrowError('Email already exist');
         expect(User.findOne).toHaveBeenCalledWith({ email: 'testOne@gmail.com' });
    });

    it('should create a new user if email does not exist', async () => {
        const newUser = { email: 'testThree@gmail.com', password: 'ak4123@df' };
        User.findOne.mockResolvedValueOnce(null);  
        bcrypt.hash.mockResolvedValueOnce('hashedPassword'); 
        User.prototype.save.mockResolvedValueOnce(newUser);
        

        const result = await registerUser('testThree@gmail.com', 'ak4123@df');
        expect(result).toEqual(newUser);
        expect(User.prototype.save).toHaveBeenCalled();
    });
});
