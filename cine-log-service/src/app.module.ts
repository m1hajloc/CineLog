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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'docker11!!',
      database: 'CineLog',
      entities: [User,Movie,Status,Genre,WatchlistItem,Review],
      synchronize: true,
      logging: true,
      options: {
        encrypt: false, // ⛔ bez TLS
        trustServerCertificate: true, // ✅ jer koristiš lokalnu instancu bez sertifikata
      },
    }),
    UserModule,
    AuthModule,
    MovieModule,
    ReviewModule,
    WatchlistItemModule,
    StatusModule,
    GenreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
