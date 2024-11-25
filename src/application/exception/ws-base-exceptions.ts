// import { ValidationError } from '@nestjs/common';
// import { WsException } from '@nestjs/websockets';
// import { WsResponseDto } from 'src/common/type/response';
// import { reduceErrors } from './base.exception';

// export class WsBaseException extends WsException {
//   constructor(
//     private readonly errors: ValidationError[],
//     message: string = 'Validation failed',
//   ) {
//     const errorsMessages = reduceErrors(errors);
//     const responseDto: WsResponseDto = {
//       timestamp: new Date().toISOString(),
//       message: message,
//       error: errorsMessages,
//       data: {},
//     };
//     super(responseDto);
//   }
// }
