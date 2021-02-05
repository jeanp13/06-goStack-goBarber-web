import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container, Toast } from './style';

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast hasDescription>
        <FiAlertCircle size={20} />

        <div>
          <strong>Info</strong>
          <p>Não foi possível fazer login na aplicação</p>

          <button type="button">
            <FiXCircle size={18} />
          </button>
        </div>
      </Toast>

      <Toast hasDescription={false} type="sucess">
        <FiAlertCircle size={20} />

        <div>
          <strong>Sucesso</strong>

          <button type="button">
            <FiXCircle size={18} />
          </button>
        </div>
      </Toast>

      <Toast hasDescription type="error">
        <FiAlertCircle size={20} />

        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login na aplicação</p>

          <button type="button">
            <FiXCircle size={18} />
          </button>
        </div>
      </Toast>
    </Container>
  );
};

export default ToastContainer;
