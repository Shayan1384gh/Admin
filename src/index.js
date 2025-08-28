import {createRoot} from "react-dom/client";
import Dashboard from "./App";
import {BrowserRouter} from "react-router";

const root = createRoot(document.getElementById("root"))
root.render(<BrowserRouter><Dashboard/></BrowserRouter>)