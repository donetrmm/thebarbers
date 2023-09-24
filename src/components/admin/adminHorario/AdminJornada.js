// AdminJornada.js (frontend)

import React, { useState } from 'react';
import { Button, Navbar, Nav, NavItem, Form, FormGroup, Label, Input,Col,Row,Placeholder
 } from 'reactstrap';
import styles from "./adminHorario.module.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../img/logoTB.png"
export default function AdminJornada() {
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");


  const guardar = () => {
    if (horaInicio === "" || horaFin === "") {
      toast.error("Por favor, complete los campos de hora de inicio y hora de fin");
      return;
    }

    const idJornada = 312111;
    const data = {
      horaInicio: horaInicio,
      horaFin: horaFin
    };

    axios
      .put(`http://23.23.118.169/jornada/${idJornada}`, data)
      .then(() => {
        toast.success("Jornada actualizada correctamente");
        window.location.assign("/AdminJornada");
      })
      .catch((error) => {
        console.error('Error al actualizar la jornada:', error);
        toast.error("Error al actualizar la jornada");
      });
  };

  const validarHora = (hora) => {
    const parts = hora.split(":");
    const minutes = parseInt(parts[1]);

    if (minutes % 30 !== 0) {
      toast.error("Por favor, seleccione una hora que sea múltiplo de 30 minutos");
      return false;
    }

    return true;
  };

  const handleHoraInicioChange = (e) => {
    const hora = e.target.value;

    if (validarHora(hora)) {
      setHoraInicio(hora);
    }
  };

  const handleHoraFinChange = (e) => {
    const hora = e.target.value;

    if (validarHora(hora)) {
      setHoraFin(hora);
    }
  };

  return (
    <>
      <div>
      <Navbar className={styles.nav} color='dark' fixed='top'>
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
        <h1>Administrar Jornada Laboral</h1>
        <Form className={styles.form}>
        <Row className={styles.container}> 
        <Col sm="12">
        <h4>Seleccione la Hora de Inicio y Fin</h4>
        </Col>
        <Placeholder
          color="primary"
          xs={12}
        />
        <p></p>
          <div className={styles.bodyC}>
            <Button className={styles.btnC} color='danger' outline href="/MenuAdmin" >Cancelar</Button>
            </div>
        <Col sm="3">  
          <FormGroup>
            <Label for="horaInicio">Hora de Inicio</Label>
            <Input
              id="horaInicio"
              name="time"
              type="time"
              value={horaInicio}
              onChange={handleHoraInicioChange}
            />
          </FormGroup>
          </Col>
          <Col sm="3">  
          <FormGroup>
            <Label for="horaFin">Hora de Fin</Label>
            <Input
              id="horaFin"
              name="time"
              type="time"
              value={horaFin}
              onChange={handleHoraFinChange}
            />
          </FormGroup>
          </Col>
          <Col sm="12">
          <Button className={styles.btn} color="primary" outline onClick={guardar}>
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
