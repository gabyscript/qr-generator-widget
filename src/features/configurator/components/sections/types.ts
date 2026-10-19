import type { WidgetConfig } from '@/features/widget-config'
import type { SetField } from '../../hooks/useWidgetConfig'

export interface SectionProps {
  config: WidgetConfig
  setField: SetField
}
