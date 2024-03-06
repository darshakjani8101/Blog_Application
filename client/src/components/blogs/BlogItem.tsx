import { Box, Card, CardActions, IconButton, Typography } from "@mui/material";
import { BlogType } from "../../types/types";
import { blogStyles, randomBgColor } from "../../styles/blog-list-styles";
import { FcCalendar } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { DELETE_BLOG } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";

type Props = {
  blog: BlogType;
  showActions?: boolean;
};

const BlogItem = (props: Props) => {
  const navigate = useNavigate();
  const [deleteBlog] = useMutation(DELETE_BLOG);

  const handleCardClick = () => {
    return navigate(`/blog/view/${props.blog.id}`);
  };

  const editHandler = () => {
    return navigate(`/blog/update/${props.blog.id}`);
  };

  const deleteHandler = async () => {
    try {
      await deleteBlog({
        variables: { id: props.blog.id },
      });
      return navigate("/profile");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Card sx={blogStyles.card}>
      {props.showActions && (
        <CardActions>
          <IconButton onClick={editHandler}>
            <AiOutlineEdit />
          </IconButton>
          <IconButton onClick={deleteHandler}>
            <AiOutlineDelete />
          </IconButton>
        </CardActions>
      )}
      <Box
        onClick={handleCardClick}
        sx={{ ...blogStyles.cardHeader, bgcolor: randomBgColor() }}
      >
        <Box sx={blogStyles.dateContainer}>
          <FcCalendar size={"25px"} />
          <Typography fontSize={"20px"} variant="caption">
            {new Date(Number(props.blog.date)).toDateString()}
          </Typography>
        </Box>
        <Typography variant="h4" sx={blogStyles.title}>
          {props.blog.title}
        </Typography>
      </Box>
      <Box sx={blogStyles.cardContent}>
        <Typography sx={blogStyles.contentText}>
          {props.blog.content}
        </Typography>
      </Box>
    </Card>
  );
};

export default BlogItem;
