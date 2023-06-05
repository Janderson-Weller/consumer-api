import { CContainer, CRow, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";
import { useState } from "react";
import Create from "./Create";
import Read from "./Read";
import UpdatePut from "./UpdatePut";

const InitialPage = () => {

    const [activeKey, setActiveKey] = useState(1)
    return (
        <CContainer fluid className="vh-100">
            <CRow className="justify-content-center">
                <CNav variant="tabs" role="tablist" className="w-auto">
                    <CNavItem>
                        <CNavLink
                            href="#!"
                            active={activeKey === 1}
                            onClick={() => setActiveKey(1)}
                        >
                            Get
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink
                            href="#!"
                            active={activeKey === 2}
                            onClick={() => setActiveKey(2)}
                        >
                            Post
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink
                            href="#!"
                            active={activeKey === 3}
                            onClick={() => setActiveKey(3)}
                        >
                            Update Put / Patch
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink
                            href="#!"
                            active={activeKey === 4}
                            onClick={() => setActiveKey(4)}
                        >
                            Delete
                        </CNavLink>
                    </CNavItem>
                </CNav>
            </CRow>
            <CRow className="justify-content-center mt-5">
                <CTabContent className="w-auto">
                    <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                        <Read />
                    </CTabPane>
                    <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
                        <Create />
                    </CTabPane>
                    <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
                        <UpdatePut />
                    </CTabPane>
                    <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 4}>
                    </CTabPane>
                </CTabContent>
            </CRow>
        </CContainer>
    );
}

export default InitialPage;