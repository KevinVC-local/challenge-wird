export interface SelectInput {
    options: Options[],
    label: string,
    name: string,
    value: string,
    disabled: boolean,
    onChange: (event?: any) => void;
}

export interface Options {
    value: string,
    name: string,
    key: string,
    selected?: boolean,
    id?: string,
    url?: string;
} 
