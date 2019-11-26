import { Command } from '../../domain/Command'
import { TYPES } from '../../types'
import { inject, injectable } from 'inversify'
import { Locale } from '../../domain/language/Locale'
import { Article } from '../../domain/articles/Article'
import { ArticlesRepository } from '../../domain/articles/ArticlesRepository'
import { Id } from '../../domain/Id'

@injectable()
export class GetArticleUseCase implements Command<Article, { id: Id; locale: Locale }> {
  constructor(
    @inject(TYPES.ARTICLES_REPOSITORY_TYPE) private readonly articlesRepository: ArticlesRepository
  ) {}

  async execute({ id, locale }: { id: Id; locale: Locale }): Promise<Article> {
    return this.articlesRepository.findOneByLocale(id, locale)
  }
}
