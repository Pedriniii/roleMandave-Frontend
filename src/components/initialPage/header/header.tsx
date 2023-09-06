import  './header.css'

function Header (){
    return(
    <div className={"headerMain"}>
        <h3 className={"mesAtual"}>Mês Atual</h3>

        <div className={"saldoAtual"}>
            <p>Saldo em conta</p>
            <h2>R$ 3.695,00</h2>
        </div>

        <div className={"despesasReceitas"}>
            <div>
                <span>👍</span>
                <div className={"align"}>
                    <span>Receitas</span>
                    <p>R$ 3.695,00</p>
                </div>
            </div>

            <div>
                <span>😢</span>
                <div className={"align"}>
                    <span>Despesas</span>
                    <p>R$ 0,00</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Header;