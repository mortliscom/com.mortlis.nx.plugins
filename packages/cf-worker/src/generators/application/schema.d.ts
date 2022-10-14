import { SupportedTemplates } from '../../typings/SupportedTemplates';

export interface ApplicationSchema {
  name: string;
  template: SupportedTemplates;
  tags?: string;
  skipFormat?: boolean;
  directory?: string;
}
