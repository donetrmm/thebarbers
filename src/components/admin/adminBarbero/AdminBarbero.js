import React, { useState, useEffect } from 'react';
import { Table, Button,Navbar, Nav, NavItem,Placeholder,Row,Col } from 'reactstrap'
import styles from './adminBarbero.module.css';
import { BsCheckLg } from "react-icons/bs";

import logo from "../../img/logoTB.png"
const API_BASE_URL = 'http://23.23.118.169';
export default function AdminBarbero() {


  const [barberos, setBarberos] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/getBarberos`)
      .then((response) => response.json())
      .then((data) => setBarberos(data))
      .catch((error) => console.error('Error al obtener los barberos:', error));
  }, []);



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
      <h1>Administrar Barberos</h1>
      <Placeholder
          color="primary"
          xs={12}
        />
        <div className={styles.tablaCont}>
        <Table bordered hover responsive className={styles.table}>
          <thead>
            <tr>
              <th className={styles.colmName}>Nombre</th>
              <th>Número de Teléfono</th>
              <th className={styles.colmDes}>Descripción</th>
              <th>Foto</th>
             
            </tr>
          </thead>
          <tbody>
            {barberos.map((barbero) => (
              <tr key={barbero.BarberoID}>
                <td>{barbero.Nombre}</td>
                <td>{barbero.Numero}</td>
                <td>{barbero.Descripcion}</td>
                <td>
                  <BsCheckLg />
                </td>
               
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
        </div>

       
     

          <div  className={styles.bodyBtn}> 
            <Row className={styles.row}> 
              <Col sm='4'>
              <Button className={styles.btn} color="primary" outline href="/AgregarBarbero">
                Agregar Barbero
              </Button>
              </Col>
              <Col sm='4'>
              <Button className={styles.btn} color="success" outline href="/EditarBarbero">
                Editar Barbero
              </Button>
              </Col>
              <Col sm='4'> 
              <Button className={styles.btn} color="danger" outline href="/EliminarBarbero">
                Eliminar Barbero
              </Button>
              </Col>
              </Row>
            </div>
        </div>
     
    </>
    
  );
}
