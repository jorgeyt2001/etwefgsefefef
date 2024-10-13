'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ItemPrice {
  id: string
  name: string
  price: number
}

export default function ItemPrice() {
  const [itemPrice, setItemPrice] = useState<ItemPrice | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchPrice = async () => {
    setLoading(true)
    try {
      // Reemplaza con tu endpoint real de la API
      const response = await fetch('https://api.yourtarkovmarket.com/price/someItemId')
      const data = await response.json()
      setItemPrice(data)
    } catch (error) {
      console.error('Error fetching price:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrice()
  }, [])

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Tarkov Market Price</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : itemPrice ? (
          <div>
            <p className="text-lg font-bold">{itemPrice.name}</p>
            <p className="text-xl text-green-600">{itemPrice.price} ₽</p>
          </div>
        ) : (
          <p>No price data available</p>
        )}
        <Button onClick={fetchPrice} className="mt-4">Refresh Price</Button>
      </CardContent>
    </Card>
  )
}