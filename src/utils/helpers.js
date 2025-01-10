export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const formatToCurrency = (value) => {
  const numericValue = value.replace(/[^\d.]/g, ""); // Remove non-numeric characters
  if (numericValue === "") return ""; // Handle empty input
  const parts = numericValue.split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
  const decimalPart = parts[1] ? parts[1].slice(0, 2) : ""; // Limit to 2 decimal places

  return decimalPart ? `$${integerPart}.${decimalPart}` : `$${integerPart}`;
};

export function getFormattedTimestamp() {
  const now = new Date();

  // Get the date components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  // Get the time components
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Microseconds (approximation)
  const microseconds = (now.getMilliseconds() * 1000)
    .toString()
    .padStart(6, "0");

  // Timezone offset
  const timezoneOffset = now.getTimezoneOffset();
  const offsetSign = timezoneOffset > 0 ? "-" : "+";
  const offsetHours = String(
    Math.abs(Math.floor(timezoneOffset / 60))
  ).padStart(2, "0");
  const offsetMinutes = String(Math.abs(timezoneOffset % 60)).padStart(2, "0");

  // Build the formatted string
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${microseconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
}

export async function currentPrice() {
  const response = await fetch(
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
  );
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();

  return data?.USD;
}
