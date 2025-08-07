import "./Landing.css";
import { useNavigate } from "react-router-dom";

function Landing() {

    const navigate = useNavigate();
    return(
        <>
            <div className="landing-container">
                <button onClick={() => navigate("/surpresa")} className="btn">Clique para abrir a surpresa 💌</button>
            </div>
        </>
    )
}

export default Landing;