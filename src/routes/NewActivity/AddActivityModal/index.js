import React from 'react';
// import PropTypes from 'prop-types';

import { Modal, Button } from 'antd';

import styles from './styles.css';

function AddActivityModal(props) {
  const {
    visible,
    serviceReportNumber,
    closeModal,
  } = props;

  return (
    <Modal
      title="Service Report Number"
      wrapClassName="vertical-center-modal"
      onCancel={() => closeModal()}
      visible={visible}
      footer={
        <Button
          type="primary"
          onClick={() => closeModal()}
        >
          OK
        </Button>
      }
    >
      {serviceReportNumber}
    </Modal>
  );
}

AddActivityModal.propTypes = {};

export default AddActivityModal;
