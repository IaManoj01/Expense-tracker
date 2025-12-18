import { Trash2, TrendingDown, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'

const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Others']

const categoryColors = {
  'Food': 'bg-orange-100 text-orange-700 border-orange-300',
  'Travel': 'bg-blue-100 text-blue-700 border-blue-300',
  'Shopping': 'bg-pink-100 text-pink-700 border-pink-300',
  'Bills': 'bg-red-100 text-red-700 border-red-300',
  'Entertainment': 'bg-purple-100 text-purple-700 border-purple-300',
  'Health': 'bg-green-100 text-green-700 border-green-300',
  'Others': 'bg-gray-100 text-gray-700 border-gray-300'
}

const defaultExpenses = [
  { id: 1, name: 'Breakfast at cafe', amount: 180, category: 'Food', date: '2025-10-29' },
  { id: 2, title: 'Auto to office', amount: 50, category: 'Travel', date: '2025-10-30' },
  { id: 3, title: 'Netflix subscription', amount: 649, category: 'Entertainment', date: '2025-10-28' }
]

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) : defaultExpenses
  })
  
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])
  
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [selectedFilter, setSelectedFilter] = useState('All')

  const handleAdd = () => {
    if (!name.trim() || !amount || parseFloat(amount) <= 0) {
      alert('Please enter valid expense details')
      return
    }
    
    const newExpense = {
      id: Date.now(),
      title: name.trim(),
      amount: parseFloat(amount),
      category: category,
      date: new Date().toISOString().split('T')[0]
    }
    
    setExpenses([newExpense, ...expenses])
    setName('')
    setAmount('')
  }

  const handleDelete = (id) => {
    setExpenses(expenses.filter(e => e.id !== id))
  }

  const filteredList = selectedFilter === 'All' 
    ? expenses 
    : expenses.filter(e => e.category === selectedFilter)

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  const categoryTotals = {}
  expenses.forEach(exp => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 pt-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">My Expenses</h1>
          <p className="text-gray-500 text-sm">Track where your money goes</p>
        </div>

        {/* Total Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 mb-6 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Wallet size={20} className="text-white opacity-80" />
            <span className="text-white text-sm opacity-80">Total Spending</span>
          </div>
          <div className="text-white text-4xl font-bold mb-1">₹{total.toLocaleString('en-IN')}</div>
          <div className="text-white text-sm opacity-80">{expenses.length} transactions this month</div>
        </div>

        {/* Add Expense Section */}
        <div className="bg-white rounded-xl p-5 mb-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-4 text-lg">Add Expense</h2>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="What did you buy?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-400"
            />
            
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-400"
              />
              
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-indigo-400 bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAdd}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Add Expense
            </button>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl p-5 mb-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-4 text-lg">Category Breakdown</h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(categoryTotals).map(([cat, amt]) => (
              <div key={cat} className={`p-3 rounded-lg border ${categoryColors[cat]}`}>
                <div className="text-sm mb-1">{cat}</div>
                <div className="font-bold">₹{amt.toLocaleString('en-IN')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedFilter('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedFilter === 'All' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedFilter === cat 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Expenses List */}
        <div className="space-y-3">
          {filteredList.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
              <TrendingDown className="mx-auto mb-3 text-gray-300" size={48} />
              <p className="text-gray-500">No expenses yet</p>
              <p className="text-gray-400 text-sm mt-1">Start tracking your spending above</p>
            </div>
          ) : (
            filteredList.map(expense => (
              <div
                key={expense.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-800">{expense.title || expense.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded text-xs ${categoryColors[expense.category]}`}>
                      {expense.category}
                    </span>
                    <span>•</span>
                    <span>{new Date(expense.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-800 text-lg">₹{expense.amount.toLocaleString('en-IN')}</span>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
