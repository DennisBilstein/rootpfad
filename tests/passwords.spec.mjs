import {test,expect} from '@playwright/test';
import {hashPassword,verifyPassword} from '../server/passwords.mjs';
test('Asynchrone Passwortableitung ist gesalzen und kompatibel mit gespeichertem Format',async()=>{
 const a=await hashPassword('correct-long-password'),b=await hashPassword('correct-long-password');
 expect(a).not.toBe(b);expect(await verifyPassword('correct-long-password',a)).toBe(true);expect(await verifyPassword('wrong',a)).toBe(false);expect(await verifyPassword('anything','bad-hash')).toBe(false);
});
