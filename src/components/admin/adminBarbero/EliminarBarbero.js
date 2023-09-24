import React, { useState, useEffect } from 'react';
import { Button, Navbar, Nav, NavItem, Label, Form, Input, FormGroup,Col,Row,Placeholder } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './agregar.module.css';
import axios from 'axios';
import logo from "../../img/logoTB.png"
const API_BASE_URL = 'http://23.23.118.169';
export default function EliminarBarbero() {
  const [numT, setNumT] = useState('');
  const [barbero, setBarbero] = useState([]);

  useEffect(() => {
    if (numT.trim() !== '') {
      axios
        .get(`${API_BASE_URL}/getBarberoNombre/${numT}`)
        .then((response) => {
          const barbero = response.data;
          setBarbero(barbero);
        })
        .catch((error) => console.error('Error al obtener el barbero:', error));
    }
  }, [numT]);

  const eliminarBarbero = () => {
    if (numT.trim() === '') {
      toast.error('Ingrese un número de teléfono válido.');
      return;
    }

    if (barbero.length === 0) {
      toast.error('El barbero no existe en la base de datos.');
      return;
    }

    const body = {
      BarberoID: numT
    };

    axios.post(`${API_BASE_URL}/eliminarBarbero`, body)
      .then(() => {
        toast.success('El barbero ha sido eliminado de la base de datos.');
        window.location.assign("/AdminBarbero");
      })
      .catch((error) => {
        console.error('Error al eliminar el barbero:', error);
        toast.error('Error al eliminar el barbero de la base de datos.');
      });
  };

  return (
    <>
      <div>
        <Navbar className={styles.nav} color='dark' fixed='top'>
        <a href="/AdminBarbero">
      <img src={logo} alt='logo' className={styles.logo}></img>
      </a>
        <a href="/AdminBarbero" className={styles.titleNav}>The Barber´s</a>

          <Nav>
            <NavItem>
              <Button className={styles.buttonNav} href="/Login" color='primary'>
                Cerrar Sesión
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>

      <div className={styles.body}>
        <h1>Eliminar Barbero</h1>
        <Form className={styles.form}>
        <Row className={styles.container}> 
        <Col sm="12">
          <h4>Ingrese el número del Barbero</h4>

          </Col>
          <Placeholder
            color="primary"
            xs={12}
          />
          <p></p>
          <div className={styles.bodyC}>
          <Button className={styles.btnC} color='danger' outline href="/AdminBarbero" >Cancelar</Button>
          </div>
          <Col sm="8">
          <FormGroup floating>
            <Input
              id="numT"
              name="numT"
              placeholder="numeroT"
              type="number"
              value={numT}
              onChange={(e) => setNumT(e.target.value)}
            />
            <Label for="examplePassword">Número de Teléfono</Label>
            
          </FormGroup>
          </Col>
          <Col sm ="8">
          <FormGroup floating>
            {
              barbero.map(barber => (
                <React.Fragment key={barber.Nombre}>
                <Input
                id="nombreC"
                name="nombreC"
                placeholder="Nombre Completo"
                value={barber.Nombre}
                type="text"
                required
              />
            <Label for="nombreC">Nombre del barbero</Label>
              </React.Fragment>
              )

              )
            }
          </FormGroup>
          </Col>
          <Col sm="8">
          <Button className={styles.btn} color="danger" outline onClick={eliminarBarbero}>
            Eliminar Barbero
          </Button>
          </Col>

          </Row>
        </Form>

      \
      </div>

      <ToastContainer />
    </>
  );
}
