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
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { ModelGroupSelector } from '../../model-group-selector'

describe('model group selector model categories', () => {
  test('shows GPT models in one category and keeps other models separate', async () => {
    render(
      <ModelGroupSelector
        selectedModel='gpt-5.5'
        models={[
          { label: 'gpt-5.5', value: 'gpt-5.5', category: 'GPT' },
          { label: 'gpt-6-astra', value: 'gpt-6-astra', category: 'GPT' },
          {
            label: 'codex-auto-review',
            value: 'codex-auto-review',
            category: 'Other',
          },
        ]}
        onModelChange={vi.fn()}
        selectedGroup='default'
        groups={[{ label: 'Default', value: 'default' }]}
        onGroupChange={vi.fn()}
      />
    )

    fireEvent.click(screen.getByRole('combobox'))

    expect(await screen.findByText('GPT models')).toBeInTheDocument()
    expect(screen.getByText('Other models')).toBeInTheDocument()
    const modelOptions = screen.getAllByRole('option')
    expect(modelOptions.map((option) => option.textContent)).toEqual([
      'gpt-5.5',
      'gpt-6-astra',
      'codex-auto-review',
    ])
  })
})
