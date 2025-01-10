import styles from "../modules/Form.module.css";
import PropTypes from "prop-types";

function Form({ handleSubmit, className, children }) {
  return (
    <form className={className || styles.form} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Form;
