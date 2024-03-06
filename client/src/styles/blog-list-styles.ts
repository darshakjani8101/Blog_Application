import { Styles } from "../types/types";

const colors = [
  "#ee1d25",
  "#faa31a",
  "#97C83B",
  "#0085cc",
  "#e8ac1c",
  "#4981b3",
  "#00a895",
  "#ee008c",
  "#ce521d",
  "#9cb46f",
  "#9a869e",
  "#2dacbf",
  "#bcd634",
];

export const randomBgColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const blogStyles: Styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: 5,
    flexWrap: "wrap",
    mt: 2,
    mb: 3,
  },
  card: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    height: "70vh",
    transition: "transform 1s",
    ":hover": {
      transform: "scale(1.02)",
      boxShadow: "10px 10px 20px #ccc",
    },
  },
  cardHeader: {
    fontFamily: "Work Sans",
    fontSize: "72 px",
    height: "35%",
    padding: 1,
    mb: 2,
    color: "white",
    ":hover": {
      cursor: "pointer",
    },
  },
  dateContainer: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  cardContent: {
    width: "100%",
    height: "65%",
    fontSize: "20px",
    fontWeight: "500",
  },
  title: {
    fontWeight: "600",
    m: 1,
    //color: "white",
    //textTransform: "uppercase",
    //textDecoration: "underline",
    textUnderlineOffset: "5px",
    fontFamily: "Work Sans",
    textShadow: "2px 7px 20px #000",
  },
  contentText: {
    padding: 2,
    fontSize: "20px",
    fontWeight: "500",
  },
};
