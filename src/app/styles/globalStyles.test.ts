/// <reference types="node" />
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

const SRC = join(import.meta.dirname, '..', '..')

const cssModules = readdirSync(SRC, { recursive: true, encoding: 'utf8' })
  .filter((file) => file.endsWith('.module.css'))
  .map((file) => ({
    file: relative(SRC, join(SRC, file)),
    css: readFileSync(join(SRC, file), 'utf8'),
  }))

describe('global selectors in CSS modules', () => {
  // A page's CSS can load on other pages (e.g. the configurator imports QrWidget, which ships
  // with WidgetPage's styles), so every :global() rule must be scoped to the page or theme.
  it.each(cssModules)('$file only uses :global() scoped to data-page or data-theme', ({ css }) => {
    const unscoped = [...css.matchAll(/:global\(([^)]*)\)/g)]
      .map(([, selector]) => selector!)
      .filter((selector) => !/\[data-(page|theme)/.test(selector))
    expect(unscoped).toEqual([])
  })
})
