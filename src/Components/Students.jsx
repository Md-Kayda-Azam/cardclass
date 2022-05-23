import axios from 'axios';
import React, { Component } from 'react'
import { Alert, Button, Card, CloseButton, Col, Container, Row, Table, } from 'react-bootstrap';
import StudentModal from './StudentModal';

export class Students extends Component {

     constructor(props){
         super(props)
        
         this.state = {
             modal : {
                 status : false,
                 type : ''
             },
             alert : {
                 status : false,
                 msg : '',
                 type : ''
             },
             students : []
         }

     }




  render() {
    
    const { modal, students } = this.state;
    const { type, msg, status } = this.state.alert;
    
               /// Get all Student data
               const getAllStudentData = () => {
                
                    try {
                        
                        axios.get('http://localhost:5050/students').then(res => {

                            this.setState( (preState) => ({

                                ...preState,
                                students : res.data

                            }))

                        })

                    }catch( error ){

                        console.log(error);

                    }
                   

               }
               getAllStudentData();
               
                const handleModalshow = () => {

                    this.setState({
                        ...this.state,

                        modal : {
                            status : true,
                            type : 'create'
                        }
                    })
                }
                const handleModalHide = () => {

                    this.setState({
                        ...this.state,

                        modal : {
                            status : false,
                            type : ''
                        }
                    })
                }
                //// Show Alert handler
                const handleAlertShow = () => {

                    this.setState({
                        ...this.state,
                        alert : {
                            status : true,
                            msg : 'We are now ready',
                            type : 'danger'
                        }
                    })
                }
                ///// Alert Hide Handler
                const handleAlertHide = () => {

                    this.setState({
                        ...this.state,
                        alert : {
                            status : false,
                            msg : '',
                            type : ''
                        }
                    })
                }


                //// show single student data
                const handleStudentSingleModal = () => {
                  
                    this.setState({
                        ...this.state,

                        modal : {
                            status : true,
                            type : 'show'
                        }
                    })

                }
                
                /// Handle modal alert show
                const handleModalAlert = () => {

                    this.setState({
                        ...this.state,

                        modal : {
                            status : true,
                            type : 'alert'
                        }
                    })


                }

    return (
      <Container>
          <Row className='justify-content-center my-5'>
              <Col md={6}>
                 <Card>
                     <Card.Body>
                         <Button onClick={ handleModalshow } variant="primary" >Add new Student</Button>
                         <StudentModal show={ modal.status } handleModalHide={handleModalHide} type={ modal.type }/>
                         <br />
                         <br />
                         {
                           status &&   <Alert className='d-flex justify-content-between' variant={ type } > { msg } <CloseButton onClick={ handleAlertHide }></CloseButton> </Alert>
                         }
                       
                         <Table>
                             <thead>
                                 <tr>
                                     <th>#</th>
                                     <th>Name</th>
                                     <th>Cell</th>
                                     <th>Photo</th>
                                     <th>Action</th>
                                 </tr>
                             </thead>
                             <tbody>

                   {
                        students.map( (data, index) => 
                            <tr>
                                <td>{ index + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.cell}</td>
                                    <td><img style={{ height: '50px', weight: '50px'}} src={data.photo} alt="" /></td>
                                    <td>
                                    <a onClick={ handleStudentSingleModal } className='btn btn-sm btn-info' href="#">View</a> &nbsp;
                                    <a  className='btn btn-sm btn-warning' href="#">Edit</a> &nbsp;
                                    <a onClick={ handleModalAlert } className='btn btn-sm btn-danger' href="#">Delete</a>
                                </td>
                            </tr>
                        )
                    }

                                 
                             </tbody>
                         </Table>
                     </Card.Body>
                 </Card>
              </Col>
          </Row>
      </Container>
    )
  }
}

export default Students;