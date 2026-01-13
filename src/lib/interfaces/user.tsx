import { ITask } from "./task";

export interface IUser {
    name: string;
    email: string;
    tasks: ITask
}

