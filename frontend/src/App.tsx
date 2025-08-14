import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PigeonsPage from "./pages/PigeonsPage";
import CustomersPage from "./pages/CustomersPage";
import LettersPage from "./pages/LettersPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/pigeons" element={<PigeonsPage />} />

          <Route path="/customers" element={<CustomersPage />} />

          <Route path="/letters" element={<LettersPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
