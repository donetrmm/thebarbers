import React, { useState, useEffect } from 'react';
import styles from './verBarbero.module.css';
import { Row, Card, CardText, Button, Container, CardBody, CardImg, CardHeader, CardSubtitle, Nav, NavItem, Navbar, FormGroup, Label, Input, Placeholder } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { LuCrown } from "react-icons/lu";
import logo from "../../img/logoTB.png"
export default function VerBarberoU() {
  const [barberos, setBarberos] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [calificacion, setCalificacion] = useState();
  const [barberoSeleccionado, setBarberoSeleccionado] = useState('');
  const [opinion, setOpinion] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [clienteEncontrado, setClienteEncontrado] = useState([]);
  const [nombre, setNombre] = useState('');



  useEffect(() => {
    obtenerBarberos();
    obtenerCalificaciones();
    const credentials = getDataFromLocalStorage();
    if (credentials) {
      setIsLogged(true);
      axios.get(`http://23.23.118.169/getUsuario/${credentials}`)
        .then(response => {
          setClienteEncontrado(response.data);
          const cliente = response.data[0];
          setNombre(cliente.Nombre);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  const getDataFromLocalStorage = () => {
    const data = localStorage.getItem('key');
    return data ? JSON.parse(data) : null;
  };

  const guardarCalificacion = () => {
    if (calificacion && barberoSeleccionado && opinion) {
      const calificacionID = getDataFromLocalStorage() + barberoSeleccionado;
      const calificacionData = {
        calificacionID: calificacionID,
        clienteID: getDataFromLocalStorage(),
        barberoId: barberoSeleccionado,
        calificacion: calificacion,
        opinion: opinion,
      };

      axios
        .post('http://23.23.118.169/guardarCalificacion', calificacionData)
        .then((response) => {
          window.location.assign('/VerBarbero');
          toast.success('Calificación guardada exitosamente');
        })
        .catch((error) => {
          toast.error('Ya has agregado una calificación a este barbero');
        });
    } else {
      toast.error('Faltan datos requeridos');
    }
  };

  const obtenerBarberos = () => {
    axios
      .get('http://23.23.118.169/getBarberos')
      .then((response) => {
        setBarberos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los barberos:', error);
        toast.error('Error al obtener los barberos');
      });
  };

  const obtenerCalificaciones = () => {
    axios
      .get('http://23.23.118.169/getCalificaciones')
      .then((response) => {
        setCalificaciones(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las calificaciones:', error);
        toast.error('Error al obtener las calificaciones');
      });
  };

  return (
    <>
     {isLogged ? (
	<>
      {clienteEncontrado.map(cliente => (
                <React.Fragment key={cliente.Numero}>
    <div>
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
        <Row className={styles.rowH}>
          <h2>Barberos</h2>
          <Placeholder
          color="primary"
          xs={12}
        />
          
          {barberos.map((barbero) => (
            <Card className={styles.cardBarbero} style={{ width: '18rem', margin: '2rem' }} key={barbero.Numero}>
              <CardHeader>{barbero.Nombre}</CardHeader>
              <CardBody className={styles.cardB}>
                <CardImg src={`http://23.23.118.169/uploads/${barbero.Foto}`} alt={barbero.Nombre} className={styles.img} />
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {barbero.Numero}
                </CardSubtitle>
                <CardText>{barbero.Descripcion}</CardText>
              </CardBody>
            </Card>
          ))}
        </Row>
        <Placeholder
          color="primary"
          xs={12}
        />
        <div className={styles.bodyC}>
          <Button className={styles.btnC} color='danger' outline href="/Menu" >Cancelar</Button>
          </div>
        <div className={styles.div}>
          <h2>Calificar Barbero</h2>
          
          <div className={styles.starsource}>
            <svg>
              <linearGradient x1="50%" y1="5.41294643%" x2="87.5527344%" y2="65.4921875%" id="grad">
                <stop stopColor="#f1ae2b" offset="0%"></stop>
                <stop stopColor="#f1ae2b" offset="60%"></stop>
                <stop stopColor="#f1ae2b" offset="100%"></stop>
              </linearGradient>
              <symbol id="star" viewBox="153 89 106 108">
                <polygon
                  id="star-shape"
                  stroke="url(#grad)"
                  strokeWidth="5"
                  fill="currentColor"
                  points="206 162.5 176.610737 185.45085 189.356511 150.407797 158.447174 129.54915 195.713758 130.842203 206 95 216.286242 130.842203 253.552826 129.54915 222.643489 150.407797 235.389263 185.45085"
                ></polygon>
              </symbol>
            </svg>
          </div>
          <div className={styles.starcontainer}>
            <input type="radio" name="star" id="five" onChange={(e) => setCalificacion(5)} />
            <label htmlFor="five">
              <svg className={styles.star}>
                <use href="#star" />
              </svg>
            </label>

            <input type="radio" name="star" id="four" onChange={(e) => setCalificacion(4)} />
            <label htmlFor="four">
              <svg className={styles.star}>
                <use href="#star" />
              </svg>
            </label>

            <input type="radio" name="star" id="three" onChange={(e) => setCalificacion(3)} />
            <label htmlFor="three">
              <svg className={styles.star}>
                <use href="#star" />
              </svg>
            </label>

            <input type="radio" name="star" id="two" onChange={(e) => setCalificacion(2)} />
            <label htmlFor="two">
              <svg className={styles.star}>
                <use href="#star" />
              </svg>
            </label>

            <input type="radio" name="star" id="one" onChange={(e) => setCalificacion(1)} />
            <label htmlFor="one">
              <svg className={styles.star}>
                <use href="#star" />
              </svg>
            </label>
          </div>
          <div className={styles.body}>
            <h2>Seleccione un Barbero</h2>
            <div className={styles.rowH}>
              <FormGroup>
                <select value={barberoSeleccionado} onChange={(e) => setBarberoSeleccionado(e.target.value)}>
                  <option value="">Seleccione un barbero</option>
                  {barberos.map((barbero) => (
                    <option key={barbero.Numero} value={barbero.Numero}>
                      {barbero.Nombre}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
          </div>
          
          <div>
            <FormGroup className={styles.center}>
              <Label for="exampleText">Escribe comentario sobre el barbero</Label>
              <Input id="exampleText" name="text" type="textarea" value={opinion} onChange={(e) => setOpinion(e.target.value)} />
            </FormGroup>
          </div>
          <div>
            <Button onClick={guardarCalificacion} className={styles.btn} color='primary'>Subir Calificación</Button>
          </div>
          
        </div>
        <Placeholder
          color="primary"
          xs={12}
        />
        {/* Cards de calificaciones */}
        <div className={styles.div}>
          <Row className={styles.rowH}>
            <h2>Comentarios sobre los barberos</h2>
          
            {calificaciones.map((calificacion) => (
               
              <Card className={styles.cardBarbero} style={{ width: '18rem', margin: '2rem' }} key={calificacion.CalificacionID}>
                <CardHeader>{calificacion.NombreBarbero}</CardHeader>
                
                <CardBody className={styles.cardB}>
                  <StarRatings
                    rating={calificacion.Puntuacion}
                    starRatedColor="#f1ae2b"
                    starEmptyColor="#d8d8d8"
                    starDimension="20px"
                    starSpacing="2px"
                  />
                   
                 
              
                  <CardText className={styles.textCali}>{calificacion.Descripcion}</CardText>
                </CardBody>
              </Card>
             
            ))}
           
          </Row>
        </div>
      </Container>
      <ToastContainer />
    </div>
      </React.Fragment>
      ))}
    </>
               ) : (
          <>
		   <div>
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
        <Row className={styles.rowH}>
          <h2>Barberos</h2>
          <Placeholder
          color="primary"
          xs={12}
        />
          {barberos.map((barbero) => (
            <Card className={styles.cardBarbero} style={{ width: '18rem', margin: '2rem' }} key={barbero.Numero}>
              <CardHeader>{barbero.Nombre}</CardHeader>
              <CardBody className={styles.cardB}>
                <CardImg src={`http://23.23.118.169/uploads/${barbero.Foto}`} alt={barbero.Nombre} className={styles.img} />
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {barbero.Numero}
                </CardSubtitle>
                <CardText>{barbero.Descripcion}</CardText>
              </CardBody>
            </Card>
          ))}
        </Row>
        <Placeholder
          color="primary"
          xs={12}
        />
        <div className={styles.div}>
          <h2>Calificar Barbero</h2>
            <h4>Inicie sesión para calificar a un barbero</h4>
     
   
          
         
          <div>
            <Button  className={styles.btn} color='primary' href="/Login">Iniciar Sesión</Button>
          </div>
          
        </div>
        <Placeholder
          color="primary"
          xs={12}
        />
        {/* Cards de calificaciones */}
        <div className={styles.div}>
          <Row className={styles.rowH}>
            <h2>Comentarios sobre barberos</h2>
          
            {calificaciones.map((calificacion) => (
               
              <Card className={styles.cardBarbero} style={{ width: '18rem', margin: '2rem' }} key={calificacion.CalificacionID}>
                <CardHeader>{calificacion.NombreBarbero}</CardHeader>
                
                <CardBody className={styles.cardB}>
                  <StarRatings
                    rating={calificacion.Puntuacion}
                    starRatedColor="#f1ae2b"
                    starEmptyColor="#d8d8d8"
                    starDimension="20px"
                    starSpacing="2px"
                  />
                   
                 
              
                  <CardText className={styles.textCali}>{calificacion.Descripcion}</CardText>
                </CardBody>
              </Card>
             
            ))}
           
          </Row>
        </div>
      </Container>
      <ToastContainer />
    </div>
  	  </>
          )}
    </>
  );
}
