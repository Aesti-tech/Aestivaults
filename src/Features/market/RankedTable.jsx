import { MdMilitaryTech } from "react-icons/md";
import Table from "../../ui/Table";
import Filter from "../../ui/Filter";
import { FaDollarSign, FaEthereum } from "react-icons/fa";
import useMarketData from "./useMarketData";
import SpinnerFullPage from "../../ui/SpinnerFullPage";

function RankedTable() {
  const { ranked, isLoadingrank } = useMarketData();
  const trendingFilter = [
    { value: "24h", label: "Last 24H" },
    { value: "7d", label: "Last 7D" },
    { value: "30d", label: "Last week" },
  ];

  const newtrend = ranked?.collections ?? [];

  const columns = [
    {
      key: "#",
      label: "#",
      render: (_, index) => <>{index + 1}</>,
    },
    {
      key: "name",
      label: "name",
      render: (item) => (
        <>
          <img src={item.banner_image_url} alt="" />
          <h3>{item.name}</h3>
        </>
      ),
    },
    { key: "floor_price_eth", label: "floor_price_eth" },
    {
      key: "floor_price_usd",
      label: "Floor Price (USD)",
      format: (value) => (typeof value === "number" ? value.toFixed(3) : "N/A"),
    },
    {
      key: "volume_eth",
      label: "Volume",
      format: (value) => (typeof value === "number" ? value.toFixed(2) : "N/A"),
    },
  ];

  if (isLoadingrank) return <SpinnerFullPage />;

  return (
    <Table
      tableTitle={`Ranking`}
      icon={<MdMilitaryTech />}
      filter={<Filter filterField="ranking" options={trendingFilter} />}
      delay={"4s"}
    >
      <Table.Head
        extraColumns="1fr"
        columns={[
          "#",
          "collection",
          { name: "Floor-Price", render: <FaEthereum /> },
          { name: "Floor-price", render: <FaDollarSign /> },
          "Volume",
        ]}
      />
      <Table.Body extraColumns="1fr" data={newtrend} columns={columns} />
    </Table>
  );
}

export default RankedTable;
