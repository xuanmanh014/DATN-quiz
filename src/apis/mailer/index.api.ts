import Axios_instance from "@/axios/config";
import { IAuthValues } from "@/types/auth/index.type";

const url = "/mailer";

export const MailerApis = {
    forgotPassword: async (values: IAuthValues) => {
        const response = await Axios_instance.post(`${url}/forgot-password`, values);

        return response.data || {};
    }
}