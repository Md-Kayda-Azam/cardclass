import axios from 'axios';
import React, { Component } from 'react';
import { Form, Modal, ModalBody, Button } from 'react-bootstrap';

export class StudentModal extends Component {


    constructor(props){
      super(props)

       this.state = {
          inputs : {
            name : '',
            cell : '',
            photo : ''
          }
       }

    }


  render() {

          const { show, handleModalHide, type } = this.props;
          const { name, cell, photo} = this.state.inputs;
          console.log(this.state.inputs);
          /// Form Submit
          const HandleStudentFormSubmit = (e) => {
            e.preventDefault();

                axios.post('http://localhost:5050/students', this.state.inputs).then(res => {

                      this.setState((prevState) => ({
                        
                        ...prevState,
                          inputs : {
                            name : '',
                            cell : '',
                            photo : ''
                          }
                        
                      }));
                      handleModalHide();
                });

          };

     if( type === 'create'){

        return (
      
          <Modal show={ show } onHide={ handleModalHide } centered>
              <ModalBody>
                  <h2>Add new Student</h2>
                  <hr />
                  <Form onSubmit={ HandleStudentFormSubmit }>
                    <Form.Group className='my-3'>
                      <Form.Label>Student Name</Form.Label>
                      <Form.Control value={ name } type='text' onChange={ e => this.setState((prevState) => ({
                        ...prevState,
                        inputs : {
                          ...prevState.inputs,
                          name : e.target.value
                        }
                      }))}/>
                    </Form.Group>
                    <Form.Group className='my-3'>
                      <Form.Label>Cell</Form.Label>
                      <Form.Control value={cell} type='text' onChange={ e => this.setState((prevState) => ({
                        ...prevState,
                        inputs : {
                          ...prevState.inputs,
                          cell : e.target.value
                        }
                      }))}/>
                    </Form.Group>
                    <Form.Group className='my-3'>
                      <Form.Label>Student Photo</Form.Label>
                      <Form.Control value={ photo } type='text' onChange={ e => this.setState((prevState) => ({
                        ...prevState,
                        inputs : {
                          ...prevState.inputs,
                          photo : e.target.value
                        }
                      }))}/>
                    </Form.Group>
                    <Form.Group className='my-3'>
                    <Button type='submit' variant='primary'>Add new</Button>
                    </Form.Group>
                  </Form>
              </ModalBody>
          </Modal>
    
        )

     }else if( type === 'show'){

        return (
      
          <Modal show={ show } onHide={ handleModalHide } centered>
              <ModalBody>
                  <h2>Add new Student</h2>
                  <hr />
                  <img src="https://acmeskid.com/wp-content/uploads/2015/01/team-member-04.jpg" alt="" />
              </ModalBody>
          </Modal>
    
        )

     }else if( type === 'alert'){
      return (
      
        <Modal show={ show } onHide={ handleModalHide } centered>
            <ModalBody>
                <h2>Are you sure?</h2>
                <hr />
               <p>Delete you student data now</p>
               <div className="alert-btns">
                 <Button variant='success'>Cancel</Button> &nbsp;
                 <Button variant='danger'>Delete</Button>
               </div>
            </ModalBody>
        </Modal>
  
      )
     }
  }
}

export default StudentModal;