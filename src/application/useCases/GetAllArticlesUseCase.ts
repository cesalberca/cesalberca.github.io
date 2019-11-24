import { Command } from '../../infraestructure/Command'
import { TYPES } from '../../types'
import { inject, injectable } from 'inversify'
import { Locale } from '../../domain/language/Locale'
import { Article } from '../../domain/articles/Article'
import { ArticlesRepository } from '../../domain/articles/ArticlesRepository'

@injectable()
export class GetAllArticlesUseCase implements Command<Article[], { locale: Locale }> {
  constructor(
    @inject(TYPES.ARTICLES_REPOSITORY_TYPE) private readonly articlesRepository: ArticlesRepository
  ) {}

  async execute({ locale }: { locale: Locale }): Promise<Article[]> {
    const articles = await this.articlesRepository.findAllByLocale(locale)
    return articles.slice().sort((articleA, articleB) => (articleB.date < articleA.date ? -1 : 1))
  }
}
