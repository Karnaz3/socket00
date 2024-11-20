// import { IError } from 'src/common/type/iError';
// import { WsBaseException } from './ws-base-exceptions';

// export class WsUnauthorizedException extends WsBaseException {
//   constructor() {
//     super([], 'Unauthorized');
//   }
// }

// export class WsAppException extends WsBaseException {
//   constructor(wsErrors: IError | string = {}, message: string = 'Invalid data') {
//     if (typeof wsErrors === 'string') {
//       super([], wsErrors);
//       return;
//     }
//     const errorsMessages = Object.keys(wsErrors).map((key) => {
//       return {
//         target: { key },
//         property: key,
//         constraints: {
//           key: wsErrors[key],
//         },
//         value: key,
//       };
//     });
//     super(errorsMessages, message);
//   }
// }
