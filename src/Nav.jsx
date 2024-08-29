import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="sticky top-0 bg-purple-700 p-4 shadow-md z-10">
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/"
            className="text-white hover:bg-purple-500 py-2 px-4 rounded transition-colors"
          >
            PickupBooking
          </Link>
        </li>
        <li>
          <Link
            to="/sale-rates"
            className="text-white hover:bg-purple-500 py-2 px-4 rounded transition-colors"
          >
            SalesRate
          </Link>
        </li>
        <li>
          <Link
            to="/vendor-rates"
            className="text-white hover:bg-purple-500 py-2 px-4 rounded transition-colors"
          >
            VendorRate
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;