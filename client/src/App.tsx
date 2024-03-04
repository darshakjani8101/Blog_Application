import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Homepage from "./components/home/Homepage";
import Blogs from "./components/blogs/Blogs";
import Auth from "./components/auth/Auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth-slice";
import AddBlog from "./components/blogs/AddBlog";
import Profile from "./components/header/user/Profile";
import ViewBlog from "./components/blogs/ViewBlog";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const data: string = localStorage.getItem("userData") as string;
    if (JSON.parse(data) !== null) {
      dispatch(authActions.login());
    }
  }, []);

  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/add" element={<AddBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog/view/:id" element={<ViewBlog />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
