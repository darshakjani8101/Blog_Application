import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  LinearProgress,
  Typography,
} from "@mui/material";
import { profileStyles } from "../../../styles/profile-styles";
import BlogItem from "../../blogs/BlogItem";
import { useQuery } from "@apollo/client";
import { GET_USER_BLOGS } from "../../../graphql/queries";
import { BlogType } from "../../../types/types";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("userData") as string);
  const { loading, data, error } = useQuery(GET_USER_BLOGS, {
    variables: {
      id: userData.id,
    },
  });

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return (
      <Dialog open={true}>
        <DialogContent>
          Error while fetching user profile. Please refresh the page.
        </DialogContent>
      </Dialog>
    );
  }

  return (
    data && (
      <Box sx={profileStyles.container}>
        <Box sx={profileStyles.blogsContainer}>
          <Typography sx={profileStyles.text} variant="h4">
            My Posts
          </Typography>
          <Box sx={profileStyles.cardsContainer}>
            {data.user.blogs.map((blog: BlogType) => (
              <BlogItem key={blog.id} blog={blog} showActions={true} />
            ))}
          </Box>
        </Box>
        <Box sx={profileStyles.profileContainer}>
          <Box sx={profileStyles.userContainer}>
            <Avatar sx={profileStyles.avatar}></Avatar>
            <Typography variant="h4" fontFamily="Work Sans">
              {userData.name}
            </Typography>
            <Typography variant="h6" fontFamily="Work Sans">
              Email: {userData.email}
            </Typography>
            <Typography variant="h6" fontFamily="monospace">
              You wrote {data.user.blogs.length as string} blogs 🎉
            </Typography>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default Profile;
