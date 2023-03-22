import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Context/userContext";
import Main from "./Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
