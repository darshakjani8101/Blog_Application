import { Styles } from "../types/types";

export const profileStyles: Styles = {
  container: {
    display: "flex",
    flex: 1,
    minHeight: "70vh",
  },
  blogsContainer: {
    display: "flex",
    flex: 0.7,
    flexDirection: "column",
    padding: 1,
    border: "1px solid #404040",
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
    padding: 4,
  },
  text: {
    fontFamily: "Work Sans",
    fontWeight: 600,
    textAlign: "center",
  },
  profileContainer: {
    display: "flex",
    flex: 0.3,
    borderRight: "1px solid #404040",
    borderTop: "1px solid #404040",
    borderBottom: "1px solid #404040",
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: "auto",
    position: "fixed",
    top: "10",
    bottom: "10",
    left: "20",
    right: "20",
    gap: 2,
    padding: 4,
  },
  avatar: {
    width: "80px",
    height: "80px",
    bgcolor: "#404040",
  },
};
