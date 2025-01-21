import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from "@nestjs/common";
import { Prisma } from '@prisma/client';



@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(PrismaExceptionFilter.name, { timestamp: true });

    private readonly errorCodes: { [key: string]: { statusCode: number, message: string} } = {
        'P2003': { statusCode: HttpStatus.CONFLICT, message: 'Foreign key constraint failed.' },
        'P2018': { statusCode: HttpStatus.NOT_FOUND, message: 'Record Not found.'},
        'P2025': { statusCode: HttpStatus.NOT_FOUND, message: 'Record Not found.' },
    };

    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
       
        this.logger.error(`Prisma exception caught: ${exception.code}`);

        const error = this.errorCodes[exception.code] || { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'An unexpected error occurred.' };

        response
            .status(error.statusCode)
            .json({
                statusCode: error.statusCode,
                message: error.message,
                error: exception.name,
                path: request.url,
            });
    }
}