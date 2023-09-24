import React, { useState } from 'react';
import { Button, Navbar, Nav, NavItem, Label, Form, Input, FormGroup,Col,Row,Placeholder } from 'reactstrap';
import axios from 'axios';
import styles from './agregar.module.css';
import logo from "../../img/logoTB.png"
import { toast } from 'react-toastify';
export default function AgregarBarbero() {
  const [nombreC, setNombreC] = useState('');
  const [numT, setNumT] = useState('');
  const [descrip, setDescrip] = useState('');
  const [foto, setFoto] = useState(null);

  const guardar = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombreC', nombreC);
    formData.append('numT', numT);
    formData.append('descrip', descrip);
    formData.append('foto', foto);

    axios
      .post('http://23.23.118.169/barberos', formData)
      .then(() => {
        toast.success('Barbero registrado exitosamente');
        window.location.assign('/AdminBarbero');
      })
      .catch((error) => {
        console.error('Error al registrar el barbero:', error);
        toast.error('Hubo un error al registrar el barbero');
      });
  }



  const handleFotoChange = (e) => {
    setFoto(e.target.files[0]);
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
              <Button className={styles.buttonNav} color='primary' href="/Login">
                Cerrar Sesión
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>

      <div className={styles.body}>
      
        <h1>Agregar Barbero</h1>
  
        <Form className={styles.form} onSubmit={guardar}>
          <Row className={styles.container}> 
          <Col sm="12"> 
          <h4>Ingrese los Datos del Barbero</h4>
        
          <Placeholder
          color="primary"
          xs={12}
        />
        <p></p>
        <div className={styles.bodyC}>
          <Button className={styles.btnC} color='danger' outline href="/AdminBarbero" >Cancelar</Button>
          </div>
          </Col>
          <Col sm="4"> 
          <FormGroup floating>
            <Input
              id="nombreC"
              name="nombreC"
              placeholder="Nombre Completo"
              value={nombreC}
              onChange={(e) => setNombreC(e.target.value)}
              type="text"
              required
            />
            <Label for="nombreC">Nombre Completo</Label>
          </FormGroup>
          </Col>
          <Col sm="4"> 
          <FormGroup floating>
            <Input
              id="numT"
              name="numeT"
              placeholder="Número de Teléfono"
              type="number"
              value={numT}
              onChange={(e) => setNumT(e.target.value)}
              required
            />
            <Label for="numT">Número de Teléfono</Label>
          </FormGroup>
          </Col>
          <Col sm="8"> 
          <FormGroup floating>
            <Input
              id="descrip"
              name="descrip"
              type="textarea"
              placeholder="Descripción"
              value={descrip}
              onChange={(e) => setDescrip(e.target.value)}
            />
            <Label for="descrip">Descripción</Label>
          </FormGroup>
          </Col>
          <Col sm="5"> 
          <FormGroup>
            <Label for="foto">Imagen del Barbero</Label>
            <Input id="foto" name="foto" type="file" onChange={handleFotoChange} required />
           
          </FormGroup>
       
          </Col>
         
          <Col sm="8"> 
          <Button className={styles.btn} color="primary" outline type="submit">
            Guardar Datos
          </Button>
          </Col>
          </Row>
       
        </Form>
      </div>
    </>
  );
}
