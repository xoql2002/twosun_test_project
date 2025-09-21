import {Controller} from '@nestjs/common';
import { RetweetsService } from './retweets.service';

@Controller('retweets')
export class RetweetsController {
  constructor(private retweetsService: RetweetsService) {}
}
