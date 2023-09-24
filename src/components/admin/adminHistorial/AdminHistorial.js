import React, { useState } from 'react';
import styles from './adminHistorial.module.css';
import { Button, Navbar, Nav, NavItem, Table,Row,Col,Placeholder } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import logo from "../../img/logoTB.png"

export default function AdminHistorial() {
  const [citas, setCitas] = useState([]);
  const [fecha, setFecha] = useState('');


  const buscarCitas = async () => {
    try {
      const response = await axios.get(`http://23.23.118.169/citas?fecha=${fecha}`);
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
      <Navbar className={styles.nav} color='dark' fixed='top'>
      <a href="/MenuAdmin">
      <img src={logo} alt='logo' className={styles.logo}></img>
      </a>

          <a href="/MenuAdmin" className={styles.titleNav}>The Barber´s</a>
          <Nav className={styles.navb}>
            <NavItem>
              <Button className={styles.buttonNav} href="/Login" color='primary'>
                Cerrar Sesión
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>

        <div className={styles.body}> 
       
        <Row className={styles.searchBar}>
        <h1>Ver Historial</h1>
        <Placeholder
          color="primary"
          xs={10}
        />
        
          <Col sm="12"> 
          <h4>Seleccione la Fecha</h4>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className={styles.dateInput}
          />
          </Col>
          <Col sm="12"> 
          <Button color="primary" onClick={buscarCitas} className={styles.btnB}>
            Buscar
          </Button>
          </Col>
        </Row>
        </div>
        <div className={styles.bodyT}> 
        <Table bordered hover responsive className={styles.table}>
          <thead>
            <tr>
              <th>Nombre del Cliente</th>
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
        <div className={styles.bodyT}>
          <Button className={styles.btn} color="primary" outline href="/MenuAdmin">
            Regresar al Menú
          </Button>
        </div>
    

      <ToastContainer />
    </>
  );
}
