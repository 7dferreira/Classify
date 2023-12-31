import { useState, useEffect }  from "react";
import  SideBar from "./SideBar";
import Table from 'react-bootstrap/Table';
import { useParams, Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPlus} from '@fortawesome/free-solid-svg-icons'
import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import { StreamChat } from 'stream-chat';
import api from '../services/api';
import Register from "../components/Header/Register"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';




// react-bootstrap components
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';


import {
  DialogActions,
  DialogContent,
} from '@mui/material';

const cookies = new Cookies();
const authToken = cookies.get("token");

const apiKey = 'vxwzb46w7drg';
const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        userID: cookies.get('userID'),
        fullname: cookies.get('fullname'),
        name: cookies.get('email'),
        hashedPassword: cookies.get('hashedPassword'),
    }, authToken)
}

function UserProfile() {

  const cookies = new Cookies();

  const fullname = () => cookies.get('fullname');
  const email = () => cookies.get('email');

  const [modalOpenA, setModalOpenA] = useState(false);
  const [modalOpenB, setModalOpenB] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false);

  

  const toggleModalChange = () => {
    setModalOpenA(!modalOpenA);
  }

  const toggleModalAdd = () => {
    setModalOpenB(!modalOpenB);
  }

  const togglePasswordModal = () => {
    setPasswordModalOpen(!passwordModalOpen);
  };

  const toggleEmailModal = () => {
    setEmailModalOpen(!emailModalOpen);
  };

    const handleClickA = () => {
      toggleModalChange();
      
    }

    const handleClickB = () => {
      toggleModalAdd();
      
    }

    const authToken = cookies.get("token");

    const logout = () => {
      cookies.remove("token");
      cookies.remove('userId');
      cookies.remove('fullname');
      cookies.remove('email');
      cookies.remove('hashedPassword');
      cookies.remove('invoiceID');
      localStorage.clear();
      window.location.reload();
      window.location.href= '/home';
  }


  const [telemError, setTelemError] = useState('');
  const [birthdateError, setBirthdateError] = useState('');
  const [localityError, setLocalityError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [locality , setLocality] = useState(null);
  const [telem , setTelem] = useState(null);
  const [birthdate , setBirthdate] = useState(null);
  const [emaill, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedUserId , setSelectedUserId] = useState('');
  const userId = cookies.get('userId');
  const userID = cookies.get('userID');
    
  const { id } = useParams();

  
  useEffect(() => {
    const storedData = localStorage.getItem(`userData_${userID}`);
    if (storedData) {
      const {locality, telem, birthdate } = JSON.parse(storedData);
      setLocality(locality);
      setTelem(telem);
      setBirthdate(birthdate);
    }
  }, [userID]);

  useEffect(() => {
    if (locality && telem && birthdate) {
      localStorage.setItem(`userData_${userID}`, JSON.stringify({ locality, telem, birthdate }));
    }
  }, [locality, telem, birthdate, userID]);

  

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.get('cl/client/'+userID);
        setSelectedUserId(response.data.id)
        setLocality(response.data.locality);
        setTelem(response.data.telem);
        setBirthdate(response.data.birthdate);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
  }, [userID]);


  async function handleDeleteAccount(id, streamChatUserId) {
    const response = await api.delete(`/auth/Users/${id}/${streamChatUserId}`);
        const successMessageElement = document.getElementById('successMessage');
        successMessageElement.style.display = 'block';
      const cookies = new Cookies();
      try {
        cookies.remove("token");
        cookies.remove("userID");
        cookies.remove("userId");
        cookies.remove("fullname");
        cookies.remove("email");
        localStorage.clear();
        
    
      } catch (error) {
        console.error('Error removing cookies:', error);
      }
      
    }
      

  useEffect(() => {
    api.get(`/auth/Users/${id}`)
      .then(response => {
        const UserData = response.data;
        setEmail(UserData.email)
        setPassword(UserData.password)
       
        console.log(UserData)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [Ads , setAds] = useState([])


  useEffect(() => {
    async function fetchAds() {
      const response = await api.get(`/cl/listclient/${userID}`);
      setAds(response.data);
    }
    fetchAds();
  }, []);

  if(!authToken) return <Register />

  async function handleSubmit(e) {
    e.preventDefault();
   
    const data = {
      locality: locality,
      telem: telem,
      birthdate: birthdate,
      userID: userID
      
    };

      await api.post(`/cl/userData`,data);
      window.location.href= '/UserProfile';
  }

  async function handleSubmit1(e) {
    e.preventDefault();
   
    const data = {
      locality: locality,
      telem: telem,
      birthdate: birthdate,
      userID: userID
      
    };

      await api.put(`/cl/${userID}`,data);
      window.location.href= '/UserProfile';
  }

  async function changePassword(e) {
    e.preventDefault();

    const userData = {
      email:emaill ,
      password: password,

    }

    document.cookie = `email=${emaill};`;

    await api.put(`/auth/users/${userID}`, userData);
    window.location.href= '/UserProfile';

  }

  

  async function handleDelete(vehicleID) {
    console.log('Deleting user with ID:', vehicleID);
    try {
      const response = await api.delete(`/vehicle/vehicle/${vehicleID}`);
      if (response.status === 200) {
        console.log('User deleted successfully')
      }
      
  
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  }

  const handleTelemChange = (e) => {
    const value = e.target.value;
    setTelem(value);
  
    const regex = /^\d{9}$/;
  
    if (!regex.test(value)) {
      setTelemError('Telemóvel precisa de ter 9 dígitos');
    } else {
      setTelemError('');
    }
  };
  
  const handleBirthdateChange = (e) => {
    const value = e.target.value;
    setBirthdate(value);
  
    const regex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (!regex.test(value)) {
      setBirthdateError('Formato de data inválido');
    } else {
      setBirthdateError('');
    }
  };
  
  const handleLocalityChange = (e) => {
    const value = e.target.value;
    setLocality(value);
  
    const regex = /^[A-Za-z\s]+$/;
  
    if (!regex.test(value)) {
      setLocalityError('Localização inválida');
    } else {
      setLocalityError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{6,12}$/i;
  
    if (!regex.test(value)) {
      setPasswordError('Password inválida');
    } else {
      setPasswordError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  
    if (!regex.test(value)) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
  };

  return (
    <>

    {/* Adicionar dados do Utilizador */}
      <MDBModal isOpen={modalOpenB} toggle={toggleModalAdd}>
        <MDBModalHeader toggle={toggleModalAdd}>Definições da conta</MDBModalHeader>
        <MDBModalBody >
        <Form >
          <Form.Label>Telemóvel</Form.Label>
          <MDBInput
              type="number"
              required
              value={telem}
              onChange={handleTelemChange}
              error={telemError}
              label={telemError && <label style={{ color: 'red' }}>{telemError}</label>}
            />
           
          <Form.Label>Data de nascimento</Form.Label>
            <MDBInput
              type="date"
              required
              value={birthdate}
              onChange={handleBirthdateChange}
              error={birthdateError}
              label={birthdateError && <label style={{ color: 'red' }}>{birthdateError}</label>}
            />
            <Form.Label>Morada</Form.Label>
            <MDBInput
              type="text"
              required
              value={locality}
              onChange={handleLocalityChange}
              error={localityError}
              label={localityError && <label style={{ color: 'red' }}>{localityError}</label>}
            />
           
            <MDBInput type="hidden" value={userID} />
            
          <MDBModalFooter>
            <Button variant="secondary" onClick={toggleModalAdd}>Cancelar</Button>
            <Button variant="primary" onClick={handleSubmit}  >Adicionar</Button>
            <Button variant="primary" onClick={handleSubmit1}  >Alterar</Button>
          </MDBModalFooter>
        </Form>
        </MDBModalBody>
        
      </MDBModal>
    

    {/* Alterar dados do Utilizador */}

    <div>
      <MDBModal isOpen={modalOpenA} toggle={toggleModalChange}>
        <MDBModalHeader toggle={toggleModalChange}>Definições da conta</MDBModalHeader>
        <MDBModalBody>
      <DialogActions sx={{ flexDirection: 'column', gap: 2, my: 2 }}>
      { (
        <Button onClick={togglePasswordModal}>
          Mudar Password
        </Button>
        )}
        <Button onClick={toggleEmailModal}>
          Mudar Email
        </Button>
        <Button onClick={() => setDeleteConfirmationModalOpen(true)} >
          Apagar  Conta
        </Button>
      </DialogActions>
        </MDBModalBody>
      </MDBModal>
    </div>

    {/* Alterar Password */}

    <form >
      <MDBModal isOpen={passwordModalOpen} toggle={togglePasswordModal}>
        <MDBModalHeader toggle={togglePasswordModal}>Alterar Password</MDBModalHeader>
      <DialogContent dividers>
            <Form.Label>Nova password</Form.Label>
            <MDBInput
              type="password"
              htmlFor="password"
              required
              placeholder='<6,A,a,nº,simb($*&@#)'
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              label={passwordError && <label style={{ color: 'red' }}>{passwordError}</label>}
            />
          
      </DialogContent>
      <DialogActions>
        <Button  color="primary" onClick={changePassword} >Alterar</Button>
      </DialogActions>
      </MDBModal>
    </form>

    {/* Alterar Email */}

    <form >
      <MDBModal isOpen={emailModalOpen} toggle={toggleEmailModal}>
        <MDBModalHeader toggle={toggleEmailModal}>Alterar Email</MDBModalHeader>
      <DialogContent dividers>
        
      <Form.Label>Novo Email</Form.Label>
            <MDBInput
              type="text"
              required
              value={emaill}
              onChange={handleEmailChange}
              error={emailError}
              label={emailError && <label style={{ color: 'red' }}>{emailError}</label>}
            />
          
      </DialogContent>
      <DialogActions>
        <Button  color="primary" onClick={changePassword} >Alterar</Button>
      </DialogActions>
      </MDBModal>
    </form>

    {/* Apagar conta */}

    <form >
      <MDBModal isOpen={deleteConfirmationModalOpen} toggle={() => setDeleteConfirmationModalOpen(false)}>
        <MDBModalHeader toggle={() => setDeleteConfirmationModalOpen(false)}>Tem a certeza que quer apagar a sua conta?</MDBModalHeader>
        <MDBModalBody>
          <p>Todos os seus dados e conversas serão perdidos permanentemente.</p>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => setDeleteConfirmationModalOpen(false)}>Cancelar</MDBBtn>
          <MDBBtn color="danger" onClick={() => handleDeleteAccount(userID, userId)}>Apagar</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </form>

    {/* Perfil do Utilizador */}

    <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ width: '1500px' }}>
          <div style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-3">
              <MDBRow>
                <MDBCol>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid />
                      <p className="text-muted mb-5">{fullname()}</p>
                      <div className="d-flex justify-content-center mb-2">
                        <MDBBtn className='btn btn-primary position-relative' style={{ backgroundColor: '#3b5998' }} href='#'>
                          <MDBIcon fab icon='facebook-f' /> 
                        </MDBBtn>
                        <MDBBtn
                          className='btn btn-primary position-relative mx-3' style={{ backgroundColor: '#ac2bac' }}>
                          <MDBIcon fab icon="instagram" />
                        </MDBBtn>
                        <MDBBtn  className='btn btn-primary position-relative' style={{ backgroundColor: '#55acee' }}>
                          <MDBIcon fab icon="twitter" />                   
                        </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Nome completo:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{fullname()}
                            <div onClick={handleClickA} style={{ float: 'right', cursor: 'pointer' }}><FontAwesomeIcon icon={faPencil} /></div>
                            <div onClick={handleClickB} style={{ float: 'right', cursor: 'pointer', marginRight: '15px' }}><FontAwesomeIcon icon={faPlus} /></div>
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Email:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{email()}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Telemóvel:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{telem}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Data de Nascimento:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{birthdate}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Morada:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{locality}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                  <p id="successMessage" style={{ display: 'none' }}>Your account was successfully deleted.</p>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <MDBContainer>
            <form>
              <h3>Os seus anúncios</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Matricula</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Ano/Mês fabrico</th>
            </tr>
          </thead>
          <tbody>
            {Ads.map(Ad => (
              <tr key={Ad.ID}>
                <td>{Ad.license}</td>
                <td>{Ad.brand}</td>
                <td>{Ad.model}</td>
                <td>{Ad.year}</td>
                <td>
                  <MDBBtn color="danger" onClick={() => handleDelete(Ad.ID)}  >Eliminar</MDBBtn>{' '}
                  <Link to={`/editV/${Ad.vehicleID}`}><MDBBtn variant="primary" >Editar</MDBBtn></Link>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </form>
            </MDBContainer>

          </div>
        </div>
      </div></>
  );
}

export default UserProfile;