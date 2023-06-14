import { Model } from 'mongoose';

export type ManagementDepartmentType = {
  title: string;
};

export type ManagementDepartmentModel = Model<
  ManagementDepartmentType,
  Record<string, unknown>
>;

export type managementDepartmentFiltersType = {
  searchTerm?: string;
  id?: string;
  title?: string;
};
