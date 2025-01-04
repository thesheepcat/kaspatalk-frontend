import { faBars, faComputer, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SideBar = () => {
    return(
    <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary bg-white">
        <a href="/" className="d-block p-3 link-body-emphasis text-decoration-none bg-white" title="Icon-only" data-bs-toggle="tooltip" data-bs-placement="right">
            <svg className="bi pe-none" width="40" height="32" ></svg>
        </a>
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
            <li className="nav-item">
                <a href="#" className="nav-link active py-3 border-bottom rounded-0" aria-current="page" title="Home" data-bs-toggle="tooltip" data-bs-placement="right">
                    <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Home">
                        <FontAwesomeIcon icon={faBars} />  
                    </svg>
                    
                </a>
            </li>
            <li>
                <a href="#" className="nav-link py-3 border-bottom rounded-0" title="Dashboard" data-bs-toggle="tooltip" data-bs-placement="right">
                    <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Dashboard">
                        <FontAwesomeIcon icon={faUser} />  
                    </svg>
                </a>
            </li>
            <li>
                <a href="#" className="nav-link py-3 border-bottom rounded-0" title="Orders" data-bs-toggle="tooltip" data-bs-placement="right">
                    <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Orders">
                        <FontAwesomeIcon icon={faComputer} />  
                    </svg>
                </a>
            </li>
        </ul>
        <div className="dropdown border-top">
            <a href="#" className="d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" className="rounded-circle"/>
            </a>
            <ul className="dropdown-menu text-small shadow">
                <li><a className="dropdown-item" href="#">New project...</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
        </div>
    </div>

    )
};

export default SideBar;