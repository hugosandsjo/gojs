type HeaderProps = {};

export default function Header() {
  return (
    <>
      <header className="flex justify-between bg-slate-400 py-6">
        <div className="flex flex-col">
          <p>Menu</p>
          <p>Menu</p>
          <p>Menu</p>
          <p>Menu</p>
        </div>
        <h1 className="text-6xl font-serif">Gojs app</h1>
        <div className="flex">
          {" "}
          <p>Logo</p>
        </div>
      </header>
    </>
  );
}
