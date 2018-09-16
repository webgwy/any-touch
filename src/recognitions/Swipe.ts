import session from '../session';
export default class SwipeRecognizer {
    recognize(computedInput: any, callback: (paylod: any) => {}) {
        if (this.test(computedInput)) {
            callback({ type: 'swipe', ...computedInput });
        }
    };

    test(computedInput: any) {
        const {lastVelocityX, lastVelocityY,maxLength} = computedInput;
        return 1 === maxLength && 'end' === session.inputStatus && 0.3 < Math.max(Math.abs(lastVelocityX), Math.abs(lastVelocityY));
    };
};