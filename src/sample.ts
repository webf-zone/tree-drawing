import { Forest } from './models/Tree';
import { AnyShape } from './shapes/AllShapes';

export const sampleForest: Forest<AnyShape> = {
  trees: [
    {
      context: {
        type: 'ReportType',
        specs: {
          x: 50,
          y: 50,

          width: 400,
          height: 300,

          selected: false
        }
      },
      children: [
        {
          context: {
            type: 'Merge',
            specs: {
              x: 800,
              y: 200,
              height: 150,
              width: 150
            }
          },
          children:
          [
            {
              context: {
                type: 'UnclonedBackupJobs',
                specs: {
                  x: 1000,
                  y: 350,
                  height: 100,
                  width: 300
                }
              },
              children: []
            },
            {
              context: {
                type: 'AddField',
                specs: {
                  x: 600,
                  y: 350,
                  height: 100,
                  width: 200
                }
              },
              children: [
                {
                  context: {
                    type: 'UnclonedBackupJobs',
                    specs: {
                      x: 400,
                      y: 550,
                      height: 100,
                      width: 300
                    }
                  },
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
