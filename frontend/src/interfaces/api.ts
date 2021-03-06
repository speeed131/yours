// define api interface

export interface IRegisterRequest {
  username: string;
  password: string;
}

export interface IRegisterResponse {
  access_token: string;
  token_type: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  token_type: string;
}

export interface IUser {
  id: number;
  username: string;
  email?: string;
  hashed_password?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IWord {
  id: number;
  user_id: number;
  name: string;
  part_of_speech: string;
  meaning_japanese: string;
  meaning_english: string;
  memo: string;
  remember_rating: number;
  is_remembered: boolean;
  remembered_at: string;
  created_at: Date;
  updated_at: Date;
  converted_created_at?: string;
}

export interface IDaily {
  id: number;
  user_id: number;
  title: string;
  meaning_japanese: string;
  meaning_english: string;
  is_open: boolean;
  opened_at: string;
  created_at: string;
  updated_at: string;
}

export interface IWordRequest {
  user_id: number;
  name: string;
  part_of_speech?: string;
  meaning_japanese?: string;
  meaning_english?: string;
  memo?: string;
  is_remembered?: boolean;
  remember_rating?: number;
  remembered_at?: string;
}
