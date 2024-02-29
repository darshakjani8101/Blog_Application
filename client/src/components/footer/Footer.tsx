import { Box, Button, Typography } from "@mui/material";
import { homepageStyles } from "../../styles/homepage-styles";

const Footer = () => {
  return (
    <Box sx={homepageStyles.footerContainer}>
      <Button variant="contained" sx={homepageStyles.footerBtn}>
        View Articles
      </Button>
      <Typography sx={homepageStyles.footerText}>
        Made with &#x1F498; by DJ
      </Typography>
      <Button variant="contained" sx={homepageStyles.footerBtn}>
        Publish One
      </Button>
    </Box>
  );
};

export default Footer;
