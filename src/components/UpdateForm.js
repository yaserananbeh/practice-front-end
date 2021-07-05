import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
export class UpdateForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.updateApi}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>name</Form.Label>
          <Form.Control type="text" placeholder={this.props.item.name} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="img">
          <Form.Label>Image</Form.Label>
          <Form.Control type="text" placeholder={this.props.item.img}  required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="level">
          <Form.Label>Level</Form.Label>
          <Form.Control type="text" placeholder={this.props.item.level} required/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    )
  }
}

export default UpdateForm
