import React from 'react';
import { Button, Navbar, Nav, NavItem, Label, Form, Input, FormGroup, Row, Col,Placeholder } from 'reactstrap';
import { useState } from 'react';
import styles from './agregarServi.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../img/logoTB.png"

export default function AgregarServicio() {


  const guardar = () => {
    const servicioData = {
      nombre,
      precio,
      descrip,
    };

    // Realizar la solicitud POST al backend para agregar el servicio
    fetch('http://23.23.118.169/agregarServicio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(servicioData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Datos guardados correctamente');
          window.location.assign('/AdminServicio');
        } else {
          throw new Error('Error al guardar los datos');
        }
      })
      .catch((error) => {
        console.error('Error al guardar los datos:', error);
        toast.error('Error al guardar los datos');
      });
  };

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descrip, setDescrip] = useState('');

  return (
    <>
      <div>
        <Navbar className={styles.nav} color='dark' fixed='top'>
        <a href="/">
      <img src={logo} alt='logo' className={styles.logo}></img>
      </a>
        <a href="/AdminServicio" className={styles.titleNav}>The Barber´s</a>

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
        <h1>Agregar Servicio</h1>
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
          <Col sm="4">          
            <FormGroup floating>
              <Input
                id="nombreC"
                name="nombreC"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                type="text"
                required
              />
              <Label for="exampleEmail">Nombre</Label>
            </FormGroup>
            </Col>
            <Col sm="4">   
            <FormGroup floating>
              <Input
                id="numT"
                name="numeT"
                placeholder="numeroT"
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
              <Label for="examplePassword">Precio</Label>
            </FormGroup>
            </Col>
            <Col sm="8">   
            <FormGroup floating>
              <Input
                id="descrip"
                name="descrip"
                type="textarea"
                placeholder="descripcion"
                value={descrip}
                onChange={(e) => setDescrip(e.target.value)}
              />
              <Label for="exampleText">Descripción</Label>
            </FormGroup>
            </Col>

            <Col sm="8">
            <Button className={styles.btn} color="primary" outline onClick={guardar}>
            Guardar Datos
          </Button>
            </Col>
          </Row>
        </Form>

        
      </div>
    </>
  );
}
