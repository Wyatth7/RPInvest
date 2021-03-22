// COMPONENTS
import { Route, Switch } from "react-router";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import Login from "./components/pages/Auth/Login/Login";
import Signup from "./components/pages/Auth/Signup/Signup";
import Homepage from "./components/pages/HomePage/HomePage";
import DashBoard from "./components/pages/DashBoard/DashBoard";

// STYLES
import "./styles/css/styles.css";
import Prices from "./components/pages/Prices/Prices";
import AboutMetals from "./components/pages/AboutMetals/AboutMetals";

function App() {
  return (
    <div className="App">
      <div className="main-wrapper">
        <Nav />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/about" component={Homepage} />
          <Route path="/dashboard" component={DashBoard} />
          <Route path="/values" component={Prices} />
          <Route path="/gold" component={AboutMetals} />
          <Route path="/" component={Homepage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
