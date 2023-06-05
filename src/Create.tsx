import { CButton, CContainer, CFormInput, CModal, CModalBody, CModalFooter } from "@coreui/react";
import { useState } from "react";

interface Product {
    title?: string;
    category?: string;
    color?: string;
    price?: string;
}

const Create = () => {

    const [createMSG, setCreateMSG] = useState<string>("");
    const [product, setProduct] = useState<Product | null>(null);
    const [visible, setVisible] = useState<boolean>(false);

    const createProduct = async () => {
        const create = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });

        if (!create.ok) {
            setVisible(true);
            setCreateMSG(`Error: ${create.status}`);
            throw new Error("Error: " + create.status);
        }

        const response = await create.json();

        if (!response) {
            setVisible(true);
            setCreateMSG("No product added");
            throw new Error("No product added");
        }
        else {
            console.log(response)
            setVisible(true);
            setCreateMSG(JSON.stringify(response));
            setProduct(null);
            return response;
        }
    }

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProduct({ ...product, title: value });
    }

    const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProduct({ ...product, category: value });
    }

    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProduct({ ...product, price: value });
    }

    const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProduct({ ...product, color: value });
    }

    return (
        <CContainer className="d-grid gap-2">
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
            <CFormInput type="text" value={product?.title ?? ""} placeholder="added name product" onChange={handleChangeTitle} />
            <CFormInput type="text" value={product?.category ?? ""} placeholder="added category" onChange={handleChangeCategory} />
            <CFormInput type="text" value={product?.price ?? ""} placeholder="added price" onChange={handleChangePrice} />
            <CFormInput type="text" value={product?.color ?? ""} placeholder="added color" onChange={handleChangeColor} />
            <CButton type="button" onClick={createProduct}>Create Product</CButton>
        </CContainer>
    );
}

export default Create;