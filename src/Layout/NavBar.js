import React from "react";
import { Link } from "react-router-dom";

function NavBar({ text }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/" className="btn btn-link">
            Home / {text}
          </Link>
        </li>
      </ol>
    </nav>
  );
}
export default NavBar;
