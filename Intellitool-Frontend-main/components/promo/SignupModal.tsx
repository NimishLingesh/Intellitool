import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Import modal components from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

interface ModalProps {
  show: boolean;
  handleClose: () => void;
}

const SignupModal: React.FC<ModalProps> = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [role, setRole] = useState('student');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSignUp = () => {
    // Check if passwords match
    if (password === retypePassword) {
      // Perform sign-up action here
      console.log('Username:', username);
      console.log('Password:', password);
      console.log('Role:', role);
      // Close modal
      handleClose();
    } else {
      setPasswordMatch(false);
    }
  };
  const isSubmitDisabled = password !== retypePassword || password === '' || username === '';

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="retypePassword">
              <Form.Label>Retype Password</Form.Label>
              <Form.Control type="password" placeholder="Retype password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} />
              {!passwordMatch && <p className="text-danger">Passwords do not match</p>}
          </Form.Group>
          <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control as="select" value={'student'} onChange={(e) => setRole(e.target.value)}>
                <option value="student">Student</option>
              </Form.Control>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" disabled={isSubmitDisabled} onClick={handleSignUp}>
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignupModal;
