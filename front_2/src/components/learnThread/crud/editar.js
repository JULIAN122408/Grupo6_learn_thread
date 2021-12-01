import React from 'react';
import {Container, Row, Form, Button} from 'react-bootstrap'
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';
import ConfirmationPrompts from '../../prompts/confirmation';


export default class LearnThreadEditar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            idEmpleado : this.props.getIdEmpleado(),
            rediret: false,
            confirmation:{
                title:'Modificar empleado',
                text:'Desea Modificar empleado?',
                show:false,
            },
            message :{
                text: '',
                show: false,
            },
            loading: false,
            empleados:{
                nombre: '',
                apellido_p: '',
                apellido_m: '',
                telefono: '',
                mail: '',
                direccion:'',
            }
        };

        
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.onCancel= this.onCancel.bind(this);
    this.onConfirm=this.onConfirm.bind(this);

    }

    componentDidMount(){
        this.getEmpleado();
    }

    getEmpleado(){
        this.setState({loading: true});
        request
        .get(`/empleados/${this.state.idEmpleado}`)
        .then((response)=>{
        this.setState({
            empleados:response.data,
            loading: false,
        });
    })
    .catch((err)=>{
        console.error(err);
        this.setState({loading: false});
    });
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
        .put(`/empleados/${this.state.idEmpleado}`, this.state.empleados)
        .then((response)=>{
            if(response.data.exito){
                /*this.props.changeTab('Buscar');*/
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

    onCancel(){
        this.setState({
            confirmation:{
                ...this.state.confirmation,
                show:false,
            }
        })
    }

    onConfirm(){
        this.setState(
            {
                confirmation: {
                    ...this.state.confirmation,
                    show: false,
                }
            },

            this.guardarEmpleados()
        );
    }

    render() { 
        return ( 
            <Container id ="empleados-crear-container">
                
                <ConfirmationPrompts
                show={this.state.confirmation.show}
                title={this.state.confirmation.title}
                text={this.state.confirmation.text}
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}
                />

                <MessagePrompt 
                text={this.state.message.text}
                show={this.state.message.show}
                duration={2500}
                onExited={this.onExitedMessage}
                />

                <Loading show={this.state.loading}/>

                <Row>
                    <h2> Editar Empleados </h2>
                </Row>
                <Row>

                <Form id="empleado-label">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                        value={this.state.empleados.nombre}     
                        onChange={(e)=> this.SetValue('nombre', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Primer Apellido</Form.Label>
                        <Form.Control 
                        value={this.state.empleados.apellido_p}    
                        onChange={(e)=> this.SetValue('apellido_p', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Segundo Apellido</Form.Label>
                        <Form.Control
                        value={this.state.empleados.apellido_m}     
                        onChange={(e)=> this.SetValue('apellido_m', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Telefono</Form.Label>
                        <Form.Control
                        value={this.state.empleados.telefono}     
                        onChange={(e)=> this.SetValue('telefono', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo Electronico</Form.Label>
                        <Form.Control 
                        value={this.state.empleados.mail}    
                        onChange={(e)=> this.SetValue('mail', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Direccion</Form.Label>
                        <Form.Control
                        value={this.state.empleados.direccion}     
                        onChange={(e)=> this.SetValue('direccion', e.target.value)}
                        />
                    </Form.Group>


                    
                    <Button variant="primary" 
                    onClick={() => 
                        this.setState({
                            confirmation: {...this.state.confirmation, show: true},
                        })
                    }
                    >
                        Guardar Editar Empleado
                    </Button>
                    </Form>

                </Row>

            </Container>
        );
    }
}

