import { test, expect } from '@playwright/test'

test('all principal slides render without runtime errors or overflow', async ({page}) => {
  const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  for(let n=1;n<=35;n++){
    await page.goto('/ia-para-amigos/'+n)
    const slide=page.locator('.slidev-page:visible .slidev-layout')
    await expect(slide.locator('h1')).toBeVisible()
    const overflow=await slide.evaluate(el => {
      const parent=el.getBoundingClientRect()
      return [...el.querySelectorAll('h1,h2,p,.note,.pending,.edition,.cards,.neuron,.steps')]
        .filter(e=>e.getBoundingClientRect().bottom>parent.bottom+2)
        .map(e=>e.textContent?.slice(0,60))
    })
    expect.soft(overflow,'Slide '+n+' overflow').toEqual([])
  }
  expect(errors).toEqual([])
})
test('step controls, reset and perceptron react to interaction',async({page})=>{
  await page.goto('/ia-para-amigos/3')
  const slide=page.locator('.slidev-page:visible')
  await expect(slide.getByRole('button',{name:'Probabilidade',exact:true})).toHaveAttribute('aria-pressed','true')
  await slide.getByRole('button',{name:'Próximo passo'}).click()
  await expect(slide.getByRole('button',{name:'Aprendizado',exact:true})).toHaveAttribute('aria-pressed','true')
  await slide.getByRole('button',{name:'Reiniciar',exact:true}).click()
  await expect(slide.getByRole('button',{name:'Probabilidade',exact:true})).toHaveAttribute('aria-pressed','true')
  await page.goto('/ia-para-amigos/12')
  await expect(page.locator('.slidev-page:visible .result strong')).toHaveText('Saída = 1')
  await page.getByRole('slider',{name:'Viés',exact:true}).fill('-2')
  await expect(page.locator('.slidev-page:visible .result strong')).toHaveText('Saída = 0')
  await page.getByRole('button',{name:'Reiniciar pesos'}).click()
  await expect(page.locator('.slidev-page:visible .result strong')).toHaveText('Saída = 1')
  await page.screenshot({path:'test-results/perceptron.png'})
  await page.goto('/ia-para-amigos/1')
  await page.screenshot({path:'test-results/cover.png'})
})
