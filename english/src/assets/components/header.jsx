import { Outlet, Link } from "react-router-dom";
import Logo from "../img/logo.png";


function Header() {
    return (
        <div>
            <ul className="header">
                <Link to="/"><img src={Logo} alt="logo" className="logoImg" /></Link>
                <Link to="/" className="notActivLink" >Home</Link>
                <Link to="/game" className="notActivLink">Game</Link>
            </ul>
            <Outlet />
        </div>
    );
}

export default Header;