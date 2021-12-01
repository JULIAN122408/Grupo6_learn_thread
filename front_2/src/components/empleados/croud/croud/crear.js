import React from 'react';
import {Container, Row, Form, Button} from 'react-bootstrap'
import { request } from '../../../helper/helper';
import Loading from '../../../loading/loading';
import MessagePrompt from '../../../prompts/message';
import Menu from '../../../navbar/navbar';


export default class EmpleadosCrear extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            rediret: false,
            message: {
                text: '',
                show: false,
            },

            loading: false,
            empleados:{
                nombre: "",
                apellido_p: "",
                apellido_m: "",
                telefono: "",
                mail: "",
                direccion:"",
            }
        };

    this.onExitedMessage = this.onExitedMessage.bind(this);
    }

    SetValue(index, value) {
        this.setState({
            empleados: {
                ...this.state.empleados,
                [index] : value,
            },
        });
    }

    guardarEmpleados(){
        this.setState({loading:true});

        request
        .post('/empleados', this.state.empleados)
        .then((response)=>{
            if(response.data.exito){
                this.setState({
                rediret: response.data.exito,
                message: {
                    text: response.data.msg,
                    show:true,
                },
            });                
            }
            this.setState({loading:false});
        })
        .catch((err)=>{
            console.error(err);
            this.setState({loading: true});
        });
    }

    onExitedMessage(){
        if(this.state.rediret) this.props.changeTab('Buscar');
    }

    render() { 
        return ( 
            <Container id ="empleados-crear-container">
                <Menu/>

                <MessagePrompt 
                text={this.state.message.text}
                show={this.state.message.show}
                duration={2500}
                onExited={this.onExitedMessage}
                />

                <Loading show={this.state.loading}/>

                <Row>
                    <h2> Crear Empleados </h2>
                </Row>
                <Row>

                <Form id="empleado-label">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control     
                        onChange={(e)=> this.SetValue('nombre', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Primer Apellido</Form.Label>
                        <Form.Control     
                        onChange={(e)=> this.SetValue('apellido_p', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Segundo Apellido</Form.Label>
                        <Form.Control     
                        onChange={(e)=> this.SetValue('apellido_m', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Telefono</Form.Label>
                        <Form.Control     
                        onChange={(e)=> this.SetValue('telefono', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo Electronico</Form.Label>
                        <Form.Control     
                        onChange={(e)=> this.SetValue('mail', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Direccion</Form.Label>
                        <Form.Control     
                        onChange={(e)=> this.SetValue('direccion', e.target.value)}
                        />
                    </Form.Group>


                    
                    <Button variant="primary" 
                    onClick={() => console.log(this.guardarEmpleados())}
                    >
                        Guardar Empleado
                    </Button>
                    </Form>

                </Row>

            </Container>
        );
    }
}

