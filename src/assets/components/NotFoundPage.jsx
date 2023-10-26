import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="error-page">
            <h1 className="error-h">Oooops</h1>
            <div>Sorry, something went wrong. <br></br>You should better spend time learning English</div>
            <Link className="error-link" to="/">Go Home</Link>
        </div>
    );
}

export default NotFoundPage;