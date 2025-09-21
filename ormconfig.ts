import { DataSourceOptions } from "typeorm";
import { User } from './src/entities/user.entity';
import { Post } from './src/entities/post.entity';
import { Category } from './src/entities/category.entity';
import { Comment } from './src/entities/comment.entity';
import { Like } from './src/entities/like.entity';
import { Retweet } from './src/entities/retweet.entity';

const config: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3307),
  username: process.env.DB_USERNAME || "test",
  password: process.env.DB_PASSWORD || "test",
  database: process.env.DB_DATABASE || "twosun_test",
  synchronize: true,
  logging: true,
  entities: [User, Post, Category, Comment, Like, Retweet],
};

export default config;
