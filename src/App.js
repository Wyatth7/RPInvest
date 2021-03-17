// COMPONENTS
import { Route, Switch } from "react-router";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import Homepage from "./components/pages/HomePage/HomePage";

// STYLES
import "./styles/css/styles.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/" component={Homepage} />
        <Route path="/about" component={Homepage} />
        <Route path="/login" component={Homepage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
