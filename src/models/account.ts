import { model, Schema, connect, Document } from 'mongoose';

connect('mongodb://localhost/K5-Nodemy');

interface IAccount {
    username: string;
    password: string;
    role: string;
}

const accountSchema: Schema = new Schema<IAccount>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
}, {
    collection: 'account'
});

const AccountModel = model<IAccount>('account', accountSchema)
export { AccountModel }