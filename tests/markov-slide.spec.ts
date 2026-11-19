import { test, expect } from '@playwright/test'

test('a turma fornece o número e a faixa determina a letra', async ({ page }) => {
  await page.goto('/ia-para-amigos/7')
  const slide = page.locator('.slidev-page:visible')
  const readout = slide.getByRole('status')
  const input = slide.getByRole('textbox', {name:'Número da turma'})
  const apply = slide.getByRole('button', {name:'Aplicar número'})
  const advance = slide.getByRole('button', {name:'Usar a letra sorteada'})
  const reset = slide.getByRole('button', {name:'Reiniciar',exact:true})
  await expect(slide.getByRole('heading', {name:'Que letra cai na faixa?'})).toBeVisible()
  await expect(slide.locator('.major-ranges')).toContainText('710–892')
  await expect(advance).toBeDisabled()
  for (const invalid of ['0','1001','1.5','foo']) {
    await input.fill(invalid)
    await apply.click()
    await expect(readout).toContainText('Digite um número inteiro')
  }
  for (const [n, letter] of [['1','A'],['1000','Z']]) {
    await input.fill(n)
    await apply.click()
    await expect(slide.locator('.letter-result')).toHaveText(letter)
  }
  await reset.click()
  await input.fill('787')
  await input.press('Enter')
  await expect(readout).toContainText('787 caiu na faixa 710–892')
  await expect(slide.locator('.letter-result')).toHaveText('S')
  await expect(slide.locator('.segment.active')).toHaveAttribute('title','S: 710–892')
  await expect(slide.locator('.draw-pin')).toBeVisible()
  await page.screenshot({path:'test-results/markov-sorteio.png'})
  for (const n of ['854','147','868']) {
    await advance.click()
    await input.fill(n)
    await apply.click()
  }
  await expect(slide.getByTestId('markov-history')).toHaveText('ASTAS')
  await reset.click()
  await expect(slide.getByRole('combobox')).toHaveValue('A')
  await expect(slide.getByTestId('markov-history')).toHaveText('A')
  await slide.getByRole('button',{name:'Rever 787 → S'}).click()
  await expect(slide.getByTestId('markov-history')).toHaveText('AS')
})

test('dois antecedentes mudam a faixa; sem evidência não há sorteio', async ({page}) => {
  await page.goto('/ia-para-amigos/8')
  const slide=page.locator('.slidev-page:visible')
  const input=slide.getByRole('textbox',{name:'Número da turma'})
  const apply=slide.getByRole('button',{name:'Aplicar número'})
  const context=slide.getByRole('textbox',{name:'Duas letras anteriores'})
  await expect(slide.getByRole('heading',{name:'E se olharmos duas letras?'})).toBeVisible()
  const comparison = slide.getByRole('region', {name:'Comparação controlada entre digrama e trigrama'})
  for (const [ctx, output] of [['U','L'],['QU','E'],['OU','T']]) {
    await expect(comparison.locator('[data-context="' + ctx + '"]')).toContainText(ctx + ' → ' + output)
  }
  await comparison.getByText('Ver 3 amostras').click()
  await expect(comparison.getByRole('table')).toContainText('QUALH')
  await expect(comparison.getByRole('table')).toContainText('QUCAN')
  await comparison.getByText('Ver 3 amostras').click()

  await expect(context).toHaveValue('QU')
  await input.fill('500')
  await apply.click()
  await expect(slide.locator('.letter-result')).toHaveText('E')
  await slide.getByRole('button',{name:'OU',exact:true}).click()
  await expect(context).toHaveValue('OU')
  await input.fill('500')
  await input.press('Enter')
  await expect(slide.locator('.letter-result')).toHaveText('T')
  await context.fill('QQ')
  await expect(apply).toBeDisabled()
  await expect(slide.getByRole('status')).toContainText('não foi seguido')
  await context.fill('q')
  await expect(slide.getByRole('status')).toContainText('Digite duas letras')
  await slide.getByRole('button',{name:'QU',exact:true}).click()
  await input.fill('500')
  await apply.click()
  await page.screenshot({path:'test-results/markov-trigrama.png'})
  await slide.getByRole('button',{name:'Usar a letra sorteada'}).click()
  await expect(context).toHaveValue('UE')
  await expect(slide.getByTestId('markov-history')).toHaveText('QUE')
})

test('Sortear usa a mesma régua que o modo manual, no celular', async ({page}) => {
  await page.setViewportSize({width:390,height:844})
  for (const slideNumber of [7, 8]) {
    await page.goto('/ia-para-amigos/' + slideNumber)
    const slide = page.locator('.slidev-page:visible')
    const input = slide.getByRole('textbox',{name:'Número da turma'})
    const draw = slide.getByRole('button',{name:'Sortear',exact:true})
    for (const [stub, number] of [[0,'1'], [0.999999,'1000'], [slideNumber===7 ? 0.7865 : 0.4995,slideNumber===7?'787':'500']] as const) {
      await page.evaluate(value => { Math.random = () => value }, stub)
      await draw.click()
      await expect(input).toHaveValue(number)
      const randomMessage = await slide.getByRole('status').textContent()
      await expect(slide.locator('.draw-pin')).toBeVisible()
      await input.fill(number)
      await input.press('Enter')
      expect(await slide.getByRole('status').textContent()).toBe(randomMessage)
    }
    await expect(slide.locator('.letter-result')).toHaveText(slideNumber===7?'S':'E')
    if (slideNumber===8) {
      await slide.getByRole('textbox',{name:'Duas letras anteriores'}).fill('QQ')
      await expect(draw).toBeDisabled()
    }
  }
})
