import { Outlet } from "react-router-dom";
import { Header } from "./components/header";
export function Layout({ cart, setCart }) {
  return (
    <>
      <Header cart={cart} />
      <main className="DOM_BODY">
        <Outlet />
      </main>
    </>
  );
}
