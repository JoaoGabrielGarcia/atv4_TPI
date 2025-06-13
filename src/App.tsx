import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Sidebar';
import ClientesPage from './pages/ClientesPage';
import ProdutosPage from './pages/ProdutosPage';
import ServicosPage from './pages/ServicosPage';
import RegistrarConsumoPage from './pages/RegistrarConsumoPage';
import { ClientesPage_Java } from './pages/ClientesPage_Java';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <div>
          <Navbar />
          <main className="pt-20 min-h-screen">
            <Routes>
              <Route path="/clientes" element={<ClientesPage />} />
              <Route path="/clientes-java" element={<ClientesPage_Java />} />
              <Route path="/produtos" element={<ProdutosPage />} />
              <Route path="/servicos" element={<ServicosPage />} />
              <Route path="/registrar-consumo" element={<RegistrarConsumoPage />} />
              <Route path="*" element={<Navigate to="/clientes" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
