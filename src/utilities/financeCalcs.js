
// function to convert to dollar format
const convertToUSD = (number) => {
	return  number.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	})
}

// calculate payoff amount using current data - user can change fields and see what results would be
const calculatePayoff = (principal, apr, termYears, paymentsMade) => {
	if (!principal || !apr ||!termYears || !paymentsMade) {
		return 0
	}
	const interest = (apr/100) / 12
	const term = termYears * 12
	const result = principal * ((1 + interest) ** term  - (1 + interest) ** paymentsMade) / ((1 + interest) ** term - 1)
	return result
}

const calculateMonthlyPayment =  (principal, apr, termYears) => {
	if (!principal || !apr ||!termYears) {
		return 0
	}
	const interest = (apr/100)
	const term = termYears * 12
	const payment =  principal * (interest * (1 + interest) ** term) / ((1 + interest) ** term - 1)
	return payment
}

// total profit = rent - property tax - insurance premium - association fees; default term: 1 month
const calculateProfit = (annualPropertyTax, annualHomeInsurance, monthlyHoa, monthlyRent, term= 1) => {
	const monthlyProfit = monthlyRent - annualPropertyTax/12 - annualHomeInsurance/12 - monthlyHoa
	const profit = monthlyProfit * term
	return profit
}


// for financial summary; params: array of financial data for each unit
const totalMortgage = (data, term=1) => (data.reduce((acc, unitFinance) => {
	const payment = calculateMonthlyPayment(unitFinance.mortgage.principal, unitFinance.mortgage.interest, unitFinance.mortgage.term)
	return payment + acc
	}, 0)) * term
const totalPropertyTax = (data, term=12) => ((data.reduce((acc, unitFinance) => unitFinance.propertyTax + acc, 0))/12) * term
const totalInsurance = (data, term=12) => ((data.reduce((acc, unitFinance) => unitFinance.insurance + acc, 0))/12) * term
const totalHoa = (data, term=12) => ((data.reduce((acc, unitFinance) => unitFinance.hoa + acc, 0))/12) * term
const totalRent = (data, term=1) => (data.reduce((acc, unitFinance) => unitFinance.rent + acc, 0)) * term

const totalProfit = (data, term) => totalRent(data, term) - totalMortgage(data, term) - totalInsurance(data, term) - totalHoa(data, term)




export { convertToUSD, calculatePayoff, calculateMonthlyPayment, calculateProfit, totalMortgage, totalPropertyTax, totalInsurance, totalHoa, totalRent, totalProfit }