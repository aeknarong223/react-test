export interface LanguageState {
  value: string;
  label: string;
}


export interface RootState {
  index: {
    lang: LanguageState;
    pages: string;
    isClicked1: boolean;
    isClicked2: boolean;
    isClicked3: boolean;
    part1: string;
    part2: string;
    part3: string;
    part4: string;
    part5: string;
  };
}

export interface CitizenIDParts {
  part1: string;
  part2: string;
  part3: string;
  part4: string;
  part5: string;
}