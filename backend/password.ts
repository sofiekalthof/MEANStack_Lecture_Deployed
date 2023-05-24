// file to define the Password interface
import * as mongodb from "mongodb";

// the interface to create objects from server-side and send to the database
// -> also will allow us to apply json validation later on
// -> same interface as frontend!!!
// TODO: possible 1st task
export interface Password {
    _id?: mongodb.ObjectId;
    category: string;
    app: string;
    userName: string;
    encryptedPassword: string;
}