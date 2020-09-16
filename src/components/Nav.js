import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
function Nav(props) {
    
    const { authenticated } = props;
    return (
        <div>
        <nav className="nav-container">
            <ul className="links">
            {authenticated ?  <Link style={{textDecoration:'none'}} to="/"><li className="link">Home</li></Link> :   
               <>
                <Link style={{textDecoration:'none'}} to="/login"><li className="link">Login</li></Link>
                <Link style={{textDecoration:'none'}} to="/signup"><li className="link">SignUp</li></Link>
                </>
            }     
            </ul>
        </nav>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
  });



export default connect(mapStateToProps)(Nav);
