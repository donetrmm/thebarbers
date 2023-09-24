import React, { useState, useEffect } from 'react';
import styles from "./menu.module.css"
import { FiUsers,FiCalendar } from "react-icons/fi";
import { LuCrown } from "react-icons/lu";
import { BiCalendarEvent } from "react-icons/bi";
import { toast } from 'react-toastify';
import logo from "../../img/logoTB.png"
import axios from 'axios';

import {
 
  Navbar,
  Nav,
  NavItem,
 Card,
  Row,
  Col,
  CardTitle,
  Button,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Table,
  Container,

} from 'reactstrap';
const getDataFromLocalStorage = () => {
  const data = localStorage.getItem('key');
  return data ? JSON.parse(data) : null;
};

export default function Menu() {
  const [modal, setModal] = useState(false);
  const [citas, setCitas] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [clienteEncontrado, setClienteEncontrado] = useState([]);
  const [nombre, setNombre] = useState('');

  useEffect(() => {
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

      buscarCitas(credentials);
    }
  }, []);

  const buscarCitas = async (credentials) => {
    try {
      const response = await axios.get(`http://23.23.118.169/citasUser?numero=${credentials}`);
      const data = response.data;
      if (data.message) {
        toast.info(data.message);
        setCitas([]);
      } else {
        setCitas(data);
      }
    } catch (error) {
      console.error('Error al buscar las citas:', error);
      toast.error('Ocurrió un error al buscar las citas');
    }
  };

  const toggle = () => setModal(!modal);
  return (
    <> 
     {isLogged ? (
         <>
         {clienteEncontrado.map(cliente => (
                <React.Fragment key={cliente.Numero}>
	 <div>
        <div>
        <Navbar className={styles.nav} fixed='top' color='dark'>
        
        <a href="/">
      <img src={logo} alt='logo' className={styles.logo}></img>
      </a>
        <a href="/" className={styles.titleNav}>The Barber´s</a>
        
        
            <Nav>
              <div className={styles.userNav}>
              <LuCrown className={styles.iconNav} />
              <h6 className={styles.titNav}> {cliente.Nombre}</h6> 
              
              </div>
              <NavItem>
              <Button className={styles.buttonNav} onClick={toggle} color='primary' >
                Ver Historial
              </Button>
              </NavItem>
              <NavItem>
              <Button className={styles.buttonNav} href="/Login" color='primary' >
                Cerrar Sesión
              </Button>
              </NavItem>
      
            </Nav>
        
          
        </Navbar>

      </div>

  
      
    
      <Container className={styles.body}>
  
  <Row className={styles.container}>
 
 <Col sm="4">
  <Card body className={styles.card} >
    <CardTitle tag="h2">
      Agendar Cita
    </CardTitle>
    <a  href="/AgendarCita"  >
	   <FiCalendar className={styles.icon}/>
    </a>
  </Card>
 </Col>
 
 <Col sm="4">
  <Card body className={styles.card} >
    <CardTitle tag="h2">
      Ver Barberos
    </CardTitle>
    <a href="/VerBarbero"> 
 	    <FiUsers className={styles.icon} />
    </a>
  

  </Card>
 </Col>

 <Col sm="4">
  <Card body className={styles.card} >
    <CardTitle tag="h2">
      Ver Citas 
    </CardTitle>
    <a  href="/CitasPendientes"  >
	   <BiCalendarEvent className={styles.icon}/>
    </a>

  </Card>
 </Col>
 

 
 
 
 

 
 </Row>
  </Container>
</div>
 
  
  
  

    <div>
    
          <Modal isOpen={modal} toggle={toggle} 
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 1300 }}
          className={styles.modal}
          fullscreen
          >
            <ModalHeader toggle={toggle}>Tu Historial : {cliente.Nombre}  </ModalHeader>
            <ModalBody>

              
            <div>
            <Table bordered hover responsive className={styles.table}>
          <thead>
            <tr>
              <th>Nombre del cliente</th>
              <th>Apellidos</th>
              <th>Número</th>
              <th>Barbero</th>
              <th>Servicio</th>
              <th>Costo</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estatus</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.Numero}>
                <td>{cita.NombreCliente}</td>
                <td>{cita.Apellido}</td>
                <td>{cita.Numero}</td>
                <td>{cita.NombreBarbero}</td>
                <td>{cita.ServicioNombre}</td>
                <td>{"$"+cita.Costo}</td>
                <td>{cita.Fecha}</td>
                <td>{cita.Hora}</td>
                <td>{cita.Estatus}</td>
              </tr>
            ))}
          </tbody>
        </Table>
            </div>

              
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>
                Cerrar Historial
              </Button>
             
            </ModalFooter>
          </Modal>
        </div>
            </React.Fragment>
            ))}
 	 </>
               ) : (
                <>
                <div>
                     <div>
                     
                     <Navbar className={styles.nav} fixed='top' color='dark'>
                     <a href="/">
                     <img src={logo} alt='logo' className={styles.logo}></img>
                    </a>
                     <a href="/" className={styles.titleNav}>The Barber´s</a>
                         <Nav>
                           <NavItem>
                           <Button className={styles.buttonNav} href="/Login" color='primary'>
                       Iniciar Sesión
                           </Button>
                           </NavItem>
                           <NavItem>
                           </NavItem>
                         </Nav>
                     </Navbar>
                   </div>
             
               
                   
                 
                   <Container className={styles.body}>
               
               <Row className={styles.container}>
              
              <Col sm="6">
               <Card body className={styles.card} >
                 <CardTitle tag="h2">
                   Agendar Citas
                 </CardTitle>
                 
                <a href="/AgendarCita"> 
                <FiUsers className={styles.icon} />
                </a>
               </Card>
              </Col>
              
              <Col sm="6">
               <Card body className={styles.card} >
                 <CardTitle tag="h2">
                   Ver Barberos
                 </CardTitle>
                 
                 <a  href="/VerBarbero"  >
                 <FiCalendar className={styles.icon}/>
                 </a>
               </Card>
              </Col>
              
             
              
              
              
              
             
              
              </Row>
               </Container>
             </div>
              
               
               
               
             
                
                 </>
          )}
    </>
  );
}
