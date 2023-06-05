import { useState } from "react";
import { CButton, CFormInput, CFormCheck, CFormSelect, CContainer, CFormLabel, CRow, CTable, CTableHead, CTableHeaderCell, CTableRow, CTableBody, CTableDataCell } from "@coreui/react";
import SharedModal from "./sharedComponents/sharedModal";

const Read = () => {

    const [id, setId] = useState<number | undefined>(undefined);
    const [data, setData] = useState<any[] | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [checkId, setCheckId] = useState<boolean>(false);
    const [createMSG, setCreateMSG] = useState<string |undefined>(undefined);
    const [optionSelect, setOptionSelect] = useState<string | undefined>(undefined);
    const [checkCategory, setCheckCategory] = useState<boolean>(false);
    const [searchProduct, setSearchProduct] = useState<string | undefined>(undefined);
    const [checkAllProducts, setCheckAllProducts] = useState<boolean>(false);
    const [checkSearchProduct, setCheckSearchProduct] = useState<boolean>(false);

    const category = [
        "Select Category",
        "smartphones",
        "laptops",
        "fragrances",
        "skincare",
        "groceries",
        "home-decoration",
        "furniture",
        "tops",
        "womens-dresses",
        "womens-shoes",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "womens-watches",
        "womens-bags",
        "womens-jewellery",
        "sunglasses",
        "automotive",
        "motorcycle",
        "lighting"
    ];

    const getData = async (info: string | number) => {
        const fetchGet = await fetch(`https://dummyjson.com/products/${info}`);

        if (!fetchGet.ok) {
            setData(null);
            setVisible(true);
            setCreateMSG(`Error: ${fetchGet.status}`);
            throw new Error("Error: " + fetchGet.status);
        }

        const response = await fetchGet.json();

        if (!response) {
            setCreateMSG("No data returned from API");
            throw new Error("No data returned from API");
        }
        else {
            setData([response]);
            setId(undefined);
        }
    }

    const handleGetProduct = () => {
        if ((id !== undefined && id > 0) && checkId) {
            getData(id);
        }
        else if ((optionSelect !== undefined && optionSelect !== "Select Category") && checkCategory) {
            getData(`category/${optionSelect}`);
        }
        else if (checkAllProducts) {
            getData("");
        }
        else if (checkSearchProduct) {
            getData(`search?q=${searchProduct}`)
        }
        else
            alert("Enter a value");
    }

    const handleOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(+e.target.value);
        setOptionSelect(undefined);
        setSearchProduct(undefined);
    }

    const handleOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOptionSelect(e.target.value);
        setId(undefined);
        setSearchProduct(undefined);
    }

    const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchProduct(e.target.value);
        setOptionSelect(undefined);
        setId(undefined);
    }

    const handleCheckId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckId(e.target.checked);
        setCheckCategory(false);
        setCheckAllProducts(false);
        setCheckSearchProduct(false);
    }

    const handleCheckCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckCategory(e.target.checked);
        setCheckId(false);
        setCheckAllProducts(false);
        setCheckSearchProduct(false);
    }

    const handleCheckAllProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckAllProducts(e.target.checked);
        setCheckCategory(false);
        setCheckId(false);
        setCheckSearchProduct(false);
    }

    const handleCheckSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckSearchProduct(e.target.checked);
        setCheckAllProducts(false);
        setCheckCategory(false);
        setCheckId(false);
    }

    const handleSetVisible = () => {
        setVisible(!visible);
    }

    let tableRender: any[] = [];

    if (data !== null && data.length > 0) {
        tableRender = data[0].products ? data[0].products : data;
    }

    return (
        <CContainer>
            <CFormLabel>Choose how you want to filter the data</CFormLabel>
            <CRow xs={{ cols: 1 }} className="d-flex" >
                <CFormCheck type="checkbox" label="By id" checked={checkId} onChange={handleCheckId} />
                <CFormCheck type="checkbox" label="By Category" checked={checkCategory} onChange={handleCheckCategory} />
                <CFormCheck type="checkbox" label="Search Products" checked={checkSearchProduct} onChange={handleCheckSearchProduct} />
                <CFormCheck type="checkbox" label="Get All Products" checked={checkAllProducts} onChange={handleCheckAllProduct} />
            </CRow>
            <CContainer fluid className="mb-2">
                {
                    checkId && <CFormInput placeholder="Enter the id (number only)" type="number"
                        className="mb-2" value={id ?? 0}
                        onChange={handleOption}
                    />
                }
                {
                    checkSearchProduct && <CFormInput placeholder="Search" type="text"
                        className="mb-2" value={searchProduct ?? ""}
                        onChange={handleSearchProduct}
                    />
                }
                {
                    checkCategory && !checkId && <CFormSelect options={category ?? ""} onChange={handleOptionSelect} value={optionSelect} />
                }
            </CContainer>
            <CButton type="button" onClick={handleGetProduct} >Search Product</CButton>
            {
                visible && <SharedModal msg={createMSG} visible={visible} setVisible={handleSetVisible} />
            }
            {
                data && <CTable className="mt-5">
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Brand</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Discount</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            tableRender.map((item: any) => (
                                <CTableRow key={item.id}>
                                    <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                                    <CTableDataCell>{item.title}</CTableDataCell>
                                    <CTableDataCell>{item.description}</CTableDataCell>
                                    <CTableDataCell>{item.category}</CTableDataCell>
                                    <CTableDataCell>{item.brand}</CTableDataCell>
                                    <CTableDataCell>{item.price}</CTableDataCell>
                                    <CTableDataCell>{item.discountPercentage}</CTableDataCell>
                                </CTableRow>
                            ))
                        }
                    </CTableBody>
                </CTable>
            }
        </CContainer>
    );
}

export default Read;