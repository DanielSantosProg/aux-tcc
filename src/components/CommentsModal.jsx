// components/CommentsModal.jsx
import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'flowbite-react';
import Comment from './Comment';
import CommentBox from './CommentBox';

const CommentsModal = ({ comments, title, isOpen, onClose }) => {
  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <ModalHeader>{title} - Comentários</ModalHeader>
      <ModalBody>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {comments.length === 0 ? (
            <p>Nenhum comentário disponível.</p>
          ) : (
            comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))
          )}
        </div>
        <div className="mt-4">
          <CommentBox />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CommentsModal;
