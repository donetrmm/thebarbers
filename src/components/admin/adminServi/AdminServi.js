import React, { useState, useEffect } from 'react';
import { Table, Button, Navbar, Nav, NavItem, Placeholder,Row,Col } from 'reactstrap';
import styles from "./adminServi.module.css";
import logo from "../../img/logoTB.png"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const API_BASE_URL = 'http://23.23.118.169';
export default function AdminServi() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    obtenerServicios();
  }, []);

  const obtenerServicios = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getServicios`);
      setServicios(response.data);
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
    }
  };
  return (
    <>
     <div> 
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
      <h1>Administrar Servicios</h1>
      <Placeholder
          color="primary"
          xs={12}
        />
        <div className={styles.tablaCont}> 
        <Table bordered hover responsive className={styles.table}>
          <thead>
            <tr>
         
              <th className={styles.colmName}>Nombre</th>
              <th className={styles.colmDes}>Descripción</th>
              <th>Precio</th>
            
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio.ServicioID}>
            
                <td>{servicio.Nombre}</td>
                <td>{servicio.Descripcion}</td>
                <td>{'$'+servicio.Precio}</td>
          
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
    
    
      <div className={styles.bodyBtn}>
   
              <Row className={styles.row}> 
              <Col sm='4'> 
          <Button className={styles.btn} color="primary" outline href="/AgregarServicio">
            Agregar Servicio
          </Button>
          </Col>
                 <Col sm='4'>  
          <Button className={styles.btn} color="success" outline href="/EditarServicio">
            Editar Servicio
          </Button>
          </Col>
                 <Col sm='4'>  
          <Button className={styles.btn} color="danger" outline href="/EliminarServicio">
            Eliminar Servicio
          </Button>
          </Col>
          </Row>
        </div>
        </div>


      <ToastContainer />
      </div>
    </>
  );
}
