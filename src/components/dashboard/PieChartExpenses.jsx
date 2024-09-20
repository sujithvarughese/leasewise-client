import { useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material'
import Title from './Title';
import Paper from '@mui/material/Paper'

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
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <Title>Expenses</Title>
      <PieChart series={[{ data: createData() },]} />
    </Paper>

  )
}

export default PieChartExpenses