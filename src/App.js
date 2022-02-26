
import './App.css';
import { BusquedaCotizacion } from './views/BusquedaCotizacion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BusquedaCotizacion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


    // <>
    //   <BusquedaCotizacion />
    // </>