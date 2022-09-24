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
        let smallerTokens = [];
        cashInDrawer.forEach(currencyUnit => {
            if (changeDue >= currencyUnitDenomination[currencyUnit[0]]) {
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

    const getTotalCashInDrawer = (cashInDrawer) => {
        return parseFloat((cashInDrawer.reduce((total, element)=> {
            return total + element[1]
        }, 0)).toFixed(2))
    }

    const calculateChangeTokens = (smallerTokensThanChange, changeDue, currentCashTokenAmounts) => {
        let changeRemaining = changeDue.valueOf()
        const changeTokens = {}
        let sanityCheck = 100000
        console.log(smallerTokensThanChange, changeDue, currentCashTokenAmounts)
        while(changeRemaining != 0){
            for (const token of smallerTokensThanChange) {
                if (currencyUnitDenomination[token] <= changeRemaining && 
                changeRemaining - currencyUnitDenomination[token] >= 0 &&
                currentCashTokenAmounts[token] > 0) {
                        changeRemaining = parseFloat((changeRemaining - currencyUnitDenomination[token]).toFixed(2))
                        currentCashTokenAmounts[token] -= 1
                        if(changeTokens[token]){
                            changeTokens[token] += currencyUnitDenomination[token]
                        } else {
                            changeTokens[token] = currencyUnitDenomination[token]
                        }
                        break
                }
                if(sanityCheck == 0){
                    return false
                }
                sanityCheck -= 1
            }
        }
        const arrayChangeTokens = Object.entries(changeTokens)
        return arrayChangeTokens
    }

    const calculateChangeDue = (price, cash) => {
        return cash - price
    }
    // begin calculation
    const changeDue = parseFloat(calculateChangeDue(price, cash).toFixed(2))
    const totalCashInDrawer = parseFloat(getTotalCashInDrawer(cashInDrawer).toFixed(2))
    if (totalCashInDrawer < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] }
    } 
    if (changeDue === totalCashInDrawer) {
        return { status: "CLOSED", change: cashInDrawer }
    }

    const currentCashTokenAmounts = numberOfCashTokens(cashInDrawer)
    const smallerTokensThanChange = tokensSmallerThanChangeDue(changeDue, cashInDrawer)
    const changeTokens = calculateChangeTokens(smallerTokensThanChange, changeDue, currentCashTokenAmounts)
    if(!changeTokens){
        return {status: "INSUFFICIENT_FUNDS", change: []}
    }

    return { status: "OPEN", change: changeTokens }
    
}

const answer = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
console.log(answer)


// const cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]

// [["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 2], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]
// [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]