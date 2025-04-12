export default function SidebarMenu({ alwaysShowSidebar, setDisplaySidebar }) {
  return (
    <nav
      style={
        alwaysShowSidebar ? { position: "relative" } : { position: "absolute" }
      }
      id="sidebar"
      onClick={() => {
        !alwaysShowSidebar ? setDisplaySidebar(false) : null;
      }}
    ></nav>
  );
}
