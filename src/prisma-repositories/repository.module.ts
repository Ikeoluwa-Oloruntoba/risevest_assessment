import { Global, Module } from "@nestjs/common";
import { PrismaUserRepository } from "./user.repo";
import { PrismaUserTokenRepository } from "./usertokens.repo";
import { PrismaPostsRepository } from "./post.repo";
import { PrismaCommentsRepository } from "./comment.repo";


@Global()
@Module({
    providers: [
        PrismaUserRepository,
        PrismaUserTokenRepository,
        PrismaPostsRepository,
        PrismaCommentsRepository
    ],
    exports: [
        PrismaUserRepository,
        PrismaUserTokenRepository,
        PrismaPostsRepository,
        PrismaCommentsRepository
    ]
})

export class RepositoryModule {}