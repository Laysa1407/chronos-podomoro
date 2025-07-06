import type React from "react";
import { Bounce, ToastContainer } from "react-toastify";

type feedbackProps = {
  children: React.ReactNode;
};

export function Feedback({ children }: feedbackProps) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
