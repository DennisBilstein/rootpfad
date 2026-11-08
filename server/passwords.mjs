import {randomBytes,scrypt,timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
const derive=promisify(scrypt);
export async function hashPassword(password){
 const salt=randomBytes(32).toString('hex');
 const key=await derive(password,salt,64);
 return salt+':'+key.toString('hex');
}
export async function verifyPassword(password,stored){
 const [salt,hex]=stored.split(':');
 if(!salt||!hex||!/^[a-f0-9]{128}$/i.test(hex))return false;
 const actual=await derive(password,salt,64);
 return timingSafeEqual(Buffer.from(hex,'hex'),actual);
}
