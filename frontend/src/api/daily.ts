import axios from "axios";
import { IDaily } from "@/interfaces/api";
import { utils } from "@/utils";

export const daily = {
  async postDaily(request_data: IDaily) {
    try {
      const token = utils.getLocalToken();
      const res = await axios.post<IDaily>(
        "http://0.0.0.0:8000/dailies",
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

  async getDailies(): Promise<IDaily[] | undefined> {
    try {
      const token: string | null = utils.getLocalToken();
      const res = await axios.get<IDaily[]>("http://0.0.0.0:8000/dailies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch {
      console.error("api error");
    }
  },

  async getDaily(daily_id: number): Promise<IDaily | undefined> {
    try {
      const token: string | null = utils.getLocalToken();
      const res = await axios.get<IDaily>(
        `http://0.0.0.0:8000/dailies/${daily_id}`,
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

  async deleteDaily(daily_id: number): Promise<number | undefined> {
    try {
      const token: string | null = utils.getLocalToken();
      const res = await axios.delete<number>(
        `http://0.0.0.0:8000/dailies/${daily_id}`,
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
