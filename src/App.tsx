import '@coreui/coreui/dist/css/coreui.min.css'
import { RouterProvider } from "react-router-dom";
import Routes from "../route";


function App() {

    return (
        <>
            <RouterProvider router={Routes} />
        </>
    );
}

export default App
