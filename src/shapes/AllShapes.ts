import { ShapeInstance } from './core/BaseShape';


export type UnclonedBackupJobs = {
  type: 'UnclonedBackupJobs';
  specs: ShapeInstance;
};

export type AnyShape =
  | UnclonedBackupJobs;