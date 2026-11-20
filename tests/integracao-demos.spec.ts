import { test, expect } from '@playwright/test'

for (const width of [1280, 390]) {
  test(`mídia, ressalvas e ação real do Flappy · ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 800 })
    const active = page.locator('.slidev-page:visible .slidev-layout')
    await page.goto('/ia-para-amigos/8')
    await expect(active.getByText(/6\.230\/6\.231.*6\.230\/6\.230/)).toBeVisible()
    const video = active.locator('video')
    const poster = await video.getAttribute('poster')
    const media = await video.getAttribute('src')
    expect((await page.request.get(poster!)).ok()).toBe(true)
    const response = await page.request.get(media!, { headers: { Range: 'bytes=0-1023' } })
    expect(response.status()).toBe(206)
    expect(response.headers()['content-type']).toContain('video/mp4')

    await page.goto('/ia-para-amigos/9')
    await expect(active.getByText(/No modelo de digrama.*aproximação/)).toBeVisible()

    await page.goto('/ia-para-amigos/15')
    await expect(active.getByRole('link', { name: 'Referência do conceito: Rosenblatt (1958)' }))
      .toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/13602029/')

    await page.goto('/ia-para-amigos/16')
    await expect(active.getByText('Pesos ajustados à mão. O jogo não aprende nesta demonstração.')).toBeVisible()
    const iframe = active.locator('iframe')
    const clipping = await active.evaluate(async el => {
      await document.fonts.ready
      const box = el.getBoundingClientRect()
      return ['iframe', '.flappy-caption'].some(selector => {
        const content = el.querySelector(selector)!.getBoundingClientRect()
        return content.bottom > box.bottom + 1 || content.right > box.right + 1
      })
    })
    expect(clipping).toBe(false)
    await expect(iframe).toBeVisible()
    const game = active.frameLocator('iframe')
    await expect(game.locator('canvas')).toBeVisible()
    await expect(game.locator('svg')).toBeVisible()
    const step = game.getByRole('button', { name: 'Um quadro' })
    await step.click()
    await expect(game.locator('#applied')).toHaveText('Não bater · rede')
    await game.getByRole('button', { name: 'Reiniciar' }).click()
    await game.locator('#w3').fill('0')
    await step.click()
    await expect(game.locator('#applied')).toHaveText('Bater a asa · rede')
  })
}
