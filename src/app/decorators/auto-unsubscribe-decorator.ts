import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const isFunction = (value: any) => typeof value === 'function';

export function AutoUnsubscribe(destroyFunctionName = 'ngOnDestroy') {

  return function <T extends { new(...args: any[]): {} }>(constructor: T) {

    const originalOnDestroy = constructor.prototype[destroyFunctionName];

    if (!isFunction(originalOnDestroy)) {
      console.warn(`${constructor.name} is using @AutoUnsubscribe but does not implement ${destroyFunctionName}`);
    }

    return class extends constructor {

      _takeUntilDestroy$: Subject<boolean> = new Subject();

      get destroyed$(): Observable<boolean> {
        this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();
        return this._takeUntilDestroy$.asObservable();
      }

      [destroyFunctionName]() {
        // tslint:disable-next-line:no-unused-expression
        isFunction(originalOnDestroy) && originalOnDestroy.apply(this, arguments);
        this._takeUntilDestroy$.next(true);
        this._takeUntilDestroy$.complete();
      }
    };
  };
}

export const untilDestroyed = that => <T>(source: Observable<T>) => {
  if (!('destroyed$' in that)) {
    console.warn(`'destroyed$' property does not exist on
    ${that.constructor.name}. Did you decorate the class with '@AutoUnsubscribe()'?`);
    return source;
  }
  return source.pipe(takeUntil<T>(that.destroyed$));
};

