import { CButton, CContainer, CFormInput, CModal, CModalBody, CModalFooter } from "@coreui/react";
import { useState } from "react";

const Delete = () => {

    const [id, setId] = useState<number | undefined>(undefined);
    const [visible, setVisible] = useState<boolean>(false);
    const [createMSG, setCreateMSG] = useState<string | undefined>(undefined);

    const handleDelete = async () => {
        const del = await fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        });

        if(!del.ok) {
            setVisible(true);
            setCreateMSG("No product deleted");
            throw new Error("Error: " + del.status);
        }

        const response = await del.json();

        if(!response) {
            throw new Error("No product deleted");
        }
        else {
            setVisible(true);
            if(response.isDeleted) {
                setCreateMSG(JSON.stringify(response))
            }
            else {
                setCreateMSG("Error: no product deleted");
            }
        }
    }

    const handleInputId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(+e.target.value);
    }

    return (
        <CContainer fluid className="d-flex">
            {
                visible && <CModal visible={visible} alignment="center" onClose={() => setVisible(false)}>
                    <CModalBody>
                        {createMSG}
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                            Close
                        </CButton>
                    </CModalFooter>
                </CModal>
            }
            <CFormInput type="number" placeholder="Enter Id" value={id ?? ""} onChange={handleInputId} />        
            <CButton type="button" onClick={handleDelete}>Delete</CButton>
        </CContainer>
    );
}

export default Delete;