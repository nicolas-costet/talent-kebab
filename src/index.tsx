import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import {createRoot} from "react-dom/client";
import TripPlannerScreen from "src/components/views/TripPlannerScreen";
import "src/utils/i18n/i18n";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);

root.render(
    <BrowserRouter>
        <TripPlannerScreen/>
    </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();