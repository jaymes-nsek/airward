import {type Observable, of, delay} from 'rxjs'

export abstract class BaseService {
    protected simulateResponse<T>(data: T, delayMs = 100): Observable<T> {
        return of(data).pipe(delay(delayMs))
    }
}
