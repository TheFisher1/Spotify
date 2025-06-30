import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import { MainSection } from "./MainSection";

export function App() {
  return (
    <Router>
      <AuthProvider>
        <MainSection />
      </AuthProvider>
    </Router>
  );
}