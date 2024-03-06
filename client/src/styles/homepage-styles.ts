import { Styles } from "../types/types";

export const homepageStyles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    gap: 4,
  },
  text: {
    fontFamily: "Work Sans",
    fontWeight: 400,
    fontSize: { lg: 50, md: 40, sm: 30, xs: 20 },
    textShadow: "12px 10px 10px #ccc",
  },
  image: {
    boxShadow: "10px 10px 25px #000",
    borderRadius: 20,
  },
  footerContainer: {
    bgcolor: "#404040",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "20vh",
    gap: "20px",
  },
  footerBtn: {
    borderRadius: 10,
    bgcolor: "blueviolet",
    width: "20%",
    maxWidth: "200px",
    ":hover": {
      bgcolor: "#bd63fa",
    },
    fontSize: { lg: 12, md: 12, sm: 8, xs: 8 },
  },
  footerText: {
    fontFamily: "Work Sans",
    fontWeight: 500,
    fontSize: { lg: 20, md: 18, sm: 12, xs: 10 },
    color: "white",
  },
};
