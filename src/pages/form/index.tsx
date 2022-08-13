import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { mask } from './cpfCnpjMask';
import { getAddressByCEP } from '../../services/viaCepApi';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { newCustomer } from '../../services/customerApi';
import { AddressType, CustomerType } from '../../utils/types';

export default function ClientForm() {
  const [name, setName] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [typeMask, setMask] = useState('');

  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const [phone, setPhone] = useState('');

  async function handleCEP(value: string) {
    const REGEX = /\D/g;
    const valueFiltered = value.replace(REGEX, '');

    const data = await getAddressByCEP(valueFiltered);

    setDistrict(data.bairro);
    setStreet(data.logradouro);
    setCity(data.localidade);
    setUf(data.uf);
  }

  function handleMask(value: string) {
    setCpfCnpj(value);

    setMask(mask(value));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (cpfCnpj.length === 14) {
      const isValidDocument = cpf.isValid(cpfCnpj);
      !isValidDocument && alert('CPF inválido');
    } else if (cpfCnpj.length === 18) {
      const isValidDocument = cnpj.isValid(cpfCnpj);
      !isValidDocument && alert('CNPJ inválido');
    }

    const customer: CustomerType = {
      name,
      document: cpfCnpj,
      email,
      amount: parseFloat(amount) * 100,
      phone,
    };

    const address: AddressType = {
      cep,
      street,
      district,
      number,
      uf,
      city,
    };

    try {
      await newCustomer({ customer, address });
      whatsappMessage();
    } catch (error) {
      console.log('deu ruim');
    }
  }

  function whatsappMessage() {
    const message = `
    *DADOS - RECIBO*

*NOME:* ${name}
*CPF / CNPJ:* ${cpfCnpj}

*END:* ${street}, ${
      number ? 'Nº ' + number + ',' : ''
    } ${district}, ${city} - ${uf}, CEP: ${cep.slice(0, 5)}-${cep.slice(5, 8)}

*EMAIL:* ${email}

*VALOR:* R$ ${Number(amount).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
    })}

*TEL:* (${phone[0] + phone[1]}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;

    const messageEncoded = encodeURIComponent(message);
    const phoneNumber = process.env.REACT_APP_PHONE;

    const whatsapp = `https://wa.me/${phoneNumber}?text=${messageEncoded}`;

    window.open(whatsapp);
  }

  return (
    <>
      <Card
        className='animate__fadeIn animate__animated animate__slow'
        style={{
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <Card.Body
          style={{
            padding: '15px',
          }}
        >
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Row>
              <Col xs md>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Digite aqui seu nome'
                />
              </Col>
              <Col xs md>
                <Form.Label>CPF ou CNPJ</Form.Label>
                <Form.Control
                  type='text'
                  maxLength={18}
                  value={typeMask}
                  onChange={(e) => handleMask(e.target.value)}
                  placeholder='000.000.000-00'
                />
              </Col>
            </Row>

            <Row>
              <Col xs md>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='email@email.com'
                />
              </Col>
              <Col xs md>
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  type='number'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder='450.000,00'
                />
              </Col>
            </Row>

            <Row>
              <Col xs md>
                <Form.Label>Cep</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => setCep(e.target.value)}
                  defaultValue={cep}
                  placeholder='00.000-000'
                />
              </Col>
              <Col xs md>
                <Button
                  onClick={() => handleCEP(cep)}
                  className='btn-complete'
                  type='button'
                >
                  COMPLETAR
                </Button>
              </Col>
            </Row>

            <Form.Label>Logradouro</Form.Label>
            <Form.Control
              type='text'
              value={street}
              defaultValue={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder='Endereço...'
            />

            <Row>
              <Col xs md>
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  type='text'
                  value={district}
                  defaultValue={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder='Bairro...'
                />
              </Col>
              <Col xs md>
                <Row>
                  <Col>
                    <Form.Label>Número</Form.Label>
                    <Form.Control
                      type='text'
                      value={number}
                      defaultValue={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder='Número'
                    />
                  </Col>
                  <Col xs md>
                    <Form.Label>UF</Form.Label>
                    <Form.Control
                      type='text'
                      value={uf}
                      defaultValue={uf}
                      onChange={(e) => setUf(e.target.value)}
                      placeholder='UF'
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col xs md>
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type='text'
                  value={city}
                  defaultValue={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder='Cidade...'
                />
              </Col>
              <Col xs md>
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type='text'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder='(99)99999-9999'
                />
              </Col>
            </Row>

            <br />

            <Button
              style={{ width: '100%', marginTop: '15px' }}
              type='submit'
              variant='success'
            >
              Enviar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
