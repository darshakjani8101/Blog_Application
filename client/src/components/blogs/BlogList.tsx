import { Box } from "@mui/material";
import { BlogType } from "../../types/types";
import { blogStyles } from "../../styles/blog-list-styles";
import BlogItem from "./BlogItem";

type Props = {
  blogs: BlogType[];
};

const BlogList = (props: Props) => {
  console.log(props.blogs);
  return (
    <Box sx={blogStyles.container}>
      {props.blogs.map((blog: BlogType, index: number) => (
        <BlogItem key={index} blog={blog} />
      ))}
    </Box>
  );
};

export default BlogList;
