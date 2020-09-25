import { SimpleChanges } from '@angular/core';

export  enum ChangesStrategy {
    First     = 'firstTime',
    Each      = 'eachTime',
    NonFirst  = 'nonFirst'
  }

export function trackChanges<T>(key: string, methodName: string, strategy: ChangesStrategy = ChangesStrategy.Each): Function {
    return function(target: object, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
        const source = propertyDescriptor.value;
        propertyDescriptor.value = function(changes: SimpleChanges): Function {
            if (changes && changes[key] && changes[key].currentValue !== undefined) {
              const isFirstChange = changes[key].firstChange;
              if (strategy === ChangesStrategy.Each ||
                 (strategy === ChangesStrategy.First && isFirstChange) ||
                 (strategy === ChangesStrategy.NonFirst && !isFirstChange)) {
                target[methodName].call(this, changes[key].currentValue as T);
              }
            }
            return source.call(this, changes);
          };
        return propertyDescriptor;
    }
}