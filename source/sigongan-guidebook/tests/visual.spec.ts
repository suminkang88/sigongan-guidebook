import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
for(const [name,route,width,height] of [
  ['home-desktop','/ko/guide/',1440,1000],
  ['chapter-desktop','/ko/guide/alt-text-principles/#concise',1440,1000],
  ['chapter-mobile','/ko/guide/alt-text-principles/#concise',390,844],
  ['home-mobile','/ko/guide/',320,844]
] as const)test(`visual capture ${name}`,async({page})=>{const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width,height});await page.goto(route);await page.evaluate(()=>document.fonts.ready);await expect(page.locator('h1')).toHaveCount(1);expect(errors).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();await mkdir('docs/screenshots',{recursive:true});await page.screenshot({path:`docs/screenshots/${name}.png`,fullPage:false});if(name==='home-desktop'||name==='home-mobile'){const service=page.locator('.service-callout');await service.scrollIntoViewIfNeeded();await service.locator('img').evaluate((img:HTMLImageElement)=>img.decode());await service.screenshot({path:`docs/screenshots/service-${name}.png`})}});
