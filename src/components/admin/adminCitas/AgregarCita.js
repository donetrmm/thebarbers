import React, { useState, useEffect } from 'react';
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  Label,
  Input,
  FormGroup,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  ListGroup,
  ListGroupItem,
  CardSubtitle,
  Col,
  Row,
  Container,
  Placeholder,
  CardImg
} from 'reactstrap';
import styles from "./agregarCita.module.css";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';

import logo from "../../img/logoTB.png"
export default function AgregarCita() {
  const [barberos, setBarberos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [selectedBarbero, setSelectedBarbero] = useState('');
  const [selectedServicio, setSelectedServicio] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [numT, setNumT] = useState('');
  const [correo, setCorreo] = useState('');
  const [hora, setHora] = useState('');
  const [dia, setDia] = useState('');
  const [clienteEncontrado, setClienteEncontrado] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    axios.get('http://23.23.118.169/getBarberos')
      .then(response => {
        setBarberos(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('http://23.23.118.169/getServicios')
      .then(response => {
        setServicios(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (dia !== '') {
      axios.get(`http://23.23.118.169/getHorariosDisponibles/${dia}`)
        .then(response => {
          setHorariosDisponibles(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [dia]);


  const guardar = (e) => {
    if (
      selectedBarbero === '' ||
      selectedServicio === '' ||
      dia === '' ||
      hora === '' ||
      nombre === '' ||
      apellido === '' ||
      numT === ''
    ) {
      toast.error('Por favor, complete todos los campos.', { position: toast.POSITION.TOP_CENTER });
    } else {
      const fecha = calculateFecha(dia);
      const citaID = `${fecha},${hora},${selectedBarbero}`;
      const estatus = 'Agendado'; 
      const fechaSeleccionada = moment(calculateFecha(dia));
      const horaSeleccionada = moment(hora, 'HH:mm');
      const today = moment();
    
      const fechaHoraSeleccionada = moment(fechaSeleccionada).set({
        hour: horaSeleccionada.hour(),
        minute: horaSeleccionada.minute(),
      });
      if (fechaHoraSeleccionada.isBefore(today, 'minute')) {
        toast.error('Debes elegir una hora o día posterior a la actual.', {
          position: toast.POSITION.TOP_CENTER,
        });
    
        setHora('');
        return;
      }

      const servicioSeleccionado = servicios.find(servicio => servicio.Nombre === selectedServicio);
      const costo = servicioSeleccionado.Precio;

      const cita = {
        CitaID: citaID,
        NombreBarbero: selectedBarbero,
        Fecha: fecha,
        Hora: hora,
        Estatus: estatus,
        ServicioNombre: selectedServicio,
        Costo: costo,
        NombreCliente: nombre,
        Apellido: apellido,
        Numero: numT,
        Dia: dia,
        Correo: correo
      };

      // Realizar la solicitud POST para agregar la cita a la base de datos
      axios.post('http://23.23.118.169/agregarCita', cita)
        .then(response => {
          // La cita se agregó correctamente, mostrar un mensaje de éxito
          toast.success('Cita agregada exitosamente.', { position: toast.POSITION.TOP_CENTER });
          setSelectedBarbero('');
          setSelectedServicio('');
          setDia('');
          setHora('');
          setNombre('');
          setApellido('');
          setNumT('');
          setCorreo('');
          window.location.assign("/AgregarCitaAdmin")
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message, { position: toast.POSITION.TOP_CENTER });
          } else {
            console.log(error);
            toast.error('Error al agregar la cita.', { position: toast.POSITION.TOP_CENTER });
          }
        });
    }
  };


  const calculateFecha = (diaSeleccionado) => {
    const currentMoment = moment();
    const currentDayOfWeek = currentMoment.isoWeekday();
    const targetDayOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].indexOf(diaSeleccionado) + 1;
    const daysToAdd = targetDayOfWeek - currentDayOfWeek;

    const fechaCalculada = currentMoment.clone().add(daysToAdd, 'days').format('YYYY-MM-DD'); // Calcular la fecha sumando los días necesarios

    return fechaCalculada;
  };

  const getDataFromLocalStorage = () => {
    const data = localStorage.getItem('key');
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  };

  useEffect(() => {
    const credentials = getDataFromLocalStorage();
    if (credentials) {
      setIsLogged(true);
      axios.get(`http://23.23.118.169/getUsuario/${credentials}`)
        .then(response => {
          setClienteEncontrado(response.data);
          const cliente = response.data[0];
          setNombre(cliente.Nombre);
          setApellido(cliente.Apellidos);
          setNumT(cliente.Numero)
          setCorreo(cliente.Usuario)
        })
        .catch(error => {
          console.log(error);
        });
        
    }
  }, []);


  return (
    <>
    <div>
    <ToastContainer/>
      <div>
        <Navbar className={styles.nav} fixed='top' color='dark' >
        <a href="/AdminCita">
      <img src={logo} alt='logo' className={styles.logo}></img>
      </a>
        <a href="/AdminCita" className={styles.titleNav}>The Barber´s</a>
          
          <Nav>
            <NavItem>
              <Button className={styles.buttonNav} href="/Login" color='primary'>
                Cerrar Sesión
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>

      <Container className={styles.container}>
        <h1>Agregar Cita</h1>
       
        <Placeholder
        color="primary"
        xs={12}
      />
        <div className={styles.bodyC}>
          <Button className={styles.btnC} color='danger' outline href="/AdminCita" >Cancelar</Button>
          </div>
           <Row className={styles.row}> 
           <h5>Barberos Disponibles</h5>
            {barberos.map(barbero => (
              <Card key={barbero.BarberoID}
              className={styles.cardBarbero}
              style={{
                  width: '18rem',
                  
                margin: "2rem",
              }}
              >
                <CardBody>
                <CardHeader>
                 {barbero.Nombre}
                </CardHeader>
                
                </CardBody>
                <CardBody>
                <CardImg src={`http://23.23.118.169/uploads/${barbero.Foto}`} alt={barbero.Nombre} style={{ width: '14rem', marginTop: ".2rem" }} />
                  <ListGroup flush>
                    <ListGroupItem>
                      <CardTitle tag="h6">Descripción</CardTitle>
                      <CardSubtitle className="mb-2 text-muted">{barbero.Descripcion}</CardSubtitle>
                    </ListGroupItem>
                  </ListGroup>

                  <ListGroup flush>
                    <ListGroupItem>
                     
                      <CardSubtitle className="mb-2 text-muted">{barbero.Numero}</CardSubtitle>
                    </ListGroupItem>
                  </ListGroup>
                </CardBody>
          
              </Card>
            ))}
        
         

          <FormGroup tag="fieldset" className={styles.bodyS}>
            
            <legend>Seleccione Barbero</legend>
            <div className={styles.radB}>
            <Col sm={12}>
              {barberos.map(barbero => (
                <FormGroup check key={barbero.BarberoID}>
                  <Input
                    name="radioBarbero"
                    type="radio"
                    value={barbero.Nombre}
                    checked={selectedBarbero === barbero.Nombre}
                    onChange={(e) => setSelectedBarbero(e.target.value)}
                    
                  />
                  <Label check>{barbero.Nombre}</Label>
                </FormGroup>
              ))}
           </Col>
           </div>
          </FormGroup>
          </Row>
          <Placeholder
        color="primary"
        xs={12}
      />
          <Row className={styles.row}> 
          <h5>Servicios Disponibles</h5>
        
            {servicios.map(servicio => (
              <Card key={servicio.ServicioID} className={styles.cardBarbero} style={{ width: '18rem', margin: "2rem" }}>
                <CardHeader className={styles.bodyCard}>${servicio.Precio}</CardHeader>
                <CardBody>
                  <CardTitle tag="h4">{servicio.Nombre}</CardTitle>
                  <CardTitle tag="h6">Descripción</CardTitle>
                  <CardSubtitle className="mb-2 text-muted">{servicio.Descripcion}</CardSubtitle>
                </CardBody>
              </Card>
            ))}
       

          <FormGroup tag="fieldset" className={styles.bodyS}>
            <legend>Seleccione Servicio</legend>
            <div className={styles.radB}> 
            <Col sm={12}>
              {servicios.map(servicio => (
                <FormGroup check key={servicio.ServicioID}>
                  <Input
                    name="radioServicio"
                    type="radio"
                    value={servicio.Nombre}
                    checked={selectedServicio === servicio.Nombre}
                    onChange={(e) => setSelectedServicio(e.target.value)}
                  />
                  <Label check>{servicio.Nombre}</Label>
                </FormGroup>
              ))}
            </Col>
            </div>
          </FormGroup>
          </Row>
          <Placeholder
        color="primary"
        xs={12}
      />
          <Row className={styles.row}> 
          
          <Col sm="4">
          <FormGroup>
            <Label for="selectDia">Día</Label>
            <Input
              id="selectDia"
              name="selectDia"
              type="select"
              value={dia}
              onChange={(e) => {
                setDia(e.target.value);
              }}
            >
              <option>Dia</option>
              <option>Lunes</option>
              <option>Martes</option>
              <option>Miércoles</option>
              <option>Jueves</option>
              <option>Viernes</option>
              <option>Sábado</option>
              <option>Domingo</option>
            </Input>
          </FormGroup>
          </Col>
          <Col sm="4">
           
          <FormGroup>
            <Label for="selectHora">Hora</Label>
            <Input
              id="selectHora"
              name="selectHora"
              type="select"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            >
               <option value="">Seleccione una hora</option>
              {horariosDisponibles.map(horario => (
                <option key={horario.Hora}>{horario.Hora}</option>
              ))}
            </Input>
          </FormGroup>
          </Col>
          </Row>
          <Placeholder
        color="primary"
        xs={12}
      />
          <Row className={styles.row}>  
          {isLogged ? (
            <>
              {clienteEncontrado.map(cliente => (
                <React.Fragment key={cliente.Numero}>
                  <Col sm="5"> 
                  <FormGroup floating>
                    
                    <Input
                      name="nombre"
                      placeholder="Nombre"
                      type="text"
                      required
                      value={cliente.Nombre}
                      disabled
                    />
                    <Label>Nombre</Label>
                  </FormGroup>
                  </Col>
                  <Col sm="5"> 
                  <FormGroup floating>
                   
                    <Input
                      name="apellido"
                      placeholder="Apellido"
                      type="text"
                      required
                      value={cliente.Apellidos}
                      disabled
                    />
                     <Label>Apellido</Label>
                  </FormGroup >
                  </Col>
                  <Col sm="5"> 
                  <FormGroup floating>
                    
                    <Input
                      name="Correo"
                      placeholder="Correo"
                      type="email"
                      required
                      value={cliente.Usuario}
                      disabled
                    />
                    <Label>Correo</Label>
                  </FormGroup>
                  </Col>
                  <Col sm="5"> 
                  <FormGroup floating>
                    
                    <Input
                      name="numT"
                      placeholder="Número de Teléfono"
                      type="number"
                      required
                      value={cliente.Numero}
                      disabled
                    />
                    <Label>Número de Teléfono</Label>
                  </FormGroup>
                  </Col>
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
            <Col sm="5"> 
              <FormGroup floating>
                
                <Input
                  name="nombre"
                  placeholder="Nombre"
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <Label>Nombre</Label>
              </FormGroup>
              </Col>
              <Col sm="5">
              <FormGroup floating>
                
                <Input
                  name="apellido"
                  placeholder="Apellido"
                  type="text"
                  required
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
                <Label>Apellido</Label>
              </FormGroup>
              </Col>
              <Col sm="5">
              <FormGroup floating>
                
                <Input
                  name="correo"
                  placeholder="Correo"
                  type="email"
                  required
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <Label>Correo</Label>
              </FormGroup>
              </Col>
              <Col sm="5"> 
              <FormGroup floating>
                
                <Input
                  name="numT"
                  placeholder="Número de Teléfono"
                  type="number"
                  required
                  value={numT}
                  onChange={(e) => setNumT(e.target.value)}
                />
                <Label>Número de Teléfono</Label>
              </FormGroup>

              </Col>
            </>
          )}
              
             <Col sm="4"> 
            
              <Button className={styles.btn} color='primary' outline onClick={guardar}>
                Agregar Cita
              </Button>
           
              </Col>
              
          </Row>
     
      </Container>
      </div>
    </>
  );
}
