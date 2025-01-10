const baseStyles = {
  border: "1px solid var(--white-300)",
  backgroundColor: "var(--white-50)",
  borderRadius: "var(--border-radius-sm)",
  boxShadow: "var(--shadow-sm)",
  padding: "0.8rem 1.2rem",
  color: "var(--white-900)",
  fontSize: "1rem",
  width: "100%", // Default to full width
  outline: "none",
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
};

const responsiveStyles = {
  fontSize: "0.9rem",
  padding: "0.6rem 1rem",
  width: "100%",
};

const smallScreenStyles = {
  fontSize: "0.85rem",
  padding: "0.5rem 0.8rem",
  width: "100%",
};

function Input({ register, name, validation, style = {}, ...rest }) {
  return (
    <input
      style={{
        ...baseStyles,
        ...style, // Merge with any additional styles passed as props
        "@media (maxWidth: 750px)": responsiveStyles, // Medium screens
        "@media (maxWidth: 480px)": smallScreenStyles, // Small screens
      }}
      {...(register && name ? register(name, validation) : {})}
      {...rest}
    />
  );
}

export default Input;
