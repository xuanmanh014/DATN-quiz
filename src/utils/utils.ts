import { IUser } from "@/types/user/index.type";

export const quizOrQuizzes = (length: number) => {
    if (length > 1) return "quizzes";
    return "quiz";
}

export function convertCamelCase(str: string) {
    const spacedString = str.replace(/([A-Z])/g, ' $1');
    return spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
}

export function mapUserInformations(user: IUser) {
    return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
    } as IUser
}