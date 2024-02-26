import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { BlogType, CommentType, UserType } from "../schema/schema";
import User from "../models/User";
import Blog from "../models/Blog";
import Comment from "../models/Comment";
import { Document } from "mongoose";
import { compareSync, hashSync } from "bcryptjs";

type DocumentType = Document<any, any, any>;

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    //get all users
    users: {
      type: GraphQLList(UserType),
      async resolve() {
        try {
          return await User.find();
        } catch (error) {
          return new Error(error);
        }
      },
    },

    //get all blogs
    blogs: {
      type: GraphQLList(BlogType),
      async resolve() {
        try {
          return await Blog.find();
        } catch (error) {
          return new Error(error);
        }
      },
    },

    //get all comments
    comments: {
      type: GraphQLList(CommentType),
      async resolve() {
        try {
          return await Comment.find();
        } catch (error) {
          return new Error(error);
        }
      },
    },
  },
});

const mutations = new GraphQLObjectType({
  name: "mutations",
  fields: {
    //user signup
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, email, password }) {
        let existingUser: DocumentType;
        try {
          existingUser = await User.findOne({ email });
          if (existingUser) return new Error("User already exist!");
          const encryptedPassword = hashSync(password);
          const user = new User({ name, email, password: encryptedPassword });
          return await user.save();
        } catch (error) {
          return new Error(error);
        }
      },
    },

    //user login
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { email, password }) {
        let existingUser: DocumentType;
        try {
          existingUser = await User.findOne({ email });
          if (!existingUser) return new Error("User is not registered!");
          const decryptedPassword = compareSync(
            password,
            //@ts-ignore
            existingUser.password
          );
          if (!decryptedPassword) return new Error("Incorrect password!");
          return existingUser;
        } catch (error) {
          return new Error(error);
        }
      },
    },

    //create blog
    addBlog: {
      type: BlogType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { title, content, date }) {
        let blog: DocumentType;
        try {
          const blog = new Blog({ title, content, date });
          return await blog.save();
        } catch (error) {
          return new Error(error);
        }
      },
    },

    //update blog
    updateBlog: {
      type: BlogType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { id, title, content }) {
        let existingBlog: DocumentType;
        try {
          existingBlog = await Blog.findById(id);
          if (!existingBlog) return new Error("Blog does not exist!");
          return await Blog.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
          );
        } catch (error) {
          return new Error(error);
        }
      },
    },

    //delete blog
    deleteBlog: {
      type: BlogType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { id }) {
        let existingBlog: DocumentType;
        try {
          existingBlog = await Blog.findById(id);
          if (!existingBlog) return new Error("Blog does not exist!");
          return await Blog.findByIdAndDelete(id);
        } catch (error) {
          return new Error(error);
        }
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: mutations });
