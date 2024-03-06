import { Box, Card, CardActions, IconButton, Typography } from "@mui/material";
import { BlogType } from "../../types/types";
import { blogStyles, randomBgColor } from "../../styles/blog-list-styles";
import { FcCalendar } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { DELETE_BLOG } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";

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
    toast.loading("Hold on!", { id: "deleteblog" });
    try {
      await deleteBlog({
        variables: { id: props.blog.id },
      });
      toast.success("Deleted successfully!", { id: "deleteblog" });
      return navigate("/profile");
    } catch (error: any) {
      console.log(error);
      toast.error("Unexpected error!", { id: "deleteblog" });
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
          <Typography
            fontFamily="Arvo"
            fontSize={{ lg: 16, md: 14, sm: 12, xs: 10 }}
            variant="caption"
          >
            {new Date(Number(props.blog.date)).toDateString()}
          </Typography>
        </Box>
        <Typography variant="h4" sx={blogStyles.title}>
          {props.blog.title.length > 30
            ? props.blog.title.slice(0, 30) + "..."
            : props.blog.title}
        </Typography>
        <Typography sx={blogStyles.author}>
          <FaUser />
          {props.blog.user.name}
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
