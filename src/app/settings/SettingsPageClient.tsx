'use client'

import { Eraser } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useConfig, WIDGET_IDS, WidgetId } from '@/src/core/config'

const WIDGET_LABELS: Record<WidgetId, string> = {
  recentRiskEvents: 'Recent Risk Events',
  liquidityDistribution: 'Liquidity Distribution',
  portfolioRiskTrend: 'Portfolio Risk Trend',
  fraudOverview: 'Fraud Overview',
  creditExposure: 'Credit Exposure',
}

export function SettingsPageClient() {
  const { config, toggleWidget, resetConfig } = useConfig()

  const allChecked = WIDGET_IDS.every((id) => config.widgets[id])

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {WIDGET_IDS.map((widgetId) => (
              <div key={widgetId} className="flex items-center space-x-2">
                <Checkbox
                  id={widgetId}
                  checked={config.widgets[widgetId]}
                  onCheckedChange={() => toggleWidget(widgetId)}
                />
                <label
                  htmlFor={widgetId}
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {WIDGET_LABELS[widgetId]}
                </label>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={resetConfig}
              variant="outline"
              disabled={allChecked}
              className="text-destructive border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
            >
              <Eraser className="mr-1" />
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
