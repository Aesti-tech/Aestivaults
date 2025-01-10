import { createContext } from "react";
import styles from "../modules/Table.module.css";

const TableContext = createContext();

function Table({ children, tableTitle, filter, delay, icon }) {
  return (
    <TableContext.Provider value={{}}>
      <section className={styles.table} style={{ "--delay": `.${delay}` }}>
        {tableTitle && (
          <div className={styles.filterBox}>
            <h2>
              {tableTitle} {icon}
            </h2>
            {filter}
          </div>
        )}
        {children}
      </section>
    </TableContext.Provider>
  );
}

function TableHead({ columns, extraColumns = "0px", style }) {
  return (
    <header
      aria-roledescription="Table"
      className={styles.head}
      style={{ "--extra-column": `${extraColumns}`, backgroundColor: style }}
    >
      {columns.map((item, index) => {
        if (!item.render) {
          return <h4 key={index}>{item}</h4>;
        } else {
          return (
            <h4 key={index}>
              {item.name} {item.render}
            </h4>
          );
        }
      })}
    </header>
  );
}

function TableBody({ data, columns, extraColumns = "0px", style }) {
  return (
    <main className={styles.body}>
      {data.map((item, rowIndex) => (
        <div
          className={styles.row}
          key={rowIndex}
          style={{
            "--extra-column": `${extraColumns}`,
            backgroundColor: style,
          }}
        >
          {columns.map((column, colIndex) => {
            const content = column.render
              ? column.render(item, rowIndex)
              : item[column.key];

            const formattedContent = column.format
              ? column.format(content)
              : content;

            return (
              <div className={styles.rowItem} key={colIndex}>
                {formattedContent}
              </div>
            );
          })}
        </div>
      ))}
    </main>
  );
}

Table.Head = TableHead;
Table.Body = TableBody;

export default Table;
