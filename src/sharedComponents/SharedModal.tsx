import { CButton, CModal, CModalBody, CModalFooter } from "@coreui/react";


interface propsModal {
    msg: string | undefined;
    visible: boolean;
    setVisible: () => void;
}

const SharedModal = ({ msg, visible = false, setVisible } : propsModal ) => {

    return (
        <CModal visible={visible} alignment="center" onClose={setVisible}>
            <CModalBody>
                {msg}
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={setVisible}>
                    Close
                </CButton>
            </CModalFooter>
        </CModal>
    );
}

export default SharedModal;