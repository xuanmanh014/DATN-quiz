import { IUser } from "@/types/user/index.type";

export const quizOrQuizzes = (length: number) => {
    if (length > 1) return "quizzes";
    return "quiz";
}

export function convertCamelCase(str: string) {
    const spacedString = str.replace(/([A-Z])/g, ' $1');
    return spacedString.charAt(0).toUpperCase() + spacedString.slice(1).toLowerCase();
}

export function mapUserInformations(user: IUser) {
    return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        joinDate: user.createdAt,
    } as IUser
}

export function isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

export function convertKebabToTitle(text: string): string {
    return text
        .split('-')
        .map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
}