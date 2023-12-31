import  SideBar from "./SideBar";
import React,{useState , useEffect}from 'react';
import api from '../services/api';
// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import { useParams, Link} from 'react-router-dom';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import 'bootstrap-icons/font/bootstrap-icons.css';




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
const Invoice = () => {

  const { ID } = useParams();
  const userID = cookies.get('userID');
  const fullname = cookies.get('fullname');
  const [email, setEmail] = useState('');
  const [NIF, setNif] = useState('');
  const [invoice_date, setInvoice_date] = useState('')
  const [Postal_code, setPostal_code] = useState('')
  const [amount, setAmount] = useState('')
  const [total,setTotal] = useState('')
  const [creditCardDate, setCreditCardDate] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [locality, setLocality] = useState('');
  const [telem , setTelem] = useState('');

  useEffect(() => {
    api.get(`/in/Invoice/${ID}`)
      .then(response => {
        const invoiceData = response.data;
        setEmail(invoiceData.email);
        setNif(invoiceData.NIF);
        setInvoice_date(invoiceData.invoice_date)
        setPostal_code(invoiceData.Postal_code)
        setAmount(invoiceData.amount)
        setTotal(invoiceData.total)
      })
      .catch(error => {
        console.log(error);
      });
  }, [ID]);

  useEffect(() => {
    api.get(`/pay/Pay/${ID}`)
      .then(response => {
        const CardData = response.data;
        setCreditCardDate(CardData.CredCard_date)
        setCreditCard(CardData.CredCard)
        console.log(CardData)
      })
      .catch(error => {
        console.log(error);
      });
  }, [ID]);

  useEffect(() => {
    api.get(`/cl/client/${userID}`)
      .then(response => {
        const CliData = response.data;
        setTelem(CliData.telem)
        setLocality(CliData.locality)
        console.log(CliData)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const usePrint= async () => {
    
    const doctitle=[
      {
        text: 'Auto-Classificados NIF: 555 000 333',
        fontsize: 15,
        bold: true,
        alignment:'center',
        margin: [10, 20, 0, 20]
  } ];
    const docbody=[
      {
        text:' Morada: Para lá do Sol posto ', style: 'subheader'},
        {text:' Código Postal: 8888 Nenhures ' , style: 'subheader'},
        {text:' ' },
        {style: 'tableExample', alignment:'center',
        table: {
                    body: [
                      ['Fatura', ID ],
                      ['Data', invoice_date],
                      ['Preço s/iva', amount ],
                      ['Total', total],
                      [{ text: '', style: 'tableHeader', colSpan: 2, }],
                      [{ text: 'Dados do cartão', style: 'tableHeader', colSpan: 2, alignment: 'center' }],
                      ['Cartão de crédito', creditCard ],
                      ['Validade do cartão', creditCardDate],
                      [{ text: '', style: 'tableHeader', colSpan: 2, }],
                      [{ text: 'Dados do cliente', style: 'tableHeader', colSpan: 2, alignment: 'center' }],
                      ['Nome', fullname ],
                      ['Endereço', locality],
                      ['Código Postal', Postal_code ],
                      ['Numero Fiscal', NIF],
                      ['Telemóvel', telem ],
                      ['Email', email]
                    ]
                  },
                },
   ];
    const docbottom =[]
    const documento ={
      pageSize:'A5',
      pageMargins: [45,50,5,20],

      header: [doctitle],
      content:[docbody],
      footer:[docbottom]
    }

    pdfMake.createPdf(documento).download('Fatura_Auto_Classify.pdf');
  }

  return (
    <div style={{display: 'flex'}}>
    < SideBar/>
    <div style={{margin:'100px auto',width:'70%'}}>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Fatura</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                <Row>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Nome</label>
                        <Form.Control
                        value={fullname}
                        disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Endereço</label>
                        <Form.Control
                       type="text" 
                       value={locality}
                       disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>telemóvel</label>
                        <Form.Control
                        type="number"
                      value={telem}
                      disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr/>
                  <Row>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                         value={email}
                         disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Código Postal</label>
                        <Form.Control
                        value={Postal_code}
                        disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Data da compra</label>
                        <Form.Control
                         value={invoice_date}
                         disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>NIF</label>
                        <Form.Control
                          value={NIF}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Preço</label>
                        <Form.Control
                          value={amount}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Preço (IVA)</label>
                        <Form.Control
                          value={total}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <hr/>
                  <Row>
                  <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Validade cartão crédito</label>
                        <Form.Control
                        value={creditCardDate}
                        disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Número cartão crédito</label>
                        <Form.Control
                         value={creditCard}
                         disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br />
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <br/>
     
      <br/>
      <Button onClick={usePrint}><i class="bi bi-file-earmark-pdf" ></i> Gerar PDF</Button>
    </div>

    </div>
    

  );
};

export default Invoice;