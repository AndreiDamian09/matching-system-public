import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navigation() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) => ({
    padding: "8px 12px",
    borderRadius: "6px",
    textDecoration: "none",
    color: isActive ? "white" : "#333",
    backgroundColor: isActive ? "#2563eb" : "transparent",
    fontWeight: isActive ? "bold" : "normal"
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav style={{
      display: "flex",
      gap: "10px",
      padding: "12px 20px",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px 10px 10px 10px",
      alignItems: "center",
    }}>
      <NavLink to="/" >
         <img src="/Group.png" alt="CrowdConnect Logo" height="39"  />
      </NavLink>
  
      <NavLink to="/" style={linkStyle}>
        Home
      </NavLink>
      <NavLink to="/taskbrowser" style={linkStyle}>
        Browse Tasks
      </NavLink>
      
      {isAuthenticated && (
        <>
          <NavLink to="/contributor" style={linkStyle}>
            Contributor
          </NavLink>
          <NavLink to="/requester" style={linkStyle}>
            Requester
          </NavLink>
          <NavLink to="/matching" style={linkStyle}>
            Matching
          </NavLink>
        </>
      )}
      
      <div style={{ marginLeft: "auto" }} />
      
      {loading ? (
        <span style={{ color: "#6b7280", padding: "8px 12px" }}>...</span>
      ) : isAuthenticated ? (
        <>
          <span style={{ 
            padding: "8px 12px", 
            color: "#374151",
            fontSize: "14px"
          }}>
            {user?.email}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "1px solid #dc2626",
              backgroundColor: "transparent",
              color: "#dc2626",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" style={linkStyle}>
            Login
          </NavLink>
          <NavLink 
            to="/register" 
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              textDecoration: "none",
              color: "white",
              backgroundColor: "#2563eb",
              fontWeight: "500",
            }}
          >
            Register
          </NavLink>
        </>
      )}
    </nav>
  );
}
