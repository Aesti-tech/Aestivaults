import { FaDollarSign, FaEthereum } from "react-icons/fa";
import Table from "../../ui/Table";
import Filter from "../../ui/Filter";
import useMarketData from "./useMarketData";
import SpinnerFullPage from "../../ui/SpinnerFullPage";

function TrendingTable() {
  const { isLoadingtrends, trending } = useMarketData();

  const filterOptions = [
    { value: "24h", label: "Last 24H" },
    { value: "7d", label: "Last 7D" },
    { value: "30d", label: "Last week" },
  ];

  const heading = [
    "#",
    "NFT",
    { name: "Price-USD", render: <FaDollarSign /> },
    { name: "Price-Change", render: <FaEthereum /> },
  ];

  const newtrend = trending?.nfts ?? [];

  const columns = [
    {
      key: "index",
      label: "#",
      render: (_, index) => <>{index + 1}</>,
    },
    {
      key: "name",
      label: "NFT",
      render: (item) => (
        <>
          <img src={item.image} alt="" />
          <h3>{item.name}</h3>
        </>
      ),
    },

    {
      key: "last_price.usd",
      label: "last price",
      render: (item) => (
        <>
          <p>{item.last_price.usd.toFixed(3)}</p>
        </>
      ),
    },
    {
      key: "change",
      label: "change",
      render: (item) => (
        <>
          <h3>{item.price_change_eth}</h3>
        </>
      ),
    },
  ];

  if (isLoadingtrends) return <SpinnerFullPage />;
  return (
    <Table
      delay={"2s"}
      tableTitle={`Trending`}
      icon={<FaEthereum />}
      filter={<Filter filterField="trending" options={filterOptions} />}
    >
      <Table.Head columns={heading} />
      <Table.Body data={newtrend} columns={columns} />
    </Table>
  );
}

export default TrendingTable;
