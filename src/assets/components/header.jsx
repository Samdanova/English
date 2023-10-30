import { Outlet, NavLink } from "react-router-dom";
import Logo from "../img/logo.png";


function Header() {
    return (
        <div>
            <ul className="header">
                <NavLink to="/"><img src={Logo} alt="logo" className="logoImg" /></NavLink>
                <NavLink to="/" className="notActivLink" >Home</NavLink>
                <NavLink to="/game" className="notActivLink">Game</NavLink>
            </ul>
            <Outlet />
        </div>
    );
}

export default Header;