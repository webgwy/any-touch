// 默认25ms做一次最终速度计算, 防止快速滑动到慢速滑动的手势识别成swipe
import { AnyInput } from '../interface';
import {COMPUTE_INTERVAL} from '../const';
// 上次采集的input
let prevInput: AnyInput;
// 上次采集时的瞬时速度
let prevVelocityX: number;
let prevVelocityY: number;

export default function (input: AnyInput): any {
    // 瞬时速度
    let velocityX:number; 
    let velocityY:number;
    prevInput = prevInput || input;
    const deltaTime = input.timestamp - prevInput.timestamp;
    if (COMPUTE_INTERVAL < deltaTime) {
        prevVelocityX = velocityX = (input.centerX - prevInput.centerX) / deltaTime || 0;
        prevVelocityY = velocityY = (input.centerY - prevInput.centerY) / deltaTime || 0;
        prevInput = input;
    } else {
        velocityX = prevVelocityX || 0;
        velocityY = prevVelocityY || 0;
    }
    const velocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    return { velocity, velocityX, velocityY }
};