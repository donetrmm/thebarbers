import React, { useState, useEffect } from 'react';
import { Button, Navbar, Nav, NavItem, Label, Form, Input, FormGroup,Col,Row,Placeholder } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import styles from './agregarServi.module.css';
import logo from "../../img/logoTB.png"
export default function EditarServicio() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descrip, setDescrip] = useState('');
  const [servicios, setServicios] = useState([]);



  useEffect(() => {
    obtenerServicios();
  }, []);

  const obtenerServicios = async () => {
    try {
      const response = await axios.get('http://23.23.118.169/getServicios');
      setServicios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const guardar = async (e) => {
    if(nombre===''){
      toast.error("Selecciona un servicio");
      return
    }
   try{
    const response = await axios.put('http://23.23.118.169/editarServicios', {
      nombre: nombre,
      precio: precio,
      descripcion: descrip
    });

    if (response.status === 200) {
      toast.success('Cambios guardados correctamente');
      window.location.assign("/AdminServicio")
    } else    if(nombre === '' || precio === '' || descrip === ''){
      toast.error('Llena todos los campos');
      return;
    }
   } catch (error){
    toast.error("Ocurrio un error al guardar los cambios")
   }


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
              <Button className={styles.buttonNav} href="/Login" color='primary'>
                Cerrar Sesión
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>

      <div className={styles.body}>
        <h1>Editar Servicio</h1>
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
            <Col sm="4">
            <FormGroup floating>
              <Input
                id="numT"
                name="numeT"
                placeholder="numeroT"
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
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
                required
              />
              <Label for="exampleText">Descripción</Label>
            </FormGroup>
            </Col>

            <Col sm="8">
            <Button className={styles.btn} color="success" outline onClick={guardar}>
            Guardar Cambios
          </Button>
            </Col>
      
          </Row>
        </Form>

       
      </div>

      <ToastContainer />
    </>
  );
}
