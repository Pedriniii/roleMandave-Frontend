import Header from "../components/initialPage/header/header";
import Body from "../components/initialPage/body/body";

function InitialPage() {
  return (
    <div>
      <Header />
      <br /><br />
      <h3>Despesas por categoria</h3>
      <br /><br />
      <Body />
    </div>
  );
}

export default InitialPage;
