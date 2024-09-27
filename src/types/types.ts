export type ProfessionalType = {
  professionalID: string;
  name: string;
  description?: string;
  email: string;
  phone?: string;
  mapURL?: string;
  imageURL?: string;
  services?: ServiceType[];
  bankingInfo?: BankingInfoType;
};

export type ServiceType = {
  serviceID: string;
  title: string;
  description?: string;
  avaliability: AvaliabilityType[];
  depositValue: number;
  modality: string;
};

export type AvaliabilityType = {
  day: number;
  time_from: string;
  time_until: string;
  frecuency: string;
};

export type AuthUserType = {};

export type BankingInfoType = {
  CBU?: string;
  alias?: string;
};
