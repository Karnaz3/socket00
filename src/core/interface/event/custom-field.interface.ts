export interface IBaseOption {
  value: string;
  label: string;
}
export interface IBaseAttributes {
  options: IBaseOption[];
}

export interface IEventUserCustomField {
  type: 'text' | 'email' | 'checkbox' | 'radio' | 'dropdown' | 'checkbox';
  name: string;
  isMandatory: boolean;
  attributes?: IBaseAttributes;
}

export type IEventUserCustomFieldValue = {
  [key: string]: any;
};
