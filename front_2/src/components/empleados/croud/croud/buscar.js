import React from 'react';
import {Container, Row, Button} from 'react-bootstrap';
//import './empleados.css';
import DataGrid from '../../../grid/grid';
import Menu from '../../../navbar/navbar';
import ConfirmationPrompts from '../../../prompts/confirmation';

const columns = [{
    dataField: '_id',
    text: 'ID',
    hidden: true,
}, {
    dataField: 'nombre',
    text: 'Nombre'
}, {
    dataField: 'apellido_p',
    text: 'Primer apellido'
}, {
    dataField: 'apellido_m',
    text: 'Segundo apellido'
}, {
    dataField: 'telefono',
    text: 'Telefono'
}, {
    dataField: 'mail',
    text: 'Corre Electronico'
}, {
    dataField: 'direccion',
    text: 'Direccion'
},

];

export default class EmpleadosBuscar  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
        confirmation:{
            title: 'Eliminar el Empleado',
            text: 'Deseas eliminar el empleado',
            show: false,
        },

        };


        this.onClickEditButton= this.onClickEditButton.bind(this);
        this.onClickDeLeteButton= this.onClickDeLeteButton.bind(this);
        this.onCancel= this.onCancel.bind(this);
        this.onConfirm= this.onConfirm.bind(this);
    }

    componentDidMount(){
    }

    onClickEditButton(row){
        this.props.setIdEmpleado(row._id);
        this.props.changeTab('Editar');
    }

    onClickDeLeteButton(){
        this.setState({
            confirmation:{
                ...this.state.confirmation,
                show: true,
            },
        });
    }

    onCancel(){
        
        this.setState({
            confirmation:{
                ...this.state.confirmation,
                show: false,
            },
        });
    }

    onConfirm(){
        this.setState(
            {
                confirmation:{
                    ...this.state.confirmation,
                    show:false,
                },
            },
            this.eliminarEmpleados()
        );
    }

    eliminarEmpleados(){

    }

    render() {         
        return(


            <Container id= "empleados-buscar-container">
            
            <ConfirmationPrompts
                show={this.state.confirmation.show}
                title={this.state.confirmation.title}
                text={this.state.confirmation.text}
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}
                />
            
            
            <Menu/>

                

                <Row>
                    <h2>BUSCAR EMPLEADOS</h2>
                </Row>
                <Row>
                    <DataGrid url="/empleados" columns={columns}
                    showEditButton = {true}
                    showDeLeteButton= {true}
                    onClickEditButton={this.onClickEditButton} 
                    onClickDeLeteButton={this.onClickDeLeteButton}
                    />
                </Row>

            </Container>
        );

    }
}

