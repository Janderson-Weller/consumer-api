import { CContainer, CFormInput, CFormSelect, CButton, CModal, CModalBody, CModalFooter } from "@coreui/react";
import { useState } from "react";


const UpdatePut = () => {

    const [id, setId] = useState<number | undefined>(undefined);
    const [optionSelect, setOptionSelect] = useState<string | undefined>(undefined);
    const [inputValue, setInputValue] = useState<string | undefined>(undefined);
    const [visible, setVisible] = useState<boolean>(false);
    const [createMSG, setCreateMSG] = useState<string>("");

    const props = [
        "Select Propertie Update",
        "title",
        "description",
        "category",
        "brand",
        "Price",
        "Discount"
    ];

    const handleUpdate = async () => {
        if ((optionSelect !== undefined && optionSelect !== "Select Propertie Update") && inputValue !== undefined) {
            const obj = {
                [optionSelect]: inputValue
            }

            const update = await fetch(`https://dummyjson.com/products/${id}`, {
                method: /* 'PUT', */ 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            })

            if (!update.ok) {
                setVisible(true);
                setCreateMSG(`Error: ${update.status}`);
                throw new Error("Error: " + update.status);
            }

            const response = await update.json();

            if (!response) {
                setVisible(true);
                setCreateMSG("No product added");
                throw new Error("No product added");
            }
            else {
                console.log(response)
                setVisible(true);
                setCreateMSG(JSON.stringify(response));
                return response;
            }
        }
        else {
            alert("Select Propertie Update")
        }
    }

    const handleInputId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(+e.target.value);
    }

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOptionSelect(e.target.value);
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
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
            <CFormSelect options={props} value={optionSelect ?? ""} onChange={handleChangeSelect} />
            <CFormInput placeholder="Enter Value" value={inputValue ?? ""} onChange={handleChangeInput} required />
            <CButton type="button" onClick={handleUpdate}>Update</CButton>
        </CContainer>
    );
}

export default UpdatePut;