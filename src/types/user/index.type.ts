export interface IUser {
    _id?: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    password: string
    roles: string[]
    createdAt: Date
    updatedAt: Date
    updatedPasswordAt: Date
    joinDate: Date
}

export interface IProfileUpdate {
    firstName?: string
    lastName?: string
    phoneNumber?: string
}