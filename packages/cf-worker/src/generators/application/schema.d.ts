import { TemplateOptions } from './typings/templateOptions';

export interface ApplicationGeneratorSchema {
  name: string;
  tags?: string;
  directory?: string;
  template?: TemplateOptions;
}
