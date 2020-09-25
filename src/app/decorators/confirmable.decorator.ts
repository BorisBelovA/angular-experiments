import {ConfirmationService} from 'primeng/api';
import { async } from '@angular/core/testing';
import { ViewChild } from '@angular/core';

const conf = (message) => {
    
    return new Promise(resolve => {
        document.getElementById('confirmMessage').innerText = message;
        document.getElementsByClassName('confirm')[0].setAttribute('style', 'display: block');
        // resolve(confirm(message))
        console.log(document.getElementsByClassName('confirm')[0])
        document.getElementById('confirmYes').addEventListener('click', ()=> {
            document.getElementsByClassName('confirm')[0].setAttribute('style', 'display: none');
            resolve(true)
        })
        document.getElementById('confirmNo').addEventListener('click', ()=> {
            document.getElementsByClassName('confirm')[0].setAttribute('style', 'display: none');
            resolve(false)
        })
    })
}

export function Confirmable(message: string): Function {
    return function(target: object, propertyName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            
            conf(message).then((allow) => {
                if (allow) {
                    return originalMethod.apply(this, args);
                } else {
                    return null;
                } 
            });
            // if (allow) {
            //     return originalMethod.apply(this, args);
            // } else {
            //     return null;
            // }

            // const a = new Test(new ConfirmationService());
            // a.confirm().then((res) => {
            //     if (res) {
            //         return originalMethod.apply(this, args);
            //     } else {
            //         return null;
            //     }
            // });
        }

        return descriptor;
    }
}