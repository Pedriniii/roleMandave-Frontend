import  './header.css'
import { getMonth, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function Header (){
    const currentMonth = getMonth(new Date());
    let monthName = format(new Date(0, currentMonth), 'MMMM', { locale: ptBR });

    
    monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    return(
    <div className={"headerMain"}>
        <h3 className={"mesAtual"}>{monthName}</h3>

        <div className={"saldoAtual"}>
            <p>Saldo em conta</p>
            <h2>R$ 3.795,00</h2>
        </div>

        <div className={"despesasReceitas"}>
            <div className={"containerReceitas"}>
                <span>👍</span>
                <div className={"align"}>
                    <span>Orçamento</span>
                    <p>R$ 5.744,59</p>
                </div>
            </div>

            <div className={"containerReceitas"}>
                <span>😢</span>
                <div className={"align"}>
                    <span>A receber</span>
                    <p>R$ 3.705,00</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Header;