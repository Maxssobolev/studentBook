export interface IDecodedUser {
    id: string;
    role: 'admin' | 'headnman' | 'student';
    iat: number;
    exp: number;
}

export interface IRequestUser extends Request {
    user?: IDecodedUser;
}

export type IAuthRequest = IRequestUser & {
    headers: { authorization: string };
};