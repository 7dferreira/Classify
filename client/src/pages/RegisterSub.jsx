import React,{useState}from 'react';
import { Link } from "react-router-dom";
import api from '../services/api'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';

import Register from "../components/Header/Register"

const cookies = new Cookies();
const authToken = cookies.get("token");

const apiKey = 'cd4bcsnrt3ej';
const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        fullname: cookies.get('fullname'),
        name: cookies.get('email'),
        hashedPassword: cookies.get('hashedPassword'),
    }, authToken)
}
function RegisterSub(){
   const [SubcategoryName , setSubcategoryName] = useState('');

   if(!authToken) return <Register />
  function handleSelectChange(event) {
    setSubcategoryName(event.target.value);
  }


  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post('/subcat/sub', { SubcategoryName });
      console.log(response.data); // ou faça algo com a resposta do servidor
    } catch (error) {
      console.error(error);
    }
  }
  return (
   <div style={{ display: 'block', 
   width: 900,
   marginLeft: 500,
   marginTop:200, 
   padding: 30 ,
   height:600}}>
     <Form>
    



    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>sub-categoria</Form.Label>
        <Form.Select defaultValue="ecolha a sub-categoria..." value={SubcategoryName} onChange={handleSelectChange}>
         <option value={'SUV'} id='SUV'  >SUV</option>
         <option value={'Desportivo'} id='Desportivo'>Desportivo</option>
         <option value={'Citadinos'} id='Citadinos'>Citadinos</option>
        </Form.Select>
      </Form.Group>
    </Row>
    <Button variant="primary"  onClick={handleSubmit} style={{ display: 'flex', 
    marginLeft: 800,
  textDecoration: 'none',
  color:'white'
   }}>
    <Link to="RegisterVhicle" className=" d-flex align-items-center gap-1"  style={{
   
  textDecoration: 'none',
  color:'white'
   }}>
                next
              </Link>
    </Button>


  
  </Form>
   </div>
  );
}

export default RegisterSub;