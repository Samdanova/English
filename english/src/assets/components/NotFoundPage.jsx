import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="error-page">
            <h1 className="error-h">404</h1>
            <Link className="error-link" to="/">Go Home</Link>
        </div>
    );
}

export default NotFoundPage;