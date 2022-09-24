function checkCashRegister(price, cash, cashInDrawer) {

    const currencyUnitDenomination = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.10,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 20,
        "ONE HUNDRED": 100
    }
    const tokensSmallerThanChangeDue = (changeDue, cashInDrawer) => {
        smallerTokens = [];
        cashInDrawer.forEach(currencyUnit => {
            if (changeDue > currencyUnitDenomination[currencyUnit[0]]) {
                smallerTokens.unshift(currencyUnit[0])
            }
        });
        return smallerTokens
    }

    const numberOfCashTokens = (cashInDrawer) => {
        const cashTokenAmounts = {}
        cashInDrawer.forEach(element => {
            cashTokenAmounts[element[0]] = (Math.round(element[1] / currencyUnitDenomination[element[0]]))
        });
        return cashTokenAmounts
    }

    const calculateChangeTokens = (smallerTokensThanChange, changeDue, currentCashTokenAmounts) => {
        let changeRemaining = changeDue.valueOf()
        const changeTokens = {}
        while(changeRemaining != 0){
            for (const token of smallerTokensThanChange) {
                console.log(currentCashTokenAmounts[token], 'here')
                if (currencyUnitDenomination[token] <= changeRemaining && 
                changeRemaining - currencyUnitDenomination[token] >= 0 &&
                currentCashTokenAmounts[token] > 0) {
                        changeRemaining -= currencyUnitDenomination[token]
                        currentCashTokenAmounts[token] -= 1
                        if(changeTokens[token]){
                            changeTokens[token] += currencyUnitDenomination[token]
                        } else {
                            changeTokens[token] = currencyUnitDenomination[token]
                        }
                        break
                }
            }
        }
        const arrayChangeTokens = Object.entries(changeTokens)
        console.log(arrayChangeTokens)
        return arrayChangeTokens
    }

    const calculateChangeDue = (price, cash) => {
        return cash - price
    }
    const currentCashInDrawer = Object.fromEntries(cashInDrawer)
    const currentCashTokenAmounts = numberOfCashTokens(cashInDrawer)
    const changeDue = calculateChangeDue(price, cash)
    const smallerTokensThanChange = tokensSmallerThanChangeDue(changeDue, cashInDrawer)
    const changeTokens = calculateChangeTokens(smallerTokensThanChange, changeDue, currentCashTokenAmounts)
    const canReturnExact = true
    // console.log(
    //     '\n cashTokenAmounts :', cashTokenAmounts, 
    //     '\n changeDue : ', changeDue, 
    //     '\n cashInDrawer: ', cashInDrawer,
    //     '\n smallerTokensThanChange: ', smallerTokensThanChange
    // )
    

    // condition 1
    if (cashInDrawer < changeDue || !canReturnExact) {
        return { status: "INSUFFICIENT_FUNDS", change: [] }
        // condition 2
    } else if (changeDue === cashInDrawer) {
        return { status: "CLOSED", change: cashInDrawer }
        // condition 3
    } else {
        return { status: "OPEN", change: [] }
    }
}

const price = 19.5
const cash = 20
const cashInDrawer = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]















checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);