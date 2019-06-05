import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [ElasticsearchModule.register({
    host: 'localhost:9200',
    log: 'trace',
  })],
  providers: [SearchService],
})
export class SearchModule { }
