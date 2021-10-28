import axios from "axios";
import {
    IDaily
} from "@/interfaces/api";
import { utils } from "@/utils";


export const daily = {
    async postDaily(request_data: IDaily) {
        try {
            const token = utils.getLocalToken();
            const res = await axios.post(
                "http://0.0.0.0:8000/dailies",
                request_data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            return res.data;
        } catch {
            console.error("api error")
        }
    },

    async getDailies() {
        try {
            const token: string | null = utils.getLocalToken();
            const res = await axios.get(
                "http://0.0.0.0:8000/dailies",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            return res.data;
        } catch {
            console.error("api error")
        }
    },

    async getDaily(daily_id: number) {
        try {
            const token: string | null = utils.getLocalToken();
            const res = await axios.get(
                `http://0.0.0.0:8000/dailies/${daily_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
        } catch {
            console.error("api error");
        }
    },

    async deleteDaily(daily_id: number) {
        try {
            const token: string | null = utils.getLocalToken();
            const res = await axios.get(
                `http://0.0.0.0:8000/dailies/${daily_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            return res.data;
        } catch {
            console.error("api error");
        }
    }
}