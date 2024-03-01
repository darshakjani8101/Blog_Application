import { AppBar, Box, Button, Tab, Tabs, Toolbar } from "@mui/material";
import { ImBlogger } from "react-icons/im";
import { headerStyles } from "../../styles/header-styles";
import { useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState(0);

  return (
    <AppBar sx={headerStyles.appBar}>
      <Toolbar>
        <ImBlogger
          size={"30px"}
          style={{
            borderRadius: "50%",
            padding: "10px",
            background: "#6c5252",
          }}
        />
        <Box sx={headerStyles.tabContainer}>
          <Tabs
            textColor="inherit"
            TabIndicatorProps={{ style: { background: "white" } }}
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            {/* @ts-ignore */}
            <Tab LinkComponent={Link} to="/" disableRipple label="Home" />
            {/* @ts-ignore */}
            <Tab LinkComponent={Link} to="/blogs" disableRipple label="Blogs" />
          </Tabs>
          <Link to="/auth" style={{ textDecoration: "none" }}>
            <Button endIcon={<BiLogInCircle />} sx={headerStyles.authBtn}>
              Auth
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
