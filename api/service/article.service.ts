import {ArticleRepository} from "../repository/article.repository";
import {Article} from "../model/article";

export class ArticleService {
  static async getAll(): Promise<Article[]> {
    return ArticleRepository.find({});
  }

  static async get(id: string): Promise<Article | null> {
    return ArticleRepository.findOne({id});
  }

  static async createOrUpdate(article: Article): Promise<any> {
    const existingArticle = await this.get(article.id);
    if (existingArticle) {
      return ArticleRepository.updateOne({id: article.id}, article);
    } else {
      return ArticleRepository.create(article);
    }
  }

  static async delete(id: string): Promise<any> {
    return ArticleRepository.deleteOne({id});
  }
}
