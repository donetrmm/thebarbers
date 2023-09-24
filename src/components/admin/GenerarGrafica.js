import React, { useEffect, useState } from 'react';
import { Container,Row,Col,Nav,NavItem,Navbar } from 'reactstrap';
import { VictoryPie } from 'victory';
import axios from 'axios';
import estilo from "./adminServi/adminServi.module.css"

const GenerarGraficas = () => {
  const [data, setData] = useState([]);
  const [malePercentage, setMalePercentage] = useState(0);
  const [femalePercentage, setFemalePercentage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://23.23.118.169/gender');
        const { malePercentage, femalePercentage } = response.data;

        const chartData = [
          { x: 'Masculino', y: malePercentage },
          { x: 'Femenino', y: femalePercentage },
        ];

        setData(chartData);
        setMalePercentage(malePercentage);
        setFemalePercentage(femalePercentage);
      } catch (error) {
        console.error('Error al obtener los datos del backend:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <> 
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
      <Col sm="12"> 
      <h1>Porcentaje de Usuarios por Género</h1>
      <br/>
      <br/>
      </Col>
  
      <Col sm="5"> 
      <h4>Porcentaje de Hombres: {malePercentage}%</h4>
      
    
      </Col>
      <Col sm="5"> 
      <h4>Porcentaje de Mujeres: {femalePercentage}%</h4>
   
  
      </Col>
      <Col sm="5"> 
      <VictoryPie
       
        colorScale={['#0fc3e8', '#8870ff']}
        labelRadius={40}
        responsive={true}
        
        color={['#fefeeb']}


        events={[{
          target: "data",
          eventHandlers: {
            onClick: () => {
              return [
                {
                  target: "data",
                  mutation: ({ style }) => {
                    return style.fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                  }
                }, {
                  target: "labels",
                  mutation: ({ text }) => {
                    return text === "clicked" ? null : { text: "clicked" };
                  }
                }
              ];
            }
          }
        }]}
        data={data}
        style={{
          data: {
            fillOpacity: 0.9, strokeWidth: 3,stroke: "#d5ded9"
          },
          labels: {
            fontSize: 20, fill: "#ffffff"
          }
        }}
      />
      </Col>
  
      </Row>
    </Container>
    </>
  );
};

const App = () => {
  return <GenerarGraficas />;
};

export default App;
