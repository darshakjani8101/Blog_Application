import { Styles } from "../types/types";

export const viewBlogStyles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 2,
  },
  profileHeader: {
    display: "flex",
    flexDirection: "column",
    padding: 1,
  },
  headerText: {
    fontFamily: "Arvo",
    fontSize: "18px",
  },
  profileHeaderItems: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  dateContainer: {
    display: "flex",
    alignItems: "center",
    ml: "auto",
    gap: 1,
  },
  blogTitle: {
    fontSize: "30px",
    fontFamily: "Arvo",
    fontWeight: 700,
    textAlign: "center",
    textShadow: "2px 2px 12px #ccc",
  },
  blogContent: {
    padding: 5,
    fontSize: "20px",
    fontFamily: "Work Sans",
    textAlign: "justify",
    textShadow: "1px 1px 6px #ccc",
  },
  commentBox: {
    display: "flex",
    alignItems: "center",
    padding: 2,
    gap: 2,
  },
  commentInputContainer: {
    padding: 2,
    width: "98%",
    height: "40%",
  },
  inputLayout: {
    display: "flex",
    gap: 2,
    alignItems: "center",
  },
  textField: {
    width: "100%",
  },
  comments: {
    display: "flex",
    flexDirection: "column",
  },
  commentItem: {
    display: "flex",
    alignItems: "center",
    padding: 1,
    margin: 1,
    gap: 1,
    borderBottom: "1px solid black",
    height: "auto",
  },
  commentAvatar: {
    padding: 1,
    color: "white",
    bgcolor: "#404040",
  },
  commentText: {
    margin: 2,
    fontSize: "16px",
    fontFamily: "Arvo",
    fontWeight: "600",
  },
};
