"use client"

import { useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff } from "lucide-react"
import { CakeScene } from "@/components/cake-scene"

export type CakeSize = "6" | "8" | "10"
export type SpongeType = "vanilla" | "red-velvet" | "chocolate" | "salted-caramel" | "lemon"
export type FillingType = "pink" | "blue" | "yellow"
export type ExtraType = "cookie-dough" | "caramelized-chocolate" | "oreo-crumbs"

export interface CakeConfig {
  size: CakeSize | null
  sponge: SpongeType | null
  filling: FillingType | null
  extras: ExtraType[]
}

const sizeOptions = [
  { value: "6" as CakeSize, label: '6"', blurb: "4–6 slices" },
  { value: "8" as CakeSize, label: '8"', blurb: "8–10 slices" },
  { value: "10" as CakeSize, label: '10"', blurb: "12–15 slices" },
]

const spongeOptions = [
  { value: "vanilla" as SpongeType, label: "Vanilla", colour: "#FFF8DC" },
  { value: "red-velvet" as SpongeType, label: "Red Velvet", colour: "#DC143C" },
  { value: "chocolate" as SpongeType, label: "Chocolate", colour: "#8B4513" },
  { value: "salted-caramel" as SpongeType, label: "Salted Caramel", colour: "#DEB887" },
  { value: "lemon" as SpongeType, label: "Lemon", colour: "#FFFF99" },
]

const fillingOptions = [
  { value: "pink" as FillingType, label: "Pink", colour: "#FFB6C1" },
  { value: "blue" as FillingType, label: "Blue", colour: "#87CEEB" },
  { value: "yellow" as FillingType, label: "Yellow", colour: "#FFFF99" },
]

const extraOptions = [
  { value: "cookie-dough" as ExtraType, label: "Cookie Dough" },
  { value: "caramelized-chocolate" as ExtraType, label: "Caramelized White Choc" },
  { value: "oreo-crumbs" as ExtraType, label: "Oreo Crumbs" },
]

export default function CakeBuilder() {
  /* ---------------- state ---------------- */
  const [config, setConfig] = useState<CakeConfig>({
    size: null,
    sponge: null,
    filling: null,
    extras: [],
  })

  const [step, setStep] = useState<"size" | "sponge" | "filling" | "extras">("size")
  const [mobilePreview, setMobilePreview] = useState(false)

  /* -------------- helpers ---------------- */
  const updateConfig = (changes: Partial<CakeConfig>) => setConfig((p) => ({ ...p, ...changes }))
  const toggleExtra = (e: ExtraType) =>
    setConfig((p) => ({
      ...p,
      extras: p.extras.includes(e) ? p.extras.filter((x) => x !== e) : [...p.extras, e],
    }))

  const canNext =
    (step === "size" && config.size) ||
    (step === "sponge" && config.sponge) ||
    (step === "filling" && config.filling) ||
    step === "extras"

  /* -------------- GSAP entry animation ---------------- */
  const stepRef = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      if (!stepRef.current) return
      gsap.fromTo(stepRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" })
    },
    { dependencies: [step] },
  )

  /* ---------------- UI ---------------- */
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <section className="container mx-auto px-4 py-10 max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-8">Design Your Cake</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* === LEFT / controls ===================================================== */}
          <div>
            {/* progress dots */}
            <div className="flex items-center justify-center mb-6 gap-2">
              {["size", "sponge", "filling", "extras"].map((s, i) => {
                const complete =
                  (s === "size" && config.size) ||
                  (s === "sponge" && config.sponge) ||
                  (s === "filling" && config.filling) ||
                  (s === "extras" && config.extras.length)
                return (
                  <div
                    key={s}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step === s
                        ? "bg-pink-500 text-white"
                        : complete
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </div>
                )
              })}
            </div>

            {/* mobile preview btn */}
            <div className="lg:hidden mb-4">
              <Button variant="outline" onClick={() => setMobilePreview(!mobilePreview)} className="w-full">
                {mobilePreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {mobilePreview ? "Hide preview" : "Show preview"}
              </Button>
            </div>

            {/* mobile preview canvas */}
            {mobilePreview && (
              <Card className="mb-6">
                <Canvas className="h-64" camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <CakeScene config={config} />
                  <OrbitControls enableZoom={false} />
                  <Environment preset="studio" />
                </Canvas>
              </Card>
            )}

            {/* STEP CONTENT */}
            <div ref={stepRef} className="space-y-4">
              {step === "size" && (
                <>
                  <h2 className="text-xl font-semibold">Choose a size</h2>
                  <div className="grid gap-3">
                    {sizeOptions.map((o) => (
                      <Card
                        key={o.value}
                        onClick={() => updateConfig({ size: o.value })}
                        className={`cursor-pointer transition hover:shadow ${
                          config.size === o.value ? "ring-2 ring-pink-500 bg-pink-50" : ""
                        }`}
                      >
                        <CardContent className="p-4 flex justify-between">
                          <span className="font-medium">{o.label}</span>
                          <span className="text-sm text-gray-600">{o.blurb}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {step === "sponge" && (
                <>
                  <h2 className="text-xl font-semibold">Pick a sponge flavour</h2>
                  <div className="grid gap-3">
                    {spongeOptions.map((o) => (
                      <Card
                        key={o.value}
                        onClick={() => updateConfig({ sponge: o.value })}
                        className={`cursor-pointer transition hover:shadow ${
                          config.sponge === o.value ? "ring-2 ring-pink-500 bg-pink-50" : ""
                        }`}
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full border" style={{ backgroundColor: o.colour }} />
                          <span className="font-medium">{o.label}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {step === "filling" && (
                <>
                  <h2 className="text-xl font-semibold">Select a filling</h2>
                  <div className="grid gap-3">
                    {fillingOptions.map((o) => (
                      <Card
                        key={o.value}
                        onClick={() => updateConfig({ filling: o.value })}
                        className={`cursor-pointer transition hover:shadow ${
                          config.filling === o.value ? "ring-2 ring-pink-500 bg-pink-50" : ""
                        }`}
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="w-16 h-6 rounded border" style={{ backgroundColor: o.colour }} />
                          <span className="font-medium">{o.label}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {step === "extras" && (
                <>
                  <h2 className="text-xl font-semibold">Add extras (optional)</h2>
                  <div className="grid gap-3">
                    {extraOptions.map((o) => (
                      <Card
                        key={o.value}
                        onClick={() => toggleExtra(o.value)}
                        className={`cursor-pointer transition hover:shadow ${
                          config.extras.includes(o.value) ? "ring-2 ring-pink-500 bg-pink-50" : ""
                        }`}
                      >
                        <CardContent className="p-4 flex justify-between">
                          <span className="font-medium">{o.label}</span>
                          {config.extras.includes(o.value) && <Badge>✓</Badge>}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {/* navigation */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  disabled={step === "size"}
                  onClick={() =>
                    setStep((prev) =>
                      prev === "sponge" ? "size" : prev === "filling" ? "sponge" : prev === "extras" ? "filling" : prev,
                    )
                  }
                >
                  Previous
                </Button>
                <Button
                  disabled={!canNext}
                  onClick={() =>
                    setStep((prev) =>
                      prev === "size" ? "sponge" : prev === "sponge" ? "filling" : prev === "filling" ? "extras" : prev,
                    )
                  }
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  {step === "extras" ? "Done" : "Next"}
                </Button>
              </div>
            </div>
          </div>

          {/* === RIGHT / desktop preview =========================================== */}
          <div className="hidden lg:block">
            <Card className="h-[600px] p-4">
              <Canvas className="h-full" camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <CakeScene config={config} />
                <OrbitControls enableZoom={false} />
                <Environment preset="studio" />
              </Canvas>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
