import React, { useState, useEffect } from 'react';
import { Button, Navbar, Nav, NavItem, Label, Form, Input, FormGroup, FormText,Col, Row,Placeholder } from 'reactstrap';
import axios from 'axios';
import styles from './agregar.module.css';
import { toast, ToastContainer } from 'react-toastify';
import logo from "../../img/logoTB.png"
const API_BASE_URL = 'http://23.23.118.169';
export default function EditarBarbero() {
  const [numViejo, setNumViejo] = useState('');
  const [numT, setNumT] = useState('');
  const [descrip, setDescrip] = useState('');
  const [foto, setFoto] = useState(null);
  const [barbero, setBarbero] = useState([]);
  const [nombreC, setNombreC] = useState('');

  useEffect(() => {
    if (numViejo.trim() !== '') {
      axios
        .get(`${API_BASE_URL}/getBarberoNombre/${numViejo}`)
        .then((response) => {
          const barbero = response.data;
          setBarbero(barbero);
        })
        .catch((error) => console.error('Error al obtener el barbero:', error));
    }
  }, [numViejo]);

  const handleFotoChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const guardar = (e) => {
    e.preventDefault();

    if (barbero.length === 0) {
      toast.error('El barbero no existe en la base de datos.');
      return;
    }

    const formData = new FormData();
    formData.append('numViejo', numViejo);
    formData.append('nombreC', barbero[0].Nombre);
    formData.append('numT', numT);
    formData.append('descrip', descrip);
    formData.append('foto', foto);

    axios.post(`${API_BASE_URL}/EditarBarbero`, formData)
      .then(() => {
        toast.success('Barbero editado exitosamente');
        window.location.assign('/AdminBarbero');
      })
      .catch((error) => {
        console.error('Error al editar el barbero:', error);
        toast.error('Hubo un error al editar el barbero');
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
        <h1>Editar Barbero</h1>
        <Form className={styles.form} onSubmit={guardar}>
        <Row className={styles.container}> 
        <Col sm="12 ">  
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
              id="numViejo"
              name="numViejo"
              placeholder="Número de Teléfono"
              type="number"
              value={numViejo}
              onChange={(e) => setNumViejo(e.target.value)}
              required
            />
            <Label for="numViejo">Número \
            (anterior)</Label>
            
          </FormGroup>
          </Col>
          <Col sm="4"> 
          <FormGroup floating>
            <Input
              id="numT"
              name="numT"
              placeholder="Nuevo Número de Teléfono"
              type="number"
              value={numT}
              onChange={(e) => setNumT(e.target.value)}
              required
            />
            <Label for="numT">Nuevo número</Label>
       
          </FormGroup>
          </Col>
          <Col sm="5"> 
          <FormGroup floating>
            {
              barbero.map(barber => (
                <React.Fragment key={barber.Nombre}>
                <Input
                id="nombreC"
                name="nombreC"
                placeholder="Nombre Completo"
                value={barber.Nombre}
                onChange={(e) => setNombreC(e.target.value)}
                type="text"
                required
              />
              </React.Fragment>
              )

              )
            }
            <Label for="nombreC">Nombre Completo</Label>
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
            <FormText>(Texto de especificación de la imagen)</FormText>
          </FormGroup>
          </Col>
          <Col sm="8">  
          <Button className={styles.btn} color="success" outline type="submit">
            Guardar Datos
          </Button>
          </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
