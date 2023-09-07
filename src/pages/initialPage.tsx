import Header from "../components/initialPage/header/header";
import Body from "../components/initialPage/body/body";
import Recebimentos from "../components/initialPage/bottom/bottom";

function InitialPage() {
  return (
    <div>
      <Header />
      <br /><br />
      <h3>Despesas por categoria</h3>
      <br />
      <Body />
      <br /><br />
      <h3>Recebimentos</h3>
      <br />
      <Recebimentos />
    </div>
  );
}

export default InitialPage;


