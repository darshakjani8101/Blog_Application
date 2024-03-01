import { SxProps } from "@mui/material";

export type UserType = {
  id: string;
  name: string;
  email: string;
  blogs: BlogType[];
  comments: CommentType[];
};

export type BlogType = {
  id: string;
  title: string;
  content: string;
  date: Date;
  user: UserType;
  comments: CommentType[];
};

export type CommentType = {
  id: string;
  text: string;
  date: Date;
  blog: BlogType;
  user: UserType;
};

export type Styles = {
  [key: string]: SxProps;
};
