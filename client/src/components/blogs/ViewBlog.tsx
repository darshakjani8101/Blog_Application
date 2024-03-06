import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { viewBlogStyles } from "../../styles/view-blog-styles";
import { FaComments } from "react-icons/fa";
import { BiSend, BiSolidCalendar } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { ImMail } from "react-icons/im";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BLOG_BY_ID } from "../../graphql/queries";
import { useForm } from "react-hook-form";
import { ADD_COMMENT, DELETE_COMMENT } from "../../graphql/mutations";
import toast from "react-hot-toast";

const getInitials = (name: string) => {
  const nameArr = name.split(" ");
  if (nameArr.length > 1) {
    return `${nameArr[0][0]}${nameArr[1][0]}`;
  } else {
    return `${nameArr[0][0]}${nameArr[0][1]}`;
  }
};

const ViewBlog = () => {
  const { register, handleSubmit } = useForm();
  const id = useParams().id;

  const user = JSON.parse(localStorage.getItem("userData") as string).id;

  const { loading, data, error, refetch } = useQuery(GET_BLOG_BY_ID, {
    variables: { id },
  });

  const [addCommentToBlog] = useMutation(ADD_COMMENT);
  const [deleteComment] = useMutation(DELETE_COMMENT);

  const addCommentHandler = async (data: any) => {
    const text = data.comment;
    if (text && text?.trim().length > 0) {
      const date = new Date();
      const blog = id;

      try {
        await addCommentToBlog({
          variables: { text, date, user, blog },
        });
        toast.promise(refetch(), {
          error: "Unexpected error!",
          success: "Comment added!",
          loading: "Hold on!",
        });
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const deleteCommentHandler = async (id: string) => {
    try {
      await deleteComment({
        variables: { id },
      });
      toast.promise(refetch(), {
        error: "Unexpected error!",
        success: "Comment deleted!",
        loading: "Hold on!",
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return (
      <Dialog open={true}>
        <DialogContent>
          Error while fetching blog. Please refresh the page.
        </DialogContent>
      </Dialog>
    );
  }

  return (
    data && (
      <Box sx={viewBlogStyles.container}>
        <Box sx={viewBlogStyles.profileHeader}>
          <Typography sx={viewBlogStyles.headerText}>
            {data.blog.user.name}
          </Typography>
          <Box sx={viewBlogStyles.profileHeaderItems}>
            <ImMail size={20} />
            <Typography sx={viewBlogStyles.headerText}>
              {data.blog.user.email}
            </Typography>
            <Box sx={viewBlogStyles.dateContainer}>
              <BiSolidCalendar size={20} />
              <Typography fontFamily="Work Sans" fontWeight={500}>
                {new Date(Number(data.blog.date)).toDateString()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography sx={viewBlogStyles.blogTitle}>{data.blog.title}</Typography>
        <Typography sx={viewBlogStyles.blogContent}>
          {data.blog.content}
        </Typography>
        <Box sx={viewBlogStyles.commentBox}>
          Comments: {"   "}
          <IconButton>
            <FaComments size={30} />
          </IconButton>
        </Box>
        <Box sx={viewBlogStyles.commentInputContainer}>
          <Typography margin={2} fontFamily={"Arvo"}>
            Add Your Comment
          </Typography>
          <Box sx={viewBlogStyles.inputLayout}>
            <TextField
              {...register("comment")}
              type="textarea"
              sx={viewBlogStyles.textField}
              InputProps={{
                style: {
                  width: "100%",
                  borderRadius: "10px",
                  fontFamily: "Work Sans",
                },
              }}
            />
            <IconButton onClick={handleSubmit(addCommentHandler)}>
              <BiSend size={30} />
            </IconButton>
          </Box>
        </Box>
        {data.blog.comments.length > 0 && (
          <Box sx={viewBlogStyles.comments}>
            {data.blog.comments.map((comment: any) => (
              <Box key={comment.id} sx={viewBlogStyles.commentItem}>
                <Avatar sx={viewBlogStyles.commentAvatar}>
                  {getInitials(comment.user.name)}
                </Avatar>
                <Typography sx={viewBlogStyles.commentText}>
                  {comment.text}
                </Typography>
                {user === comment.user.id && (
                  <IconButton
                    onClick={() => deleteCommentHandler(comment.id)}
                    sx={{ ml: "auto" }}
                    color="error"
                  >
                    <AiOutlineDelete />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    )
  );
};

export default ViewBlog;
