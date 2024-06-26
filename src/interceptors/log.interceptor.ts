import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LogInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        
        const dt = Date.now();

        return next.handle().pipe(tap(() => {
            console.log(`Tempo de execução foi de: ${Date.now() - dt} ms`);
        }))

    }
}