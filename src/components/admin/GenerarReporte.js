import React, { useEffect, useState } from 'react';
import { Container, Card, CardBody, Button,Col,Row,Nav,Navbar,NavItem } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import axios from 'axios';
import estilo from "./adminServi/adminServi.module.css";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 20,
    padding: 0,
    flexGrow: 1,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellHeader: {
    backgroundColor: '#f0f0f0',
    color: '#000',
    padding: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    width: '14.28%',
    fontSize: 12,
  },
  tableCell: {
    padding: 5,
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    width: '14.28%',
    fontSize: 8,
  },
  emailCell: {
    padding: 5,
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    width: '14.28%',
    fontSize: 8  ,
  },
});

const ReportView = () => {
  const [clientes, setClientes] = useState([]);

  const fetchClientes = () => {
    axios
      .get('http://23.23.118.169/generarReporte') 
      .then((response) => {
        if (response.data) {
          setClientes(response.data);
        } else {
          toast.error('No se encontraron datos de clientes');
        }
      })
      .catch((error) => {
        console.error('Error al obtener los clientes:', error);
        toast.error('Error al obtener los clientes');
      });
  };
  React.useEffect(() => {
    fetchClientes();
  }, []);

  const generatePDF = (orientation) => {
    const MyDocument = () => (
      <Document>
        <Page size="A4" orientation={orientation} style={styles.page}>
          <View style={styles.section}>
            <Text style={{ fontSize: 14, margin: 10 }}>Reporte de Clientes</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellHeader}>Cliente ID</Text>
                <Text style={styles.tableCellHeader}>Email</Text>
                <Text style={styles.tableCellHeader}>Password</Text>
                <Text style={styles.tableCellHeader}>Nombre</Text>
                <Text style={styles.tableCellHeader}>Apellidos</Text>
                <Text style={styles.tableCellHeader}>Número</Text>
                <Text style={styles.tableCellHeader}>Fecha de Nacimiento</Text>
              </View>
              {clientes.map((cliente) => (
                <View key={cliente.clienteid} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{cliente.clienteid}</Text>
                  <Text style={styles.emailCell}>{cliente.Usuario}</Text>
                  <Text style={styles.tableCell}>{cliente.Password}</Text>
                  <Text style={styles.tableCell}>{cliente.Nombre}</Text>
                  <Text style={styles.tableCell}>{cliente.Apellidos}</Text>
                  <Text style={styles.tableCell}>{cliente.Numero}</Text>
                  <Text style={styles.tableCell}>{cliente.FechaNacimiento}</Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );

    const pdfName = 'reporte_clientes.pdf';

    return (
      <PDFDownloadLink document={<MyDocument />} fileName={pdfName}>
        {({ blob, url, loading, error }) =>
          loading ? 'Generando PDF...' : <Button color='primary' className={estilo.btn}>Generar PDF</Button>
        }
      </PDFDownloadLink>
    );
  };

  return (
    <> 
    <div>

    <div>
      <Navbar className={estilo.nav} color='dark'>
        <a href="/MenuAdmin" className={estilo.titleNav}>The Barber´s</a>
          <Nav className={estilo.navb}>
            <NavItem>
            
            </NavItem>
          </Nav>
        </Navbar>
      </div>
       
    <Container className={estilo.form}>
      <Row className={estilo.container}> 
      <ToastContainer />
      <Col sm="12"> 
      <h1>Generar Reportes</h1>
      </Col>
      <Col sm="5"> 
      <Card>
        <CardBody>
          <h2>Horizontal</h2>
          {generatePDF('landscape')}
        </CardBody>
      </Card>
      </Col>
      <Col sm="5">
      <Card>
        <CardBody>
          <h2>Vertical</h2>
          {generatePDF('portrait')}
        </CardBody>
      </Card>
      </Col>
      </Row>
    </Container>
    </div>
    </>
  );
};

export default ReportView;
