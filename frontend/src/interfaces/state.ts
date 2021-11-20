import { IWord, IUser, IDaily } from "./api";

// export type any = { WordState | UserState | DailyState}

// export interface any {
//   <WordState>
//   <UserState>
//   <DailyState>
// }

export interface WordState {
  words: IWord[];
}

export interface UserState {
  users: IUser[];
  loginUser: IUser;
}

export interface DailyState {
  dailies: IDaily[];
}
