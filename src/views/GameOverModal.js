import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const GameOverModal = (props) => {
    const { toggle, playAgain } = props;

    return (
        <Modal isOpen={true} toggle={toggle} size="md">

            <ModalHeader toggle={toggle}>
                <FormattedMessage id="Defeat" />&nbsp;!
                </ModalHeader>

            <ModalBody>

                <h5 className="text-center">
                    <FormattedMessage id="Game.Over" />&nbsp;!
                </h5>


            </ModalBody>

            <ModalFooter>

                <Button color="secondary"
                    onClick={playAgain}>
                    <FormattedMessage id="Play.Again" />
                </Button>

            </ModalFooter>

        </Modal>
    );
}

export default GameOverModal;
