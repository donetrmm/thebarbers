
import React from 'react'
import {

    Button,
    Nav,
    Navbar,
    NavItem,
    Row,
    Col,
    UncontrolledCarousel
  } from "reactstrap";
  import styles from "./barbers.module.css";
  import imgLogo from "../../img/logoTB.png"
  import { HiOutlineScissors } from "react-icons/hi";
  import { BiGroup } from "react-icons/bi";
  import { BsCalendarWeek } from "react-icons/bs";
  import { FaRegEdit } from "react-icons/fa";
  
  
export default function TheBarbers() {
  return (
    <>
    <div>
      <Navbar className={styles.nav} fixed="top" color="dark">
        <a href="/" className={styles.titleNav}>
          The Barber´s
        </a>
        <Nav>
        <NavItem>
            <Button className={styles.buttonNav} href="/Menu" color="primary">
              Citas
            </Button>
          </NavItem>
          <NavItem>
            <Button className={styles.buttonNav} href="/Login" color="primary">
              Iniciar Sesión
            </Button>
          </NavItem>
         
        </Nav>
      </Navbar>
      <div className={styles.cont}>
        <Row className={styles.row1}> 
          <Col sm="6">
          <h1>The Barber´s</h1>
          <img src={imgLogo} alt='logo' className={styles.imgLogo}></img>
          </Col>
          <Col sm="6">
          <h4>
          The barber's es tu barbería de confianza que siempre busca
          ofrecerle el mejor servicio y la mejor calidad a sus clientes proporcionando una 
          experiencia completa que va más allá de los simples cortes de cabello y afeitado.
          </h4>
          </Col>
        </Row>

        <Row className={styles.row2}>
          <Col sm='12'>
            <h1>Nuestras Instalaciones</h1>
          </Col>
          <Col sm="12">
         
<UncontrolledCarousel
  items={[
    {
 
      key: 1,
      src: 'https://d375139ucebi94.cloudfront.net/region2/ie/9403/biz_photo/033406ec26ab41d2bc0c6ada69c1d6-barberia-biz-photo-a123024f69be44a4b09dc31cc727d2-booksy.jpeg?size=640x427'
    },
    {
   
      key: 2,
      src: 'https://joseppons.com/formacion/wp-content/uploads/2020/11/servicios-salon-barberia.jpeg'
    },
    {
   
      key: 3,
      src: 'https://www.malagahoy.es/2023/06/11/la-farola/interior-Barberia-Clasica-Museo_1801330254_186625210_667x375.jpg'
    }
  ]}
 />
          </Col>
      
        </Row>
        <Row className={styles.row3}> 
          
          <Col sm="6" className={styles.col3}>
          <h1 className={styles.h1C3}>Encuentra el estilo que siempre has buscado</h1>
          <h5 className={styles.h5C3}>Estamos para atenderte con toda la atención y dedicación que se merece</h5>
          </Col>
          <Col sm="6">
          <UncontrolledCarousel
  items={[
    {
 
      key: 1,
      src: 'https://www.clubdecaballeros.co/wp-content/uploads/2022/04/DSC_0235.jpg'
    }
  ]}
 />
          
          </Col>
        </Row>
        <Row className={styles.row4}> 
          <Col sm="12" className={styles.col3}>
          <h1>Pasos Para Agendar una Cita</h1>
          <h5 className={styles.h1C3}><i>Genera tu Cita Online</i></h5>
          <h5 className={styles.h1C3}>Haz tu cita de manera online, más rápido y más personalizado </h5>
          <Button color='primary' outline href="/AgendarCita" className={styles.btn1}>Haz tu cita</Button>
          </Col>
  
        </Row>
        <Row className={styles.row5}> 
         <Col sm="3" className={styles.col5}>
         <BiGroup className={styles.icon} />
         <h2>Selecciona a tu Barbero</h2>
         <h5>Te mostraremos una lista de barberos disponibles. En la app también podrás ver las calificaciones y reseñas de otros clientes que han sido atendidos por el barbero en cuestión.</h5>
         </Col>
         <Col sm='3' className={styles.col5}>
         <HiOutlineScissors className={styles.icon} />
          <h2>Selecciona tu servicio</h2>
          <h5>Cada servicio vendrá acompañado de una descripción, podrás explorar una amplia variedad de estilos para encontrar el que mejor se adapte a tu personalidad y gustos.</h5>
         </Col>
         <Col sm='3' className={styles.col5}>
          <BsCalendarWeek className={styles.icon} />
          <h2>Selecciona el día y la hora</h2>
          <h5>Podrás elegir la fecha y hora que más te convenga para tu cita. Y no te preocupes por olvidarla, recibirás la información de tu cita a tu correo electrónico.</h5>
          </Col>
          <Col sm='5' className={styles.col5}>
            <FaRegEdit className={styles.icon} />
          <h2>Agrega tus datos</h2>
          <h5>Finalmente ingresa tus datos para poder generar tu cita</h5>
          </Col>
       
  
        </Row>
      </div>
    </div>
  </>
  )
}
