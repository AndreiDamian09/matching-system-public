import { NavLink } from "react-router-dom";

export default function Navigation() {
  const linkStyle = ({ isActive }) => ({
    padding: "8px 12px",
    borderRadius: "6px",
    textDecoration: "none",
    color: isActive ? "white" : "#333",
    backgroundColor: isActive ? "#2563eb" : "transparent",
    fontWeight: isActive ? "bold" : "normal"
  });

  return (
    <nav style={{
      display: "flex",
      gap: "10px",
      padding: "12px 20px",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px 10px 10px 10px",
    }}>
  <img src="/Group.png" alt="CrowdConnect Logo" height="39" />
      {/* <p style={{ padding: "8px 12px",
      borderRadius: "6px",
        fontSize: "20px",
        fontWeight: "bold",
        margin: "0"
       }}>CrowdConnect</p> */}
      <NavLink to="/" style={linkStyle}>
        Home
      </NavLink>
      <NavLink to="/taskbrowser" style={linkStyle}>
      Browse Tasks
      </NavLink>
      <NavLink to="/contributor" style={linkStyle}>
        Contributor
      </NavLink>

      <NavLink to="/requester" style={linkStyle}>
        Requester
      </NavLink>

      <NavLink to="/matching" style={linkStyle}>
        Matching
      </NavLink>

    </nav>
  );
}
