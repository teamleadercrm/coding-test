import './Nav.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from '../../logo.svg';
import Orders from '../Orders';
import Details from '../Details';
import Customers from '../Customers';

const Nav = () => {
    // show menu in small devices
    const Show = () => {
        document.querySelector("#nav-lists")!.classList.add("_Menus-show");
    }
    // hide menu in small devices
    const Hide = () => {
        document.querySelector("#nav-lists")!.classList.remove("_Menus-show");
    }
    return (
        <Router>
            <div className="container">
                <div className="logo">
                    <Link to='/'><img src={logo} width="110" height="35" alt="Eshop Logo"/></Link>
                </div>
                <div className="navbar">

                <div className="icon-bar" onClick={Show}>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>

                <ul id="nav-lists">
                    <li className="close"><span onClick={()=>{Hide()}}>×</span></li>
                    <li onClick={()=>{Hide()}}><Link to='/'>Orders</Link></li>
                    <li onClick={()=>{Hide()}}><Link to='/customers'>Customers</Link></li>
                </ul>

                </div>
            </div>
            <Routes>
              <Route path='/' element={<Orders />} />
              <Route path='/details' element={<Details />} />
              <Route path='/customers' element={<Customers />} />
          </Routes>
        </Router>
    )
}

export default Nav;