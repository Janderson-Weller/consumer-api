import { createBrowserRouter } from "react-router-dom";
import InitialPage from "./src/initialPage";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <InitialPage />,
    },
]);

export default Routes;