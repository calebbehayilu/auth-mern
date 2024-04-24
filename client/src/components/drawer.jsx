import React from "react";

export default function Drawer({ children, isOpen, setIsOpen }) {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-base bg-opacity-50 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0 bg-base-300 bg-opacity-50  "
          : " transition-all delay-500 opacity-0 translate-x-full ")
      }
    >
      <section
        className={
          "w-5/6 max-w-lg left-0 absolute bg-base-100 h-screen shadow-2xl delay-400 duration-500 ease-in-out " +
          (isOpen ? " translate-x-0 " : " translate-x-full shadow-2xl")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 h-full">
          <header className="p-4 font-bold text-lg">Header</header>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
