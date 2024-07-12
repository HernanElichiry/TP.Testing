import { Module } from '@nestjs/common';

import { CaballerosController } from './caballeros/caballeros.controller';
import { CaballerosService } from './caballeros/caballeros.service'; 
import { RandomController } from './random/random.controller';
import { RandomService } from './random/random.service';

@Module({
  imports: [],
  controllers: [CaballerosController, RandomController ],
  providers: [CaballerosService, RandomService],
})
export class AppModule {}
