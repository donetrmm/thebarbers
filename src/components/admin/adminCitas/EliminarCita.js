import React, { useState, useEffect } from 'react';
import { Button, Navbar, Nav, NavItem, Label, Input, FormGroup,Row,Container,Col,Placeholder } from 'reactstrap';
import styles from './eliminarCita.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import logo from "../../img/logoTB.png"
export default function EliminarCita() {

  const [numT, setNumT] = useState('');
  const [hora, setHora] = useState('');
  const [Fecha, setFecha] = useState('');
  const [barbero, setBarbero] = useState('');
  const [barberos, setBarberos] = useState([]);
  useEffect(() => {
    obtenerBarberos();
  }, []);
  const obtenerBarberos = () => {
    axios.get('http://23.23.118.169/getBarberos') // Ruta para obtener los barberos desde el backend
      .then((response) => {
        setBarberos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los barberos:', error);
      });
  };

  const eliminarCita = async () => {
    try {
      const response = await axios.delete(`http://23.23.118.169/eliminarCita/${numT}/${hora}/${Fecha}/${barbero}`);
      if (response.status === 200) {
        toast.success('La cita ha sido eliminada correctamente');
        window.location.assign("/AdminCita")
        // Realizar cualquier otra acción después de eliminar la cita
      }
    } catch (error) {
      toast.error('Cita no encontrada');
      console.error(error);
    }
  };


  return (
    <>

    
      <div>
      <Navbar className={styles.nav} color='dark' fixed='top'>
        
 <a href="/AdminCita">
      <img src={logo} alt='logo' className={styles.logo}></img>
      </a>

        <a href="/AdminCita" className={styles.titleNav}>The Barber´s</a>
          <Nav>
            <NavItem>
              <Button className={styles.buttonNav} href="/Login" color='primary'>
                Cerrar Sesion
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>

      <Container className={styles.container}>
        <Row className={styles.row}>
        <h1>Eliminar Cita</h1>
        <Placeholder
    color="primary"
    xs={12}
  />
  <p></p>
  <div className={styles.bodyC}>
          <Button className={styles.btnC} color='danger' outline href="/AdminCita" >Cancelar</Button>
          </div>
          <Col sm="5"> 
          <FormGroup floating>
          
            <Input
              id="examplenum"
              name="num"
              placeholder="numero de telefono"
              type="number"
              required
              value={numT}
              onChange={(e) => setNumT(e.target.value)}
            />
            <Label>Número de Teléfono</Label>
          </FormGroup>
          </Col>
          <Col sm="5"> 
          <FormGroup floating>
            
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              value={barbero}
              onChange={(e) => setBarbero(e.target.value)}
            >
              <Label for="exampleSelect">Nombre del barbero</Label>
              <option value="">Seleccione un barbero</option>
              {barberos.map((barbero) => (
                <option key={barbero.BarberoID} value={barbero.Nombre}>
                  {barbero.Nombre}
                </option>
              ))}
            </Input>
          </FormGroup>
          </Col>
          <Col sm="5"> 
          <FormGroup floating>
            
            <Input
              id="exampleTime"
              name="time"
              placeholder="time placeholder"
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
            <Label for="exampleTime">Hora</Label>
          </FormGroup>
          </Col>
          <Col sm="5"> 
          <FormGroup floating>
            
            <Input
              id="exampleSelect"
              name="select"
              type="date"
              value={Fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
            <Label for="exampleSelect">Seleccione la Fecha</Label>
          </FormGroup>
          </Col>
      
          <Col sm="8" className={styles.row}>
          <Button className={styles.btn} color="danger" outline onClick={eliminarCita}>
            Eliminar Cita
          </Button>
          </Col>
        </Row>
      </Container>

      <ToastContainer />
   
    </>

  );
}
