import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Homepage from "./components/home/Homepage";
import Blogs from "./components/blogs/Blogs";
import Auth from "./components/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth-slice";
import AddBlog from "./components/blogs/AddBlog";
import Profile from "./components/header/user/Profile";
import ViewBlog from "./components/blogs/ViewBlog";
import UpdateBlog from "./components/blogs/UpdateBlog";
import NotFound from "./components/notFound/NotFound";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn: boolean = useSelector((state: any) => state.isLoggedIn);

  useEffect(() => {
    const data: string = localStorage.getItem("userData") as string;
    if (JSON.parse(data) !== null) {
      dispatch(authActions.login());
    }
  }, []);

  return (
    <div className="wrapper">
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blogs" element={<Blogs />} />
          {!isLoggedIn && <Route path="/auth" element={<Auth />} />}
          {isLoggedIn && <Route path="/add" element={<AddBlog />} />}
          {isLoggedIn && <Route path="/profile" element={<Profile />} />}
          <Route path="/blog/view/:id" element={<ViewBlog />} />
          {isLoggedIn && (
            <Route path="/blog/update/:id" element={<UpdateBlog />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
