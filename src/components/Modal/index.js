/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Modal } from 'react-bootstrap';
import { FiAlertCircle } from 'react-icons/fi';

export default function VerticalModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body style={{ display: 'flex', justifyContent: 'center' }}>
        <FiAlertCircle size={180} color="#CF4647" />
      </Modal.Body>
      <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
        <h4>{props.message}</h4>
      </Modal.Footer>
    </Modal>
  );
}
