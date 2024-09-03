import { Link, useLocation } from 'react-router-dom';

function Nav() {
  const location = useLocation();
console.log(location.pathname)
  return (
    <nav className="sticky top-0 bg-purple-700 p-4 shadow-md z-10">
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/"
            className={`text-white  py-2 px-4 rounded transition-colors  ${location.pathname == "/" ? "bg-purple-500": "bg-transparent"}`}
          >
            PickupBooking
          </Link>
        </li>
        <li>
          <Link
            to="/sale-rates"
            className={`text-white  py-2 px-4 rounded transition-colors ${location.pathname == "/sale-rates" ? "bg-purple-500": "bg-transparent"}`}
          >
            SalesRate
          </Link>
        </li>
        <li>
          <Link
            // to="/vendor-rates"
            className={`text-white  py-2 px-4 rounded transition-colors ${location.pathname == "/vendor-rates" ? "bg-purple-500": "bg-transparent"}`}
          >
            VendorRate
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;