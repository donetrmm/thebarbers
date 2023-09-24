import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import {
  Navbar,
  Nav,
  NavItem,
  Row,
  Button
} from 'reactstrap';

import styles from "./menu.module.css";

const Menu = () => {
  const { CitaID } = useParams('CitaID');

  useEffect(() => {    
    const confirmCita = async () => {
      try {
        await axios.put(`http://23.23.118.169/confirmarCita/${CitaID}`);
      } catch (error) {
        console.error('Error al confirmar cita:', error);
      }
    };

    confirmCita();
  }, [CitaID]); 


  return (
    <div>
      <div>
      <Navbar className={styles.nav} color='dark'>
        <a href="/" className={styles.titleNav}>The Barber´s</a>
        
          <Nav className={styles.navb}>
            <NavItem>
              <Button className={styles.buttonNav} href="/Login" color='primary'>
                Iniciar Sesión
              </Button>
            </NavItem>
            <NavItem>
              <Button className={styles.buttonNav} href="/Login" color='primary'>
                Cerrar Sesión
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>

      <div>
        <Row className={styles.container}>
          <div className={styles.card}>
            <h1>¡Cita confirmada!</h1>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Menu;
