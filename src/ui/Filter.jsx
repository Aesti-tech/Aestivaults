import { useSearchParams } from "react-router-dom";
import styles from "../modules/Filter.module.css";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;
  function handleClick(value) {
    searchParams.set(filterField, value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  return (
    <div className={styles.styledFilter}>
      {options.map((option, index) => (
        <button
          className={`${styles.filterButton} ${
            option.value === currentFilter ? styles.active : ""
          }`}
          disabled={option.value === currentFilter}
          key={index}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
export default Filter;
