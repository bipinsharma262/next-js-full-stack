import { DefaultSession } from "next-auth"

export type IUser = DefaultSession["user"] & {
    id: string
    isOAuth: boolean
}

declare module "next-auth" {
    interface Session {
        user: IUser
    }
}