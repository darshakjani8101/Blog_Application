import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../../graphql/queries";
import BlogList from "./BlogList";
import { LinearProgress } from "@mui/material";

const Blogs = () => {
  const { loading, data, error } = useQuery(GET_BLOGS);

  if (error) return <p>Error...</p>;

  return loading ? (
    <LinearProgress />
  ) : (
    data && (
      <div>
        <BlogList blogs={data.blogs} />
      </div>
    )
  );
};

export default Blogs;
