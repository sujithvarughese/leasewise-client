import { useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
const PieChartExpenses = ({ expenses }) => {

  const createData = () => {
    const expensesObj = {}
    expenses.forEach(expense => {
      if (expense.category in expensesObj) {
        expensesObj[expense.category] = { ...expensesObj[expense.category], value: expensesObj[expense.category].value += expense.amount }
        return
      }
      expensesObj[expense.category] = {
        id: expense.category,
        value: expense.amount,
        label: expense.category[0].toUpperCase() + expense.category.substring(1)
      }
    })
    return Object.values(expensesObj)
  }

  return (
    <PieChart
      series={[{ data: createData() },]}
    width={400}
    height={200}
    >

    </PieChart>
  )
}

export default PieChartExpenses