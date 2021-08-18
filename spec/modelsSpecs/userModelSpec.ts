import { UserModel } from '../../models/userModel';
import { User } from '../../types/userTypes';

const userModel = new UserModel();

describe('Test UserModel', () => {
    let demoUser: User;

    it('should have "create" method', (): void => {
        expect(userModel.create).toBeDefined();
    });

    it('"create" method should create a new user', async (): Promise<void> => {
        const newUser3: User = {
            firstname: 'Test3',
            lastname: 'Test3',
            username: 'Test3',
            password: 'Test3',
        };
        const createUser = await userModel.create(newUser3);
        demoUser = createUser;
        expect(createUser.firstname).toBe(newUser3.firstname);
        expect(createUser.lastname).toBe(newUser3.lastname);
        expect(createUser.username).toBe(newUser3.username);
    });

    it('should have "index" method', (): void => {
        expect(userModel.index).toBeDefined();
    });

    it('"index" method should return an array of users', async (): Promise<void> => {
        const users = await userModel.index();
        expect(users.length > 0).toBeTrue();
    });

    it('should have "showById" method', (): void => {
        expect(userModel.showById).toBeDefined();
    });

    it('"showById" method should return "User" object', async (): Promise<void> => {
        const user = await userModel.showById(demoUser.id as number);
        expect(user).toEqual(demoUser);
    });

    it('should have "showByUsername" method', (): void => {
        expect(userModel.showByUsername).toBeDefined();
    });

    it('"showByUsername" method should return "User" object', async (): Promise<void> => {
        const user = await userModel.showByUsername(demoUser.username, 'Test3');
        expect(user).toEqual(demoUser);
    });

    it('should have "delete" method', (): void => {
        expect(userModel.delete).toBeDefined();
    });

    it('"delete" method should return an object with "success" property', async (): Promise<void> => {
        const deletion = await userModel.delete(demoUser.id as number);
        expect(deletion.success).toBeTrue();
    });
});
