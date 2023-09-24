import React, { useEffect, useState } from 'react';
import { Button, Navbar, Nav, NavItem, Table,Placeholder } from 'reactstrap';
import styles from "./adminCita.module.css";

import logo from "../../img/logoTB.png"

export default function AdminCita() {
  const [citas, setCitas] = useState([]);
  


  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      const response = await fetch('http://23.23.118.169/getCitas');
      const data = await response.json();
      
      const sortedCitas = data.sort((a, b) => (a.Hora > b.Hora) ? 1 : -1);
      setCitas(sortedCitas);
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }
  };

  const renderCitas = () => {
    const citasByDay = {
      Lunes: [],
      Martes: [],
      Miercoles: [],
      Jueves: [],
      Viernes: [],
      Sabado: [],
      Domingo: []
    };

    citas.forEach(cita => {
      console.log(citasByDay[cita.Dia]);
      console.log(cita);
      switch(cita.Dia){
        case 'Lunes':
          citasByDay.Lunes.push(cita);
          break;
          case 'Martes':
            citasByDay.Martes.push(cita);
            break; 
            case 'Miércoles':
              citasByDay.Miercoles.push(cita);
              break; 
              case 'Jueves':
                citasByDay.Jueves.push(cita);
                break; 
                case 'Viernes':
                  citasByDay.Viernes.push(cita);
                  break;
                  case 'Sábado':
                    citasByDay.Sabado.push(cita);
                    break; 
                    case 'Domingo':
                      citasByDay.Domingo.push(cita);
                      break;
          default:
            break;
      }
      
    });

    return Object.keys(citasByDay).map(day => (
      <td key={day}>
        {citasByDay[day].map(cita => (
          <div key={cita.CitaID}>
                  <Placeholder
                    animation="glow"
                    color='light'
                    size="sm"
                    xs={12}
                    tag="p"
                  />
            <span> <b>Nombre Cliente:</b> <i> {cita.NombreCliente}</i></span>
            <br />
            <span><b>Número:</b> <i>{cita.Numero}</i></span>
            <br />
            <span><b>Servicio:</b> <i> {cita.ServicioNombre}</i></span>
            <br />
            <span><b>Hora:</b> <i>{cita.Hora}</i></span>
            <br />
           
          <span><b>Barbero:</b> <i>{cita.NombreBarbero}</i></span>
                   <Placeholder
                    animation="glow"
                    color='light'
                    size="sm"
                    xs={12}
                    tag="p"
                  />
  
          </div>
        ))}
      </td>
    ));
  };

  return (
    <>
      <div>
      <Navbar className={styles.nav} color='dark' fixed='top' >
      <a href="/MenuAdmin">
      <img src={logo} alt='logo' className={styles.logo}></img>
      </a>

        <a href="/MenuAdmin" className={styles.titleNav}>The Barber´s</a>
          <Nav className={styles.navb}>
            <NavItem>
              <Button className={styles.buttonNav} href="/Login" color='primary'>
                Cerrar Sesión
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>

      <div className={styles.body}>
        <h1>Administrar Citas</h1>
        <Placeholder
          color="primary"
          xs={12}
        />
        <div className={styles.tablaCont}> 
        <Table bordered hover responsive className={styles.table}>
          <thead>
            <tr>
              <th><b>Lunes</b></th>
              <th><b>Martes</b></th>
              <th><b>Miércoles</b></th>
              <th><b>Jueves</b></th>
              <th><b>Viernes</b></th>
              <th><b>Sábado</b></th>
              <th><b>Domingo</b></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {renderCitas()}
            </tr>
          </tbody>
        </Table>
        </div>

        <div>
          <Button className={styles.btn} color='primary' outline href="/AgregarCitaAdmin">Agregar Cita</Button>
          <Button className={styles.btn} color="danger" outline href="/EliminarCitaAdmin">Eliminar Cita</Button>
        </div>
      </div>
    </>
  );
}
