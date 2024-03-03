import { CSSProperties } from "react";
import { Styles } from "../types/types";

export const addStyles: Styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  blogHeader: {
    display: "flex",
    justifyContent: "space-around",
    fontWeight: "bold",
    padding: 3,
    alignItems: "center",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
};

export const htmlElmStyles: { [key: string]: CSSProperties } = {
  h2: {
    fontSize: "40px",
    fontFamily: "Work Sans",
    fontWeight: 500,
    marginLeft: "50px",
    marginRight: "50px",
    marginTop: "30px",
    outline: "none",
  },
  p: {
    fontSize: "18px",
    fontFamily: "Work Sans",
    marginLeft: "50px",
    marginRight: "50px",
    marginTop: "30px",
    outline: "none",
    border: "none",
    minHeight: "300px",
  },
};
