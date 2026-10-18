/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { describe, expect, test } from 'vitest'

import { getModelCategory } from '../playground-option-utils'

describe('playground model categories', () => {
  test('classifies GPT model names into one GPT category', () => {
    expect(getModelCategory('gpt-6-astra')).toBe('GPT')
    expect(getModelCategory('GPT-5.5')).toBe('GPT')
    expect(getModelCategory('gpt-6')).toBe('GPT')
  })

  test('keeps non-GPT model names in Other', () => {
    expect(getModelCategory('codex-auto-review')).toBe('Other')
    expect(getModelCategory('claude-unverified')).toBe('Other')
  })

  test('groups only the eight tested Claude models in Claude', () => {
    const verified = [
      'claude-opus-5',
      'claude-opus-5-5',
      'claude-opus-4-8',
      'claude-opus-4-7',
      'claude-opus-4-6',
      'claude-sonnet-5-5',
      'claude-sonnet-4-6',
      'claude-haiku-5-5',
    ]
    expect(
      verified.every((model) => getModelCategory(model) === 'Claude')
    ).toBe(true)
  })
})
