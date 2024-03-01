import { Styles } from "../types/types";

export const authStyles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  logoTitle: {
    display: "flex",
    gap: 1,
    alignItems: "center",
    justifyContent: "center",
    mt: 1,
    mb: 1,
  },
  logoText: {
    fontFamily: "Work  Sans",
    fontSize: "30px",
    textAlign: "center",
  },
  formContainer: {
    border: "1px solid #ccc",
    borderRadius: 5,
    padding: 5,
    boxShadow: "5px 5px 10px #000",
    mt: 5,
    mb: 5,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtn: {
    fontFamily: "Work Sans",
    mt: 2,
    mb: 1,
    width: "200px",
    borderRadius: 10,
    bgcolor: "#d27e20",
    color: "white",
    ":hover": {
      bgcolor: "#ff9400",
      boxShadow: "10px 10px 20px #ccc",
    },
  },
  switchBtn: {
    mt: 0,
    mb: 0,
    background: "transparent",
    color: "#273238",
    ":hover": {
      textDecoration: "underline",
      textUnderlineOffset: "5px",
    },
  },
};
