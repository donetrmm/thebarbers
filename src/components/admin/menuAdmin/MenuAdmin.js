import React from 'react'
import styles from "./menuAdmin.module.css"
import imgBarber from "../../img/imgBarbero.jpg"
import imgCita from "../../img/imgCita.png"
import imgHistorial from "../../img/imgHistorial.jpg"
import imgServicio from "../../img/imgServicio.jpg"
import imgHorario from "../../img/imgHorario.jpg"
import logo from "../../img/logoTB.png"
import {
 
    Navbar,
    Nav,
    NavItem,
   Card,
    Row,
    Col,
    CardTitle,
    Button,
    Container,
  
  
  } from 'reactstrap';

export default function MenuAdmin() {


  return (
   <>
      <div>
      <Navbar className={styles.nav} color='dark' fixed='top'>
      <a href="/">
      <img src={logo} alt='logo' className={styles.logo}></img>
      </a>
        <a href="/" className={styles.titleNav} >The Barber's</a>
      
        <Nav className={styles.navb}> 
          <NavItem>
          <Button className={styles.buttonNav} href="/Login" color='primary'>
           Cerrar Sesión
          </Button>
          </NavItem>
        </Nav>
        </Navbar>
      </div>

 <div>
   
<Container className={styles.body}>
  
 <Row className={styles.container}>

<Col sm="4">
 <Card body className={styles.card}style={{ width: '18rem', margin: '2rem' }}>
   <CardTitle tag="h2">
     Administrar Barberos
   </CardTitle>
   <a href="/AdminBarbero"> 
   <img src={imgBarber} alt='barber' className={styles.img}  />
   </a>

 </Card>
</Col>

<Col sm="4">
 <Card body className={styles.card}style={{ width: '18rem', margin: '2rem' }}>
   <CardTitle tag="h2">
     Administrar Servicios
   </CardTitle>
   <a href="/AdminServicio" > 
   <img src={imgServicio} alt='servicio' className={styles.img}/>
   </a>

 </Card>
</Col>

<Col sm="4">
 <Card body className={styles.card}style={{ width: '18rem', margin: '2rem' }}>
   <CardTitle tag="h2">
    Administrar  Jornada 
   </CardTitle>
   <a href="/AdminJornada">
   <img src={imgHorario} alt='horario' className={styles.img}/>
     </a>

 </Card>
</Col>





<Col sm="4">
 <Card body className={styles.card}style={{ width: '18rem', margin: '2rem' }}>
   <CardTitle tag="h2">
     Administrar Citas
   </CardTitle>
    <a href="AdminCita"> 
    <img src={imgCita} alt='cita' className={styles.img}/>
    </a>

 </Card>
</Col>

<Col sm="4">
 <Card body className={styles.card}style={{ width: '18rem', margin: '2rem' }}>
   <CardTitle tag="h2">
     Ver Historial
   </CardTitle>
   <a href="AdminHistorial">
   <img src={imgHistorial} alt='historial' className={styles.img}/>
     </a>

 </Card>
</Col>
</Row>
 </Container>


 </div>


 </>
  )
}
