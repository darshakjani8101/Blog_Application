import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { authStyles } from "../../styles/auth-styles";
import { ImBlogger } from "react-icons/im";
import { useState } from "react";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <Box sx={authStyles.container}>
      <Box sx={authStyles.logoTitle}>
        <ImBlogger
          size={"30px"}
          style={{
            borderRadius: "50%",
            padding: "10px",
            background: "#6c5252",
          }}
        />
        <Typography sx={authStyles.logoText}>devBlog</Typography>
      </Box>
      <Box sx={authStyles.formContainer}>
        <Typography sx={authStyles.logoText}>
          {isSignup ? "Signup" : "Login"}
        </Typography>
        {/* @ts-ignore */}
        <form style={authStyles.form}>
          {isSignup && (
            <>
              <InputLabel aria-label="name" />
              <TextField
                margin="normal"
                InputProps={{ style: { borderRadius: 10 } }}
                aria-label="name"
                label="Name"
                type="text"
              />
            </>
          )}
          <InputLabel aria-label="email" />
          <TextField
            margin="normal"
            InputProps={{ style: { borderRadius: 10 } }}
            aria-label="email"
            label="Email"
            type="email"
          />
          <InputLabel aria-label="password" />
          <TextField
            margin="normal"
            InputProps={{ style: { borderRadius: 10 } }}
            aria-label="password"
            label="Password"
            type="password"
          />
          <Button variant="contained" sx={authStyles.submitBtn}>
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button
            onClick={() => setIsSignup((prev) => !prev)}
            //@ts-ignore
            sx={{ ...authStyles.submitBtn, ...authStyles.switchBtn }}
          >
            Switch to {isSignup ? "Login" : "Signup"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Auth;
