import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../../graphql/queries";
import BlogList from "./BlogList";
import { Dialog, DialogContent, LinearProgress } from "@mui/material";

const Blogs = () => {
  const { loading, data, error } = useQuery(GET_BLOGS);

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return (
      <Dialog open={true}>
        <DialogContent>
          Error while fetching blogs. Please refresh the page.
        </DialogContent>
      </Dialog>
    );
  }

  return (
    data && (
      <div>
        <BlogList blogs={data.blogs} />
      </div>
    )
  );
};

export default Blogs;
