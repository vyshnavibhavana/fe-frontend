import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './Common/Layout';
import Login from './UI/Auth/LoginPage';
import Register from './UI/Auth/RegisterPage';
import Dashboard from './UI/Auth/Apps/Dashboard';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // Choose a theme you like
import 'primereact/resources/primereact.min.css';
// Core CSS
import 'primeicons/primeicons.css';                        // Icons
import 'primeflex/primeflex.css';                          // Flex utilities (optional)
import AnalyticsDashboard from './UI/Auth/Apps/AnalyticsDashboard';
import Settings from './UI/Auth/Apps/Settings';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<Login />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path='auth' element={<Register />}>
            <Route path='register' element={<Register />} />
          </Route>
          <Route path="/" element={<Layout><Dashboard /></Layout>}>
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          </Route>
          <Route path="/analytics" element={<Layout><AnalyticsDashboard /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
        </Routes>
      </BrowserRouter>
      {/* <AnalyticsDashboard /> */}
    </div>
  );
}

export default App;
