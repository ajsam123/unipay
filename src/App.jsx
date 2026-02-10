import { Outlet } from "@tanstack/react-router";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      <Modal />
      <Outlet />
    </>
  );
}

export default App;
