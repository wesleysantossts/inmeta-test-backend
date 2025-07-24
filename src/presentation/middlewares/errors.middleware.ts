import { ErrorHandlerType } from '@/application/dtos/base.dto';
import { env } from '@/infrastructure/config/environment';

export const errorHandler: ErrorHandlerType = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      result: false,
      response: err.message,
      data: null,
      ...(env.node_env === 'development' && { error: err.stack })
    });
  }
  
  res.status(500).json({
    result: false,
    response: 'Erro interno no servidor',
    data: null,
    ...(env.node_env === 'development' && { error: err.stack })
  });
};