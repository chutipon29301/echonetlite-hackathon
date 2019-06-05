import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IotDataDto } from '../iot-kit/dto/iot-data.dto';

@Injectable()
export class SearchService {
    constructor(private readonly elasticsearchService: ElasticsearchService) { }
    public saveIotElastic(iotKitData: IotDataDto) {
        this.elasticsearchService.bulk({
            body: [
              // action description
              { index:  { _index: new Date(), _type: 'mytype', _id: 1 } },
               // the document to index
              { title: 'foo' },
              // action description
              { update: { _index: 'myindex', _type: 'mytype', _id: 2 } },
              // the document to update
              { doc: { title: 'foo' } },
            ],
          });
    }
    // public saveEchonetElastic(iotKitData: IotDataDto) {

    // }
}

