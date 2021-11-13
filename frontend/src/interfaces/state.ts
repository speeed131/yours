import { IWord, IUser } from "./api";

export type State = WordState

export interface WordState {
  words: IWord[]
}

export interface UserState {
  users: IUser[]
  loginUser: IUser
}