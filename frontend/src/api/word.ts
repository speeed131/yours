import axios from "axios";
import {
    IWord,
} from "@/interfaces/api";
import { utils } from "@/utils";


export const word = {
    async postWord(request_data: IWord) {
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

    async getWords() {
      try {
        const token: string | null = utils.getLocalToken();
        const res = await axios.post<IWord[]>(
            "http://0.0.0.0:8000/words",
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

    async getWord(word_id: number) {
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

    async deleteWord(word_id: number) {
        try {
            const token: string | null = utils.getLocalToken();
            const res = await axios.post<IWord>(
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
    }
};