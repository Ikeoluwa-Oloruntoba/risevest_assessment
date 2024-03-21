import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './features/user/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { CommentModule } from './features/comment/comment.module';
import { AuthModule } from './features/auth/auth.module';
import { PostModule } from './features/post/post.module';
import { HelperModule } from './helpers/helper.module';
import { RepositoryModule } from './prisma-repositories/repository.module';
import { RevokedTokenMiddleware } from './common/middleware/access-token.middleware';

@Module({
  imports: [UserModule, PrismaModule, PostModule, CommentModule, AuthModule, HelperModule, RepositoryModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RevokedTokenMiddleware)
      .exclude(
        '/v1',
        '/v1/auth/user/signin',
        '/v1/auth/user/signout',
        'v1/user/create',
        'v1/user/get',
        'v1/post/get',
        'v1/user/get/top-3',
      )
      .forRoutes('*');
  }
}
