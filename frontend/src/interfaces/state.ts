import { IWord } from "./api";

export type State = WordState

export interface WordState {
  words: IWord[]
}