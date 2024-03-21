import { Prisma, User } from "@prisma/client";

// Define a new type for the user without sensitive details
type SafeUser = Omit<User, 'password' | 'security_pin'>;

export interface UserInterface{


    createUser(data: any): Promise<SafeUser> 

    findUserByAny(uniqueId: any): Promise<SafeUser>

    updateUser(id: number, data: Prisma.UserUpdateInput): Promise<SafeUser>
}