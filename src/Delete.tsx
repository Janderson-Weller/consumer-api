import { CButton, CContainer, CFormInput } from "@coreui/react";
import { useState } from "react";
import SharedModal from "./sharedComponents/SharedModal";

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
            console.log(response)
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

    const handleSetVisible = () => {
        setVisible(!visible);
    }

    return (
        <CContainer fluid className="d-flex">
            {
                visible && <SharedModal msg={createMSG} visible={visible} setVisible={handleSetVisible} />                
            }
            <CFormInput type="number" placeholder="Enter Id" value={id ?? ""} onChange={handleInputId} />        
            <CButton type="button" onClick={handleDelete}>Delete</CButton>
        </CContainer>
    );
}

export default Delete;