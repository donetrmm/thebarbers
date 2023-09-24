import React from 'react'
import Prueba from "./Prueba"
import LandingPage from "./components/user/LandingPage/TheBarbers";
import Inicio from './components/user/forms/Inicio';
import Menu from './components/user/menu/Menu';
import AgeCitaU from './components/user/agendarCita/AgeCitaU';
import VerBarberoU from "./components/user/verBarberoU/VerBarberoU";
import ConfirmarCita from "./components/user/confirmarCita/ConfirmarCita"
import CitasPendientes from "./components/user/citasPendientes/CitasPendientes";

import MenuAdmin from './components/admin/menuAdmin/MenuAdmin';
import AdminBarbero from './components/admin/adminBarbero/AdminBarbero';
import AgregarBarbero from './components/admin/adminBarbero/AgregarBarbero';
import EliminarBarbero from './components/admin/adminBarbero/EliminarBarbero';
import VerBarberoAdmin from './components/admin/adminBarbero/VerBarberoAdmin';
import AdminServi from "./components/admin/adminServi/AdminServi";
import AgregarServicio from './components/admin/adminServi/AgregarServicio';
import EliminarServicio from "./components/admin/adminServi/EliminarServicio";
import EditarServicio from './components/admin/adminServi/EditarServicio';
import AdminJornada from './components/admin/adminHorario/AdminJornada';
import AdminCita from './components/admin/adminCitas/AdminCita';
import AgregarCita from './components/admin/adminCitas/AgregarCita';
import EliminarCita from './components/admin/adminCitas/EliminarCita';

import AdminHistorial from './components/admin/adminHistorial/AdminHistorial';

import RegisUser from "./components/user/forms/RegisUser";

import GenerarReporte from "./components/admin/GenerarReporte";
import GenerarGrafica from "./components/admin/GenerarGrafica";


import {
  BrowserRouter,
  Routes,
  Route,
  
  
}
from "react-router-dom";

export default function App() {


  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='Login' element={<Inicio/>} />
        <Route path='RegistrarUsuario' element={<RegisUser/>} />
        <Route path='Menu' element={<Menu/>} />
        <Route path='AgendarCita' element={<AgeCitaU/>} />
        <Route path='VerBarbero' element={<VerBarberoU/>} />
        <Route path='ConfirmarCita/:CitaID' element={<ConfirmarCita/>} />
        <Route path='CitasPendientes' element={<CitasPendientes/>} />
        <Route exact path='/' element={<LandingPage/>} />
        <Route path='MenuAdmin' element={<MenuAdmin/>} />
        <Route path='Prueba' element={<Prueba/>} />
        <Route path='AdminBarbero' element={<AdminBarbero/>} />
        <Route path="AgregarBarbero" element={<AgregarBarbero/>} />
        <Route path="EliminarBarbero" element={<EliminarBarbero/>} />
        <Route path="EditarBarbero" element={<VerBarberoAdmin/>} />
        <Route path='AdminServicio' element={<AdminServi/>} />
        <Route path='AgregarServicio' element={<AgregarServicio/>} />
        <Route path='EliminarServicio' element={<EliminarServicio/>}/>
        <Route path='EditarServicio' element={<EditarServicio/>}/>
        <Route path='AdminJornada' element={<AdminJornada/>}/>
        <Route path='AdminCita' element={<AdminCita/>}/>
        <Route path='AgregarCitaAdmin' element={<AgregarCita/>}/>
        <Route path='EliminarCitaAdmin' element={<EliminarCita/>}/>
        <Route path='AdminHistorial' element={<AdminHistorial/>}/>

        <Route path='GenerarReporte' element={<GenerarReporte/>}/>
        <Route path='GenerarGrafica' element={<GenerarGrafica/>}/>

      </Routes>
      </BrowserRouter>
  </div>
  );
  

  }