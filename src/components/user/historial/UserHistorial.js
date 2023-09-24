import React, { useState, useEffect } from 'react';
import styles from './adminHistorial.module.css';
import { Button, Navbar, Nav, NavbarBrand, NavItem, Table } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function AdminHistorial() {
  const [citas, setCitas] = useState([]);
  


  const aler = (e) => {
    window.location.assign('/');
  };
  useEffect(() => {
    buscarCitas();
  });

  const getDataFromLocalStorage = () => {
    const data = localStorage.getItem('key');
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  };
  const credential = getDataFromLocalStorage();

  const buscarCitas = async () => {
    try {
      const response = await axios.get(`http://23.23.118.169/citasUser?numero=${credential}`);
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

  return (
    <>
      <div>
        <Navbar className={styles.nav}>
          <NavbarBrand href="/MenuAdmin">The Barber´s</NavbarBrand>
          <Nav className={styles.navb}>
            <NavItem>
              <Button className={styles.buttonNav} onClick={aler}>
                Cerrar Sesión
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
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

        <div>
          <Button className={styles.btn} color="primary" outline href="/MenuAdmin">
            Regresar al Menu
          </Button>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
