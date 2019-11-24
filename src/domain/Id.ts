import { EncoderService } from './EncoderService'
import { ContainerFactory } from '../ContainerFactory'
import { ENCODER_SERVICE_TYPE } from '../types'

export class Id {
  constructor(private readonly _value: string, private readonly encoderService: EncoderService) {}

  static fromValue(value: string) {
    return new Id(value, ContainerFactory.get().container.get<EncoderService>(ENCODER_SERVICE_TYPE))
  }

  get slug() {
    return this.encoderService.encode(this._value.toLowerCase())
  }

  get value() {
    return this._value
  }
}
