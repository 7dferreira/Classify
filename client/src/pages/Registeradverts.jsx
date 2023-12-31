import React,{useState , useEffect}from 'react';
import moment from 'moment';
import api from '../services/api';
import AdminAnuncio from './adminAnuncio';
import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBTypography,
  MDBIcon,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import {useParams} from 'react-router-dom'

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

export default function  Registeradverts() {


  const clientID = cookies.get('userID');
  const {vehicleID} = useParams()
 


  async function handleSubmitFree(e) {
    e.preventDefault();

    const data = {
      vehicleID:vehicleID,
      clientID: clientID,
      publishAD_date: moment().format('YYYY-MM-DD'),
    };
     try {
      api.post('/publi/publishad', data);
      window.location.href = '/cars'
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar!');
    }
  }     
  async function handleSubmitPree(e) {
    e.preventDefault();
  
    try {
      // Insere o registro de publishad
      const publishAdData = {
        vehicleID: vehicleID,
        clientID: clientID,
        publishAD_date: moment().format('YYYY-MM-DD'),
      };
      const publishAdResponse = await api.post('/publi/publishad', publishAdData);
      const publishadID = publishAdResponse.data.id;
   
  
      // Insere o registro de purchaseadvert com o ID do publishad
      const purchaseAdData = {
        publishadID: publishadID,
     };
     
      const purchaseAdResponse = await api.post('/padvert/purchaseadvert', purchaseAdData);
  
      // Exibe mensagem de sucesso
      const purchaseID = purchaseAdResponse.data.ID
      
  
      window.location.href = `/${publishadID}/${purchaseID}/RegisterInvoice`
    } catch (error) {
      console.error(error);
    
    }
  }


  const email = cookies.get('email');
if (email === "admin@gmail.com") return <AdminAnuncio/>


  return (
    <div style={{backgroundColor:"#000d6b", height:850}}>
      
      <MDBContainer className="py-5  mb-5 rounded bg-white">
      <div className="text-center">
        <h4 classaName="mb-4">
          <strong>Escolha o tipo de anuncio</strong>
        </h4>

     <br/>
     <br/>
      </div>

      <MDBRow>
        <MDBCol md="2">
        
        </MDBCol>

        <MDBCol md="3">
          <MDBCard border="dark">
            <MDBCardBody className="mx-2">
              <MDBCardTitle className="my-2">Anuncio Simples</MDBCardTitle>
              <p className="text-muted">
                O anuncio do seu veiculo á distância de um clique
              </p>
              <p className="h2 fw-bold">
                Free
                <small className="text-muted" style={{ fontSize: "18px" }}>
                  
                </small>
              </p>
              <MDBBtn
                href="#"
                color="warning"
                style={{
                  width: "100%",
                  height:'30px',
                  padding:'20px',
                  display:'flex',
                  alignItems:'center', 
                  justifyContent:'center'
                }}
                onClick={handleSubmitFree}
              >
                Selecionar
              </MDBBtn>
            </MDBCardBody>
            

            <MDBCardFooter>
              <p
                className="text-uppercase fw-bold"
                style={{ fontSize: "12px" }}
              >
                Beneficios
              </p>
            
              <MDBTypography listUnStyled className="mb-0 px-4">
                <li className="mb-3">
                  <MDBIcon fas icon="check" className="text-success me-3" />
                  <small>
               
                  <i class="ri-checkbox-circle-line"></i> Publicação do seu anuncio
             
                  </small>
                </li>
                <li className="mb-3">
                  <MDBIcon fas icon="check" className="text-success me-3" />
                  <small>    <i class="ri-checkbox-circle-line"></i> Comunicação via mensagem com os interessados</small>
                </li>
                <li className="mb-3">
                  <MDBIcon fas icon="check" className="text-success me-3" />
                  <small>    <i class="ri-checkbox-circle-line"></i> Inclusão na lista de anuncios</small>
                </li>
              </MDBTypography>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
        <MDBCol md="2">
        
        </MDBCol>

        <MDBCol md="3">
          <MDBCard border="dark">
            <MDBCardBody className="mx-2">
              <MDBCardTitle className="my-2">Anuncio Premium</MDBCardTitle>
              <p className="text-muted">
                O seu veiculo na pole-position para vender!!!!!!!
              </p>
              <p className="h2 fw-bold">
                €40
                <small className="text-muted" style={{ fontSize: "18px" }}>
                  /ano
                </small>
              </p>
              <MDBBtn
                href="#"
                color="warning"
                
                style={{
                  width: "100%",
                  height:'30px',
                  padding:'20px',
                  display:'flex',
                  alignItems:'center', 
                  justifyContent:'center'
                }}
              onClick={handleSubmitPree}
              >
                    Selecionar
             
              </MDBBtn>
            </MDBCardBody>

            <MDBCardFooter>
              <p
                className="text-uppercase fw-bold"
                style={{ fontSize: "12px" }}
              >
                Beneficios
              </p>

              <MDBTypography listUnStyled className="mb-0 px-4">
                <li className="mb-3">
                  <MDBIcon fas icon="check" className="text-success me-3" />
                   <small>    <i class="ri-checkbox-circle-line"></i> Publicação do seu anuncio</small>
                </li>
                <li className="mb-3">
                  <MDBIcon fas icon="check" className="text-success me-3" />
                   <small>    <i class="ri-checkbox-circle-line"></i> Comunicação via mensagem com os interessados</small>
                </li>
                <li className="mb-3">
                  <MDBIcon fas icon="check" className="text-success me-3" />
                   <small>    <i class="ri-checkbox-circle-line"></i> O seu anuncio em DESTAQUE na lista de anuncios</small>
                </li>
                <li className="mb-3">
                  <MDBIcon fas icon="check" className="text-success me-3" />
                   <small>    <i class="ri-checkbox-circle-line"></i> Acesso a dados estatisticos do seu anuncio</small>
                </li>
              </MDBTypography>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>

      </MDBRow>
    </MDBContainer>
      
    </div>
  );
}