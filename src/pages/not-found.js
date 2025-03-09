import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../components/background";
import MagicDustEffect from "../components/magic-dust";
import FireflyEffect from "../components/fireflies";
import '../styles/404.css';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(()=> {
    const mytimer = setTimeout(()=>{
      navigate('/');
    },5000);

    return () => clearTimeout(mytimer);
  },[navigate]);

  return (
    <div className="notFound-container">
      <Background/>
      <MagicDustEffect/>
      <FireflyEffect/>
      <h1> Page not Found. You will be automatically redirected to landing page. You can also click <Link to="/">here</Link> to manually go to the landing page.</h1>
    </div>
  )
}

export default NotFound;