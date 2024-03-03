import { Box, Button, Typography } from "@mui/material";
import { addStyles, htmlElmStyles } from "../../styles/add-blog-styles";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BLOG } from "../../graphql/mutations";

const AddBlog = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLParagraphElement | null>(null);
  const [addBlog] = useMutation(ADD_BLOG);

  const handlePublish = async () => {
    const title = headingRef.current?.innerText;
    const content = contentRef.current?.innerText;

    if (
      title &&
      title?.trim().length > 0 &&
      content &&
      content?.trim().length > 0
    ) {
      const date = new Date();
      const user = JSON.parse(localStorage.getItem("userData") as string).id;

      try {
        const res = await addBlog({
          variables: { title, content, date, user },
        });
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <Box sx={addStyles.container}>
      <Box sx={addStyles.blogHeader}>
        <Typography>Authored By: Darshak</Typography>
        <Button onClick={handlePublish} color="success" variant="contained">
          Publish
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
  );
};

export default AddBlog;
