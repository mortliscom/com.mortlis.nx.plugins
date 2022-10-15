import { ServerExecutorSchema } from './schema';

export default async function runExecutor(
  options: ServerExecutorSchema,
) {
  console.log('Executor ran for Server', options);
  return {
    success: true
  };
}

