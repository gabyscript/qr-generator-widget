import { useId, type ReactNode } from 'react'
import styles from './sections.module.css'

interface FormSectionProps {
  title: string
  children: ReactNode
}

export function FormSection({ title, children }: FormSectionProps) {
  const titleId = useId()

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      {children}
    </section>
  )
}
