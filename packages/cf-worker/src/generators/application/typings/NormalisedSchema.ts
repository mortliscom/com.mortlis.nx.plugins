import { ApplicationGeneratorSchema } from '../schema';

export interface NormalisedSchema extends ApplicationGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}
