import { ShapeInstance } from './core/BaseShape';


export type UnclonedBackupJobs = {
  type: 'UnclonedBackupJobs';
  specs: ShapeInstance;
};

export type ReportType = {
  type: 'ReportType';
  specs: ShapeInstance;
};

export type Merge = {
  type: 'Merge';
  specs: ShapeInstance;
};

export type AnyShape =
  | UnclonedBackupJobs
  | ReportType
  | Merge;
