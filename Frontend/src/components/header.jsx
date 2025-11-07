import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export function Header({ cart }) {
  let productCount = cart?.product?.length || 0;
  // console.log(cart.product?.length);
  const navigate = useNavigate();
  return (
    <header>
      <section>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </nav>
        <button className="cartBtn" onClick={() => navigate("/cart")}>
          <FontAwesomeIcon icon={faCartShopping} />

          {productCount ? (
            <div className="cartCount">{productCount}</div>
          ) : null}
        </button>
      </section>
    </header>
  );
}
