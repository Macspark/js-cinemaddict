import ApiService from '../framework/api-service.js';
import { RequestMethod } from '../const.js';

export default class CommentsApiService extends ApiService {
  getMovieComments = (movieId) => {
    const response = this._load({url: `comments/${movieId}`}).then(ApiService.parseResponse);
    return response;
  };

  addCommentToMovie = async (movieId, comment) => {
    const response = await this._load({
      url: `comments/${movieId}`,
      method: RequestMethod.POST,
      body: JSON.stringify(this.#adaptToServer(comment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  removeCommentFromMovie = async (commentId) => {
    await this._load({
      url: `comments/${commentId}`,
      method: RequestMethod.DELETE,
      headers: new Headers({'Content-Type': 'application/json'}),
    });
  };

  #adaptToServer = (comment) => {
    const adaptedComment = {...comment,
      'comment': comment.text,
    };

    delete adaptedComment.text;

    return adaptedComment;
  };
}
