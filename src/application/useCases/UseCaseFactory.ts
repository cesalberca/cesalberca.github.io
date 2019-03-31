import { UseCase } from './UseCase'
import { GetAllArticles, GetArticle, GetTalksGiven } from './index'
import { ArticlesFileRepository } from '../../infraestructure/articles/ArticlesFileRepository'
import { Command } from '../../infraestructure/Command'
import { FileLoader } from '../../infraestructure/FileLoader'
import { TranslationService } from '../TranslationService'
import { Translator } from '../../infraestructure/language'

export class UseCaseFactory {
  public static get<T>(useCase: UseCase, context?: any) {
    switch (useCase) {
      case 'GetAllArticles':
        return (new GetAllArticles(
          new ArticlesFileRepository(
            FileLoader.create(),
            TranslationService.create(Translator.create())
          ),
          context.locale
        ) as unknown) as Command<T>
      case 'GetTalksGiven':
        return (new GetTalksGiven() as unknown) as Command<T>
      case 'GetArticle':
        return (new GetArticle(
          new ArticlesFileRepository(
            FileLoader.create(),
            TranslationService.create(Translator.create())
          ),
          context.id,
          context.locale
        ) as unknown) as Command<T>
      default:
        throw new Error(`Use case "${useCase}" not found`)
    }
  }
}
