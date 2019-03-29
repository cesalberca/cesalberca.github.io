import { Translation } from './Translation'
import { TranslationIdentifiers } from './TranslationIdentifiers'

export const es: Translation = new Map<keyof TranslationIdentifiers, string>([
  ['home_title', 'Inicio'],
  ['home_recentArticles', 'Artículos recientes'],
  ['article_title', 'Artículos'],
  ['about_title', 'Acerca de mí'],
  [
    'about_description',
    "I'm a young programmer very interested in good practices, architecture, testing and SOLID principles. I work at [Autentia](https://www.autentia.com/) as a frontend developer (Vue, React, TypeScript, JavaScript, HTML, CSS, etc) although I have worked a bit in Java and Android. I'm continuously on the lookout for things to read, learn and [share](https://www.adictosaltrabajo.com/author/calberca/). I've talked at [JSDay Madrid](https://www.youtube.com/watch?v=aNf1Oos0ZB8&t=1s), Codenares 2018 and 2019, [Ritsi](https://www.youtube.com/watch?v=SuykoyC0T74&t=1s) and several internal talks at my company, like [this one](https://www.youtube.com/watch?v=RFQy-ud8Ec4&t=4477s)."
  ],
  ['talks_title', 'Charlas'],
  ['talks_talkTitle', 'Title'],
  ['talks_talkAbstract', 'Descripción'],
  ['talks_talkTopics', 'Temas'],
  ['talks_talkDifficulty', 'Dificultad'],
  ['talks_talkLength', 'Duración'],
  ['talks_talkDifficultyAdvanced', 'Avanzado'],
  ['talks_talkDifficultyIntermediate', 'Intermedio'],
  ['talks_talkDifficultyEasy', 'Fácil']
])