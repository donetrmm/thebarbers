import React, { useState, useEffect } from 'react';
import styles from './adminHistorial.module.css';
import { Button, Navbar, Nav, NavItem, Table } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { LuCrown } from "react-icons/lu";
import logo from "../../img/logoTB.png"
export default function CitasPendientes() {
  const [citas, setCitas] = useState([]);

  const [clienteEncontrado, setClienteEncontrado] = useState([]);
  const [nombre, setNombre] = useState('');



  useEffect(() => {
    buscarCitas();
    buscarCliente();
  }, []);

  const getDataFromLocalStorage = () => {
    const data = localStorage.getItem('key');
    return data ? JSON.parse(data) : null;
  };
  const credential = getDataFromLocalStorage();

  const buscarCitas = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/citasUserPendientes?numero=${credential}`);
      const data = response.data;
      if (data.message) {
        toast.info(data.message);
        setCitas([]);
      } else {
        setCitas(data);
      }
    } catch (error) {
      console.error('Error al buscar las citas:', error);
      toast.error('Ocurrió un error al buscar las citas');
    }
  };
  const API_BASE_URL = 'http://23.23.118.169';
  const buscarCliente = () => {
    const credentials = getDataFromLocalStorage();
    if (credentials) {
      axios.get(`${API_BASE_URL}/getUsuario/${credentials}`)
        .then(response => {
          setClienteEncontrado(response.data);
          const cliente = response.data[0];
          setNombre(cliente.Nombre);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  return (
    <>
     {clienteEncontrado.map(cliente => (
                <React.Fragment key={cliente.Numero}>
   
      <div>
      <Navbar className={styles.nav} fixed='top' color='dark'>
      <a href="/">
      <img src={logo} alt='logo' className={styles.logo}></img>
      </a>
        <a href="/Menu" className={styles.titleNav}>The Barber´s</a>
          <Nav>
          <div className={styles.userNav}>
              <LuCrown className={styles.iconNav} />
              <h6 className={styles.titNav}> {cliente.Nombre}</h6> 
              
              </div>
            <NavItem>
              <Button className={styles.buttonNav} href='/Login' color='primary'>
                Cerrar Sesión
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
      <div className={styles.bodyT}> 
      <h2>Citas Pendientes</h2>
      </div>

      <div className={styles.body}>
    
        
        <Table bordered hover responsive className={styles.table}>
          <thead>
            <tr>
              <th>Nombre del cliente</th>
              <th>Apellidos</th>
              <th>Número</th>
              <th>Barbero</th>
              <th>Servicio</th>
              <th>Costo</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estatus</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.Numero}>
                <td>{cita.NombreCliente}</td>
                <td>{cita.Apellido}</td>
                <td>{cita.Numero}</td>
                <td>{cita.NombreBarbero}</td>
                <td>{cita.ServicioNombre}</td>
                <td>{"$"+cita.Costo}</td>
                <td>{cita.Fecha}</td>
                <td>{cita.Hora}</td>
                <td>{cita.Estatus}</td>
              </tr>
            ))}
          </tbody>
        </Table>
   
        </div>

        <div className={styles.body}>
          <Button className={styles.btn} color="primary" outline href="/Menu">
            Regresar al Menú
          </Button>
        </div>
      

      <ToastContainer />
   
        </React.Fragment>
        ))}
    </>
  );
}
