import React,{useState,useEffect}from 'react';
import api from '../services/api'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Cookies from 'universal-cookie';
import AdminAnuncio from './adminAnuncio';
import { StreamChat } from 'stream-chat';

import Register from "../components/Header/Register"
import EXCategory from '../components/UI/EXCategory';


const cookies = new Cookies();
const authToken = cookies.get("token");

const apiKey = 'vxwzb46w7drg';
const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        fullname: cookies.get('fullname'),
        name: cookies.get('email'),
        hashedPassword: cookies.get('hashedPassword'),
    }, authToken)
}

function RegisterCategory() {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      const response = await api.get("/cat/subcat");
      setCategoryOptions(response.data);
    }
    fetchCategories();
  }, []);

  if (!authToken) return <Register />;

  function handleSubmit(event) {
    event.preventDefault();
    window.location.href = `/cars/registerCategory/registerSub/${selectedCategory}`;
  }

  
  const email = cookies.get('email');
if (email === "admin@gmail.com") return <AdminAnuncio/>
  return (
<div className="container" style={{ height: '80vh', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
<EXCategory/>
<Form style={{ width: '100vw', margin:'50px' }}>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Categoria</Form.Label>
        <Form.Select
          defaultValue=""
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          style={{ width: '100%' }}
        >
          <option value="">Escolha a categoria...</option>
          {categoryOptions.map((category) => (
            <option key={category.ID} value={category.ID}>
              {category.categoryName}
            </option>
          ))}
        </Form.Select>
        <br/>
        <br/>
        <Button variant="primary" onClick={handleSubmit}> Selecionar</Button>
      </Form.Group>
    </Row>
  </Form>
 
</div>
  );
}

export default RegisterCategory;