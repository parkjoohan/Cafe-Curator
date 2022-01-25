import { buildQueries } from '@testing-library/react';
import React from 'react';
import  { Modal, Button } from 'react-bootstrap';
import EmailForm from './EmailForm';

const EmailModal = ( { show, onHide }) => {
  return (
    <Modal
      show = {show}
      onHide = {onHide}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-w"
      centered
    >
      
       
      
      <Modal.Body id = "ModalPadding">
        <EmailForm />
      </Modal.Body>
      <Modal.Footer>
        <Button id="NoBgExit" variant="secondary" onClick={onHide}>닫기</Button>
        <Button id="NoBgButton" onClick={onHide}>인증하기</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EmailModal
