import Container from "../../ui/Container";
import WithdrawToBank from "./WithdrawToBank";
import WithdrawToWallet from "./WithdrawToWallet";

function Withdraw() {
  return (
    <Container head={"Withdrawal"}>
      <WithdrawToWallet />
      <WithdrawToBank />
    </Container>
  );
}

export default Withdraw;
