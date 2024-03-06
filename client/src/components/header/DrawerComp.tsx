import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { AiFillProfile, AiOutlineLogin, AiOutlinePlus } from "react-icons/ai";
import { BiHomeAlt2, BiLogOut } from "react-icons/bi";
import { BsListColumns } from "react-icons/bs";
import { FaHamburger } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";

type Props = {
  isLoggedIn: boolean;
};

type ListItem = {
  name: string;
  url: string;
  icon: JSX.Element;
  cb?: () => void | null;
};

const DrawerComp = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const authLinks = [
    { name: "Home", url: "/", icon: <BiHomeAlt2 /> },
    { name: "Blogs", url: "/blogs", icon: <BsListColumns /> },
    { name: "Add Blog", url: "/add", icon: <AiOutlinePlus /> },
    { name: "Profile", url: "/profile", icon: <AiFillProfile /> },
    { name: "Logout", url: "/", icon: <BiLogOut />, cb: handleLogout },
  ];

  const nonAuthLinks = [
    { name: "Home", url: "/", icon: <BiHomeAlt2 /> },
    { name: "Blogs", url: "/blogs", icon: <BsListColumns /> },
    { name: "Auth", url: "/auth", icon: <AiOutlineLogin /> },
  ];

  const handleNavigate = (url: string, cb: (() => void) | null) => {
    setOpen(false);
    cb && cb();
    return navigate(url);
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List>
          {(props.isLoggedIn ? authLinks : nonAuthLinks).map(
            (item: ListItem, index: number) => (
              <ListItemButton
                key={index}
                onClick={() =>
                  handleNavigate(item.url, item.cb ? item.cb : null)
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontFamily: "Work Sans" }}
                >
                  {item.name}
                </ListItemText>
              </ListItemButton>
            )
          )}
        </List>
      </Drawer>
      <IconButton
        sx={{ ml: "auto", color: "inherit" }}
        onClick={() => setOpen(true)}
      >
        <FaHamburger />
      </IconButton>
    </div>
  );
};

export default DrawerComp;
