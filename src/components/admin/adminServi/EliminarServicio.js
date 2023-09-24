// EliminarBarbero.js (React)

import React, { useState, useEffect } from 'react';
import { Button, Navbar, Nav, NavItem, Label, Form, Input, FormGroup,Row,Col,Placeholder } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './agregarServi.module.css';
import axios from 'axios';
import logo from "../../img/logoTB.png"

export default function EliminarBarbero() {
  const [numT, setNumT] = useState('');
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    axios.get('http://23.23.118.169/getServicios')
      .then(response => {
        setServicios(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const eliminarBarbero = () => {

    const body = {
      BarberoID: numT
    };

    fetch('http://23.23.118.169/eliminarServicio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          toast.success('El servicio ha sido eliminado de la base de datos.');
          window.location.assign("/AdminServicio")
        } else if (response.status === 404) {
          toast.error('El servicio no existe en la base de datos.');
        } else {
          toast.error('Error al eliminar el servicio de la base de datos.');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el servicio:', error);
        toast.error('Error al eliminar el servicio de la base de datos.');
      });
  };



  return (
    <>
      <div>
        <Navbar className={styles.nav} color='dark' fixed='top'>
        <a href="/AdminServicio">
      <img src={logo} alt='logo' className={styles.logo}></img>
      </a>

        <a href="/AdminServicio" className={styles.titleNav}>The Barber´s</a>

          <Nav>
            <NavItem>
              <Button className={styles.buttonNav} href="/Login" color='primary' >
                Cerrar Sesión
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>

      <div className={styles.body}>
        <h1>Eliminar Servicio</h1>
        
        <Form className={styles.form}>
        <Row className={styles.container}> 
        <Col sm="12"> 
          <h4>Ingrese los Datos del Servicio</h4>
          </Col>
          <Placeholder
            color="primary"
            xs={12}
          />
          <p></p>
          <div className={styles.bodyC}>
          <Button className={styles.btnC} color='danger' outline href="/AdminServicio" >Cancelar</Button>
          </div>
          <Col sm="6"> 
          <FormGroup floating>
              <Input
                id="nombreC"
                name="nombreC"
                placeholder="Nombre"
                value={numT}
                onChange={(e) => setNumT(e.target.value)}
                type="select"
                required
              >
                <option value="">Selecciona el servicio</option>
                {servicios.map(servicio => (
                  <option key={servicio.Nombre}>{servicio.Nombre}</option>
                ))}
              </Input>
              <Label for="exampleEmail">Nombre</Label>
            </FormGroup>
          </Col>
          <Col sm="8">
          <Button className={styles.btn} color="danger" outline onClick={eliminarBarbero}>
            Eliminar Servicio
          </Button>
          </Col>
          </Row>

        </Form>

        
      </div>

      <ToastContainer />
    </>
  );
}
