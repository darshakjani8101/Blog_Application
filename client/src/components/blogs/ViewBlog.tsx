import { Avatar, Box, IconButton, TextField, Typography } from "@mui/material";
import { viewBlogStyles } from "../../styles/view-blog-styles";
import { FaComments } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { ImMail } from "react-icons/im";

const ViewBlog = () => {
  return (
    <Box sx={viewBlogStyles.container}>
      <Box sx={viewBlogStyles.profileHeader}>
        <Typography sx={viewBlogStyles.headerText}>Darshak Jani</Typography>
        <Box sx={viewBlogStyles.profileHeaderItems}>
          <ImMail size={20} />
          <Typography sx={viewBlogStyles.headerText}>
            darshak@email.com
          </Typography>
        </Box>
      </Box>
      <Typography sx={viewBlogStyles.blogTitle}>
        Real-time GraphQL Magic
      </Typography>
      <Typography sx={viewBlogStyles.blogContent}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora eaque
        optio illum autem animi error voluptatibus alias quisquam vel, tempore
        facilis blanditiis ea nulla neque, consequatur a? Cumque, minima
        consectetur.
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
            type="textarea"
            sx={viewBlogStyles.TextField}
            InputProps={{
              style: {
                width: "50vw",
                borderRadius: "10px",
                fontFamily: "Work Sans",
              },
            }}
          />
          <IconButton>
            <BiSend size={30} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={viewBlogStyles.comments}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Box key={item} sx={viewBlogStyles.commentItem}>
            <Avatar sx={viewBlogStyles.commentAvatar}>DJ</Avatar>
            <Typography sx={viewBlogStyles.commentText}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
              praesentium placeat necessitatibus vel eos tenetur eum, commodi
              corrupti neque at, rem distinctio ipsa laboriosam soluta amet
              dignissimos sapiente explicabo quas?
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ViewBlog;
