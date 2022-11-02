import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { v1 } from './api';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      cors: {
        credentials: true,
      },
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({
        headers: req.headers,
        res,
        url: `${req.protocol} :// ${req.headers.host}`,
      }),
      sortSchema: true,
      debug: false,
      playground: true,
      path: '/graphql',
    }),
    // v1 apis
    v1.ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
