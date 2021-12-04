import axios from "axios";
import { IWord, IWordRequest } from "@/interfaces/api";
import { utils } from "@/utils";

export const word = {
  async postWord(request_data: IWordRequest): Promise<IWord | undefined> {
    try {
      const token: string | null = utils.getLocalToken();
      const res = await axios.post<IWord>(
        "http://0.0.0.0:8000/words",
        request_data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch {
      console.error("api error");
    }
  },

  async getWords(): Promise<IWord[] | undefined> {
    try {
      const token: string | null = utils.getLocalToken();
      console.log(token);
      const res = await axios.get<IWord[]>("http://0.0.0.0:8000/words", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch {
      console.error("api error");
    }
  },

  async getWord(word_id: number): Promise<IWord | undefined> {
    try {
      const token: string | null = utils.getLocalToken();
      const res = await axios.get<IWord>(
        `http://0.0.0.0:8000/words/${word_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch {
      console.error("api error");
    }
  },

  async deleteWord(word_id: number): Promise<number | undefined> {
    try {
      const token: string | null = utils.getLocalToken();
      const res = await axios.delete<number>(
        `http://0.0.0.0:8000/words/${word_id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch {
      console.error("api error");
    }
  },

  async updateWord(
    word_id: number,
    word_data: IWord
  ): Promise<IWord | undefined> {
    try {
      console.log(word_id);
      const token: string | null = utils.getLocalToken();
      const res = await axios.put<IWord>(
        `http://0.0.0.0:8000/words/${word_id}`,
        word_data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch {
      console.error("api error");
    }
  },
};
