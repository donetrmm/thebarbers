import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../img/logoTB.png"
import styles from './regisUser.module.css';

export default function RegisUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [numero, setNumero] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [numeroValid, setNumeroValid] = useState(true);
  const [isUnderage, setIsUnderage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      nombre,
      apellidos,
      numero,
      fechaNacimiento,
    };

    axios
      .post('http://23.23.118.169/registro', userData)
      .then((response) => {
        console.log(response.data.message);
        toast.success('Registro exitoso', {
          position: toast.POSITION.BOTTOM_RIGHT,
          hideProgressBar: true,
        });
        window.location.assign('/Login');
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data.message === 'DuplicateKeyError') {
          toast.error('El número o correo electrónico ya está registrado', {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
          });
        } else {
          toast.error('Error en el servidor', {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
          });
        }
      });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const getPasswordStrength = () => {
    const lengthRegex = /^.{8,}$/;
    const uppercaseRegex = /^(?=.*[A-Z]).+$/;
    const lowercaseRegex = /^(?=.*[a-z]).+$/;
    const symbolRegex = /^(?=.*[!@#$%^&*()?]).+$/;
    const numberRegex = /^(?=.*[0-9]).+$/;

    if (
      password.match(lengthRegex) &&
      password.match(uppercaseRegex) &&
      password.match(lowercaseRegex) &&
      password.match(symbolRegex) &&
      password.match(numberRegex)
    ) {
      return 'strong';
    } else if (
      password.match(lengthRegex) &&
      password.match(uppercaseRegex) &&
      password.match(lowercaseRegex)
    ) {
      return 'medium';
    } else {
      return 'weak';
    }
  };

  const isFormValid = () => {
    return (
      email !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      nombre !== '' &&
      apellidos !== '' &&
      numero !== '' &&
      fechaNacimiento !== '' &&
      passwordMatch &&
      emailValid &&
      numeroValid &&
      !isUnderage
    );
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(/^\S+@\S+\.\S+$/.test(e.target.value));
  };

  const handleNumeroChange = (e) => {
    setNumero(e.target.value);
    setNumeroValid(/^\d{10}$/.test(e.target.value));
  };

  const handleDateChange = (e) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const selectedYear = new Date(e.target.value).getFullYear();
    const allowedYear = currentYear - 15;
    if (selectedYear > allowedYear) {
      setIsUnderage(true);
      e.target.value = '';
    } else {
      setIsUnderage(false);
      setFechaNacimiento(e.target.value);
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div>
        <Navbar className={styles.nav} fixed='top' color='dark'>
        <a href="/Login">
      <img src={logo} alt='logo' className={styles.logo}></img>
      </a>
        <a href="/Login" className={styles.titleNav}>The Barber´s</a>
            <Nav className={styles.navb}>
              <NavItem>
                <Button className={styles.buttonNav} href="/Login" color='primary'>
                  Iniciar Sesión
                </Button>
              </NavItem>
            </Nav>
          </Navbar>
        </div>

        <div className={styles.card}>
        <h1>Registrarse</h1>
          <Form className={styles.form} onSubmit={handleSubmit}>
            
            <Row className={styles.row}>  
              <Col sm="5"> 
            <FormGroup floating>
              <Input
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                type="text"
                required
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
              />
              <Label for="nombre">Nombre</Label>
            </FormGroup>
            </Col>
            <Col sm="5"> 
            <FormGroup floating>
              <Input
                id="apellidos"
                name="apellidos"
                placeholder="Apellidos"
                type="text"
                required
                onChange={(e) => setApellidos(e.target.value)}
                value={apellidos}
              />
              <Label for="apellidos">Apellidos</Label>
            </FormGroup>
            </Col>
            <Col sm="5"> 
            <FormGroup floating>
              <Input
                id="numero"
                name="numero"
                placeholder="Número de Teléfono"
                type="number"
                required
                onChange={handleNumeroChange}
                value={numero}
                className={!numeroValid ? styles.passwordError : ''}
              />
              <Label for="numero">Número de Teléfono</Label>
              {!numeroValid && <p className={styles.passwordMatchError}>Número inválido.</p>}
            </FormGroup>
            </Col>
            <Col sm="5"> 
            <FormGroup floating>
              <Input
                id="email"
                name="email"
                placeholder="Correo Electrónico"
                type="email"
                required
                onChange={handleEmailChange}
                value={email}
                className={!emailValid ? styles.passwordError : ''}
              />
              <Label for="email">Correo Electrónico</Label>
              {!emailValid && <p className={styles.passwordMatchError}>Correo inválido.</p>}
            </FormGroup>
            </Col>
            <Col sm="5">
            <FormGroup floating>
              <Input
                id="password"
                name="password"
                placeholder="Contraseña"
                type="password"
                required
                onChange={handlePasswordChange}
                value={password}
                className={!passwordMatch ? styles.passwordError : ''}
              />
              <Label for="password">Contraseña</Label>
            </FormGroup>
            <div className={styles.progressBar}>
              <div
                className={`${styles.progressFill} ${
                  getPasswordStrength() === 'weak'
                    ? styles.progressWeak
                    : getPasswordStrength() === 'medium'
                    ? styles.progressMedium
                    : styles.progressStrong
                }`}
                style={{ width: `${(getPasswordStrength() === 'weak' ? 33 : getPasswordStrength() === 'medium' ? 66 : 100)}%` }}
              ></div>
            </div>
            </Col>
   
            <Col sm="5">  
            <FormGroup floating>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                type="password"
                required
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                className={!passwordMatch ? styles.passwordError : ''}
              />
              <Label for="confirmPassword">Confirmar Contraseña</Label>
              {!passwordMatch && (
                <p className={styles.passwordMatchError}>Las contraseñas no coinciden.</p>
              )}
            </FormGroup>
            </Col>
            <Col sm="3">
            <FormGroup>
              <Input
                id="fechaNacimiento"
                name="fechaNacimiento"
                placeholder="Fecha de Nacimiento"
                type="date"
                required
                onChange={handleDateChange}
                value={fechaNacimiento}
                className={isUnderage ? styles.passwordError : ''}
              />
              <Label for="fechaNacimiento">Fecha de Nacimiento</Label>
              {isUnderage && <p className={styles.passwordMatchError}>Debes ser mayor de 15 años.</p>}
            </FormGroup>
            </Col>
            <Col sm="10"> 
            <Button
              className={styles.submitButton}
              type="submit"
              color="primary"
              disabled={!isFormValid()}
              outline
            >
              Registrarse
            </Button>
            </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

