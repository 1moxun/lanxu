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

import { groupModelsByCategory } from '../group-models'

describe('model group selector model categories', () => {
  test('places GPT and Claude models before other models', () => {
    const groupedModels = groupModelsByCategory([
      { label: 'codex-auto-review', value: 'codex-auto-review' },
      { category: 'GPT', label: 'gpt-6-astra', value: 'gpt-6-astra' },
      { category: 'GPT', label: 'gpt-5.5', value: 'gpt-5.5' },
      {
        category: 'Claude',
        label: 'claude-opus-5-5',
        value: 'claude-opus-5-5',
      },
    ])

    expect(Object.keys(groupedModels)).toEqual(['GPT', 'Claude', 'Other'])
    expect(groupedModels.GPT.map((model) => model.value)).toEqual([
      'gpt-6-astra',
      'gpt-5.5',
    ])
    expect(groupedModels.Other.map((model) => model.value)).toEqual([
      'codex-auto-review',
    ])
  })

  test('returns no categories when there are no available models', () => {
    expect(groupModelsByCategory([])).toEqual({})
  })
})
