export default function Nav(props: { path: string }) {
  return (
    <div className="text-white bg-purple-800 px-1.5 pt-1.5 py-2">
      <a className={`ml-2 hover:text-orange-200 ${props.path === "/" ? "text-orange-400" : ""}`} href="/">
        Home
      </a>
      <a
        className={`ml-2 hover:text-orange-200 ${
          props.path === "/cards" ? "hover:text-orange-300 text-orange-400" : ""
        }`}
        href="/cards"
      >
        Cards
      </a>
    </div>
  );
}
