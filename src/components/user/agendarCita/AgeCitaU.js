import React, { useState, useEffect } from 'react';
import styles from "./agendarCitaUser.module.css"
import { LuCrown } from "react-icons/lu";
import logo from "../../img/logoTB.png"
import {
  Navbar,
    Nav,
    NavItem,
    Button,
    Container,
    Row,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    FormGroup,
    Input,
    Label,
    CardImg,
    Col,
    CardSubtitle,
    CardText,
    Placeholder
    
  
  } from 'reactstrap';
  import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
export default function AgeCitaU() {
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
      const actual = moment();

      if (moment(`${fecha} ${hora}`).isBefore(actual)) {
        toast.error('La fecha y hora invalidas.', { position: toast.POSITION.TOP_CENTER });
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

     
      axios.post('http://23.23.118.169/agregarCita', cita)
        .then(response => {
         
          toast.success('Cita agregada exitosamente.', { position: toast.POSITION.TOP_CENTER });
          setSelectedBarbero('');
          setSelectedServicio('');
          setDia('');
          setHora('');
          setNombre('');
          setApellido('');
          setNumT('');
          setCorreo('');
          window.location.assign("/AgendarCita");
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
     {isLogged ? (
	<>
  {clienteEncontrado.map(cliente => (
                <React.Fragment key={cliente.Numero}> 
    <div>
    <ToastContainer/>
      <div>
      <Navbar className={styles.nav} fixed='top' color='dark'>
      <a href="/Menu">
      <img src={logo} alt='logo' className={styles.logo}></img>
      </a>
      
        <a href="/Menu" className={styles.titleNav}>The Barber´s</a>
      
       
          <Nav className={styles.navb}>
          <div className={styles.userNav}>
          <LuCrown className={styles.iconNav} />
              <h6 className={styles.titNav}> {cliente.Nombre}</h6> 
             
              </div>
            <NavItem>
            <Button className={styles.buttonNav} color='primary' href='/Login'>
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
          <Button className={styles.btnC} color='danger' outline href="/Menu" >Cancelar</Button>
          </div>
          
           <Row className={styles.row}> 
           <h4>Barberos Disponibles</h4>
           {barberos.map((barbero) => (
            <Card  style={{ width: '18rem', margin: '2rem' }} key={barbero.Numero} className={styles.cardBarbero}>
              <CardHeader className={styles.cardText}>{barbero.Nombre}</CardHeader>
              <CardBody className={styles.cardB}>
                <CardImg src={`http://23.23.118.169/uploads/${barbero.Foto}`} alt={barbero.Nombre} style={{ width: '14rem', marginTop: ".2rem" }} />
             
                <CardText className={styles.cardText}>{barbero.Descripcion}</CardText>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {barbero.Numero}
                </CardSubtitle>
              </CardBody>
            </Card>
          ))}
        
         

          <FormGroup tag="fieldset" className={styles.bodyS}>
            
            <h4>Seleccione Barbero</h4>
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
                  <Label check className={styles.cardText}>{barbero.Nombre}</Label>
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
          <h4>Servicios Disponibles</h4>
        
            {servicios.map(servicio => (
              <Card key={servicio.ServicioID} className={styles.cardBarbero} style={{ width: '18rem', margin: "2rem" }}>
                <CardHeader className={styles.bodyCard}>${servicio.Precio}</CardHeader>
                <CardBody>
                  <CardTitle tag="h4">{servicio.Nombre}</CardTitle>
                
                  <CardSubtitle className={styles.cardText}>{servicio.Descripcion}</CardSubtitle>
                </CardBody>
              </Card>
            ))}
       

          <FormGroup tag="fieldset" className={styles.bodyS}>
            <h4>Seleccione Servicio</h4>
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
                  <Label check className={styles.cardText}>{servicio.Nombre}</Label>
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
          <h4>Seleccione el Día y Hora</h4>
          <Col sm="4">
          <FormGroup>
            <Label for="selectDia" className={styles.cardText}>Día</Label>
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
            <Label for="selectHora" className={styles.cardText}>Hora</Label>
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
              
              
             <Col sm="12"> 
            
              <Button className={styles.btn} color='primary' outline onClick={guardar}>
                Agregar Cita
              </Button>
           
              </Col>
              
          </Row>
     
      </Container>
  
    </div>
    </React.Fragment>
            ))}
    </>
               ) : (
                <>
            <div>
    <ToastContainer/>
      <div>
      <Navbar className={styles.nav} fixed='top' color='dark'>
      <a href="/Menu">
      <img src={logo} alt='logo' className={styles.logo}></img>
      </a>
        <a href="/Menu" className={styles.titleNav}>The Barber´s</a>
      
       
          <Nav className={styles.navb}>
            <NavItem>
            <Button className={styles.buttonNav} color='primary' href="/Login">
        Iniciar Sesión
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
          <Button className={styles.btnC} color='danger' outline href="/Menu" >Cancelar</Button>
          </div>
          
           <Row className={styles.row}> 
           <h4>Barberos Disponibles</h4>
           {barberos.map((barbero) => (
            <Card  style={{ width: '18rem', margin: '2rem' }} key={barbero.Numero} className={styles.cardBarbero}>
              <CardHeader className={styles.cardText}>{barbero.Nombre}</CardHeader>
              <CardBody className={styles.cardB}>
                <CardImg src={`http://23.23.118.169/uploads/${barbero.Foto}`} alt={barbero.Nombre} className={styles.img} />
              
                <CardText className={styles.cardText}>{barbero.Descripcion}</CardText>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {barbero.Numero}
                </CardSubtitle>
              </CardBody>
            </Card>
          ))}
        
         

          <FormGroup tag="fieldset" className={styles.bodyS}>
            
            <h4>Seleccione Barbero</h4>
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
                  <Label check className={styles.cardText}>{barbero.Nombre}</Label>
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
          <h4>Servicios Disponibles</h4>
        
            {servicios.map(servicio => (
              <Card key={servicio.ServicioID} className={styles.cardBarbero} style={{ width: '18rem', margin: "2rem" }}>
                <CardHeader className={styles.bodyCard}>${servicio.Precio}</CardHeader>
                <CardBody>
                  <CardTitle tag="h4">{servicio.Nombre}</CardTitle>
                
                  <CardSubtitle className={styles.cardText}>{servicio.Descripcion}</CardSubtitle>
                </CardBody>
              </Card>
            ))}
       

          <FormGroup tag="fieldset" className={styles.bodyS}>
            <h4>Seleccione Servicio</h4>
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
                  <Label check className={styles.cardText}>{servicio.Nombre}</Label>
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
          <h4>Seleccione el Día y Hora</h4>
          <Col sm="4">
          <FormGroup>
            <Label for="selectDia" className={styles.cardText}>Día</Label>
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
            <Label for="selectHora" className={styles.cardText}>Hora</Label>
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
            <h4>Ingrese sus Datos</h4>
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
          
              
             <Col sm="12"> 
            
              <Button className={styles.btn} color='primary' outline onClick={guardar}>
                Agregar Cita
              </Button>
           
              </Col>
              
          </Row>
     
      </Container>
  
    </div>
            </>
                )}
    </>
  );
}
