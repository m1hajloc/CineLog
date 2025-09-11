import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { Movie } from './movie/entities/movie.entity';
import { ReviewModule } from './review/review.module';
import { WatchlistItemModule } from './watchlist-item/watchlist-item.module';
import { StatusModule } from './status/status.module';
import { GenreModule } from './genre/genre.module';
import { Status } from './status/entities/status.entity';
import { Genre } from './genre/entities/genre.entity';
import { WatchlistItem } from './watchlist-item/entities/watchlist-item.entity';
import { Review } from './review/entities/review.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT', '1433')),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Movie, Status, Genre, WatchlistItem, Review],
        synchronize: true,
        logging: true,
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
      }),
    }),
    UserModule,
    AuthModule,
    MovieModule,
    ReviewModule,
    WatchlistItemModule,
    StatusModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
