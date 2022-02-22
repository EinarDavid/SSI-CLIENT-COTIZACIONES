
import './App.css';
import { BusquedaCotizacion } from './views/BusquedaCotizacion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VistaCotizacion } from './views/VistaCotizacion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BusquedaCotizacion />} />
        <Route path='/cot/edit' element={<VistaCotizacion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


    // <>
    //   <BusquedaCotizacion />
    // </>