"use client"

import { useState } from "react"
import { CakeBuilder3D } from "@/components/old_code/cake-builder-3d"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type CakeConfig = {
  sponge: "vanilla" | "chocolate"
  size: "6" | "8" | "10"
  filling: "chocolate-buttercream" | "cream-cheese" | "vanilla-buttercream"
}

export default function CakeBuilderPage() {
  const [cakeConfig, setCakeConfig] = useState<CakeConfig>({
    sponge: "vanilla",
    size: "8",
    filling: "chocolate-buttercream",
  })

  const updateConfig = (key: keyof CakeConfig, value: string) => {
    setCakeConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bespoke Cake Builder</h1>
          <p className="text-lg text-gray-600">Design your perfect cake with our interactive 3D preview</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* 3D Preview */}
          <div className="order-2 lg:order-1">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-center">Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px] w-full">
                  <CakeBuilder3D config={cakeConfig} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configuration Panel */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Sponge Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold text-sm">
                    1
                  </span>
                  Sponge Flavor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={cakeConfig.sponge}
                  onValueChange={(value) => updateConfig("sponge", value)}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="vanilla" id="vanilla" />
                    <Label htmlFor="vanilla" className="flex-1 cursor-pointer">
                      <div className="font-medium">Vanilla Sponge</div>
                      <div className="text-sm text-gray-500">Classic vanilla flavor with a light, fluffy texture</div>
                    </Label>
                    <div className="w-6 h-6 bg-yellow-100 rounded-full border-2 border-yellow-200"></div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="chocolate" id="chocolate" />
                    <Label htmlFor="chocolate" className="flex-1 cursor-pointer">
                      <div className="font-medium">Chocolate Sponge</div>
                      <div className="text-sm text-gray-500">Rich cocoa flavor with moist, decadent texture</div>
                    </Label>
                    <div className="w-6 h-6 bg-amber-800 rounded-full border-2 border-amber-900"></div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Size Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                    2
                  </span>
                  Cake Size
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={cakeConfig.size}
                  onValueChange={(value) => updateConfig("size", value)}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="text-center">
                    <RadioGroupItem value="6" id="size-6" className="sr-only" />
                    <Label
                      htmlFor="size-6"
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        cakeConfig.size === "6" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-bold text-lg">6"</div>
                      <div className="text-sm text-gray-500">Serves 6-8</div>
                    </Label>
                  </div>
                  <div className="text-center">
                    <RadioGroupItem value="8" id="size-8" className="sr-only" />
                    <Label
                      htmlFor="size-8"
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        cakeConfig.size === "8" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-bold text-lg">8"</div>
                      <div className="text-sm text-gray-500">Serves 12-15</div>
                    </Label>
                  </div>
                  <div className="text-center">
                    <RadioGroupItem value="10" id="size-10" className="sr-only" />
                    <Label
                      htmlFor="size-10"
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        cakeConfig.size === "10"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-bold text-lg">10"</div>
                      <div className="text-sm text-gray-500">Serves 20-25</div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Filling Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">
                    3
                  </span>
                  Inner Filling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={cakeConfig.filling} onValueChange={(value) => updateConfig("filling", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your filling" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chocolate-buttercream">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-amber-700 rounded-full"></div>
                        <div>
                          <div className="font-medium">Chocolate Buttercream</div>
                          <div className="text-sm text-gray-500">Rich and creamy chocolate filling</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="cream-cheese">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-yellow-50 border border-yellow-200 rounded-full"></div>
                        <div>
                          <div className="font-medium">Cream Cheese Icing</div>
                          <div className="text-sm text-gray-500">Tangy and smooth cream cheese</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="vanilla-buttercream">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-yellow-100 rounded-full"></div>
                        <div>
                          <div className="font-medium">Vanilla Buttercream</div>
                          <div className="text-sm text-gray-500">Classic vanilla buttercream</div>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="bg-gradient-to-r from-pink-50 to-orange-50 border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-800">Your Cake Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sponge:</span>
                  <span className="font-medium capitalize">{cakeConfig.sponge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{cakeConfig.size}" diameter</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Filling:</span>
                  <span className="font-medium">
                    {cakeConfig.filling
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
