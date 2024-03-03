import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { authStyles } from "../../styles/auth-styles";
import { ImBlogger } from "react-icons/im";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { USER_LOGIN, USER_SIGNUP } from "../../graphql/mutations";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const [login] = useMutation(USER_LOGIN);
  const [signup] = useMutation(USER_SIGNUP);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onResReceived = (data: any) => {
    if (data.signup) {
      const { id, email, name } = data.signup;
      localStorage.setItem("userData", JSON.stringify({ id, email, name }));
    } else {
      const { id, email, name } = data.login;
      localStorage.setItem("userData", JSON.stringify({ id, email, name }));
    }
    dispatch(authActions.login());
    return navigate("/blogs");
  };

  const onSubmit = async ({ name, email, password }: Inputs) => {
    if (isSignup) {
      //signup
      try {
        const res = await signup({ variables: { name, email, password } });
        if (res.data) {
          onResReceived(res.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    } else {
      //login
      try {
        const res = await login({ variables: { email, password } });
        if (res.data) {
          onResReceived(res.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)} style={authStyles.form}>
          {isSignup && (
            <>
              <InputLabel aria-label="name" />
              <TextField
                helperText={Boolean(errors.name) ? "Name is required" : ""}
                error={Boolean(errors.name)}
                margin="normal"
                InputProps={{ style: { borderRadius: 10 } }}
                aria-label="name"
                label="Name"
                type="text"
                {...register("name", { required: true })}
              />
            </>
          )}
          <InputLabel aria-label="email" />
          <TextField
            helperText={Boolean(errors.email) ? "Email is invalid" : ""}
            error={Boolean(errors.email)}
            margin="normal"
            InputProps={{ style: { borderRadius: 10 } }}
            aria-label="email"
            label="Email"
            type="email"
            {...register("email", {
              required: true,
              validate: (val: string) =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val),
            })}
          />
          <InputLabel aria-label="password" />
          <TextField
            helperText={
              Boolean(errors.password)
                ? "Password should contain more than 5 chars."
                : ""
            }
            error={Boolean(errors.password)}
            margin="normal"
            InputProps={{ style: { borderRadius: 10 } }}
            aria-label="password"
            label="Password"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          <Button type="submit" variant="contained" sx={authStyles.submitBtn}>
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
