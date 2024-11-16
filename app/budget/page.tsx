'use client'

import { useState, useEffect } from "react"
import { generateClient } from "aws-amplify/data"
import { Amplify } from "aws-amplify"
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react"
import type { Schema } from "@/amplify/data/resource"
import outputs from "@/amplify_outputs.json"
import { Plus, Trash2, LogOut } from 'lucide-react'
import { DataStore } from 'aws-amplify';
import { BudgetItem } from '@/models';
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import "@aws-amplify/ui-react/styles.css"

Amplify.configure(outputs)

const client = generateClient<Schema>()

function BudgetTracker() {
  const { signOut } = useAuthenticator((context) => [context.user])
  const [budgetItems, setBudgetItems] = useState<Array<Schema["BudgetItem"]["type"]>>([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    listBudgetItems()
  }, [])

// List budget items
async function listBudgetItems() {
    const items = await DataStore.query(BudgetItem);
    setBudgetItems(items);
  }
  
  // Create a new budget item
  async function createBudgetItem(e: React.FormEvent) {
    e.preventDefault();
    if (description && amount) {
      await DataStore.save(
        new BudgetItem({
          description,
          amount: parseFloat(amount),
        })
      );
      setDescription('');
      setAmount('');
      listBudgetItems();
    }
  }
  
  // Delete a budget item
  async function deleteBudgetItem(id: string) {
    const itemToDelete = await DataStore.query(BudgetItem, id);
    if (itemToDelete) {
      await DataStore.delete(itemToDelete);
      listBudgetItems();
    }
  }

  useEffect(() => {
    const subscription = DataStore.observe(BudgetItem).subscribe(() => {
      listBudgetItems();
    });
    return () => subscription.unsubscribe();
  }, []);

  const total = budgetItems.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="min-h-screen bg-[#e8f4f2] p-4 md:p-8">
      <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur relative">
        <Button
          onClick={signOut}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-[#2a7362] hover:text-[#1d5447] hover:bg-[#e8f4f2]"
          aria-label="Sign out"
        >
          <LogOut className="w-5 h-5" />
        </Button>
        <CardHeader className="text-center border-b border-[#98c1b8]/20 pb-6">
          <CardTitle className="text-2xl md:text-3xl font-normal text-[#2a7362]">Peaceful Budget Planner</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={createBudgetItem} className="space-y-4 mb-6">
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-[#2a7362]">Description</Label>
              <Input
                id="description"
                placeholder="Enter item description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-[#98c1b8] focus:border-[#2a7362] focus:ring-[#2a7362]"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount" className="text-[#2a7362]">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-[#98c1b8] focus:border-[#2a7362] focus:ring-[#2a7362]"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#2a7362] hover:bg-[#1d5447] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </form>

          <div className="space-y-4">
            {budgetItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-[#f8f8f8] border border-[#98c1b8]/20"
              >
                <span className="text-[#2a7362]">{item.description}</span>
                <div className="flex items-center gap-4">
                  <span className="text-[#2a7362] font-medium">
                    ${item.amount.toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteBudgetItem(item.id)}
                    className="text-[#ff9999] hover:text-[#ff6666] hover:bg-[#ffe5e5]"
                    aria-label={`Delete ${item.description}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {budgetItems.length > 0 && (
            <div className="mt-6 pt-4 border-t border-[#98c1b8]/20">
              <div className="flex justify-between items-center text-lg font-medium text-[#2a7362]">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}



export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => <BudgetTracker />}
    </Authenticator>
  )
}