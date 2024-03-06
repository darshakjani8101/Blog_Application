import {
  Box,
  Button,
  LinearProgress,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";
import { addStyles, htmlElmStyles } from "../../styles/add-blog-styles";
import { useEffect, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_BLOG } from "../../graphql/mutations";
import { useParams } from "react-router-dom";
import { GET_BLOG_BY_ID } from "../../graphql/queries";
import toast from "react-hot-toast";

const UpdateBlog = () => {
  const id = useParams().id;
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLParagraphElement | null>(null);
  const [updateBlog] = useMutation(UPDATE_BLOG);

  const { loading, data, error, refetch } = useQuery(GET_BLOG_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    if (data && headingRef.current && contentRef.current) {
      headingRef.current.innerText = data.blog.title;
      contentRef.current.innerText = data.blog.content;
    }
  }, [id, data]);

  const handlePublish = async () => {
    const title = headingRef.current?.innerText;
    const content = contentRef.current?.innerText;

    if (
      title &&
      title?.trim().length > 0 &&
      content &&
      content?.trim().length > 0
    ) {
      console.log(title, content);
      try {
        await updateBlog({
          variables: { id, title, content },
        });
        toast.promise(refetch(), {
          error: "Unexpected error!",
          success: "Updated successfully!",
          loading: "Hold on!",
        });
      } catch (error: any) {
        console.log(error);
      }
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
      <Box sx={addStyles.container}>
        <Box sx={addStyles.blogHeader}>
          <Typography>Authored By: Darshak</Typography>
          <Button onClick={handlePublish} color="success" variant="contained">
            Publish Update
          </Button>
        </Box>
        <Box sx={addStyles.formContainer}>
          <h2 ref={headingRef} style={htmlElmStyles.h2} contentEditable>
            Add your story title...
          </h2>
          <p ref={contentRef} style={htmlElmStyles.p} contentEditable>
            Describe your story...
          </p>
        </Box>
      </Box>
    )
  );
};

export default UpdateBlog;
