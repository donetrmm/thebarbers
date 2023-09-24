import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Nav, Navbar } from 'reactstrap';
import styles from './inicio.module.css';
import axios from 'axios';
import logo from "../../img/logoTB.png"
import { toast } from 'react-toastify';
const Inicio = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numero, setNumero] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    removeDataFromLocalStorage();
    removeLoggedFromLocalStorage();
  }, []);

  const saveNumToLocalStorage = (data) => {
    localStorage.setItem('key', JSON.stringify(data));
  };

  const removeDataFromLocalStorage = () => {
    localStorage.removeItem('key');
  };

  const obtenerNum = () => {
    axios
      .get(`http://23.23.118.169/numLogin/${email}`)
      .then((response) => {
        setNumero(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los números:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://23.23.118.169/login', { email, password })
      .then((response) => {
        if (response.status === 200) {
          toast.info(response.data.message);

          if (response.data.message === '¡Tus datos son correctos!') {
            obtenerNum(); // Fetch the data after successful login
            setIsLogged(true);
            saveLoggedToLocalStorage(true); // Save the login status to local storage
          } else if (response.data.message === '¡Eres un administrador!') {
            setIsLogged(true);
            window.location.assign('/MenuAdmin');
            return; 
          }
        } else {
          toast.error('Error en el servidor');
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  };

  const saveLoggedToLocalStorage = (data) => {
    localStorage.setItem('isLogged', JSON.stringify(data));
  };

  const removeLoggedFromLocalStorage = () => {
    localStorage.removeItem('isLogged');
  };

  useEffect(() => {
    if (isLogged && numero.length > 0) {
      // If the user is logged in and the numero state has data, save it to local storage
      saveNumToLocalStorage(numero.map((item) => item.Numero));
      // Redirect the user to the appropriate menu based on the login response
      const redirectPath = numero.length > 0 ? '/Menu' : '/MenuAdmin';
      window.location.assign(redirectPath);
    }
  }, [isLogged, numero]);

  return (
    <>
      <div>
        <Navbar className={styles.nav} fixed='top' color='dark'>
        <a href="/">
      <img src={logo} alt='logo' className={styles.logo}></img>
      </a>
          <a href="/" className={styles.titleNav}>The Barber´s</a>
         
          <Nav></Nav>
        </Navbar>
      </div>
      <div className={styles.body}>
        <h1 className={styles.tit}>Inicio de Sesión</h1>
        <div className={styles.card}>
          <Form className={styles.form}>
            <FormGroup floating>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={styles.input}
              />
              <Label for="exampleEmail">Correo Electrónico</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="examplePassword"
                name="password"
                placeholder="contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              <Label for="examplePassword">Contraseña</Label>
            </FormGroup>
            <div className={styles.bodyBtn}>
              <Button className={styles.btn} onClick={handleSubmit} color="primary">
                Ingresar
              </Button>
              <Button className={styles.btn} href="/RegistrarUsuario" color="link">
                Crear Cuenta
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Inicio;
