import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createNewCommentPopupTemplate = (newComment) => {
  const {
    text = null,
    emoji = null
  } = newComment;

  const emojiImage = emoji
    ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`
    : '';

  const newCommentLayout = `
    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">
        ${emojiImage}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text ? text : ''}</textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${emoji === 'smile' ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${emoji === 'sleeping' ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${emoji === 'puke' ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${emoji === 'angry' ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>`;

  return newCommentLayout;
};

export default class PopupCommentsView extends AbstractStatefulView {
  constructor(state) {
    super();
    this.#setInnerHandlers();
    this._setState(state);
  }

  get template() {
    return createNewCommentPopupTemplate(this._state);
  }

  get state() {
    return this._state;
  }

  restoreState = (state) => {
    this.updateElement(state);
  };

  setCommentSubmitHandler = (callback) => {
    this._callback.submitComment = callback;
    this.element.addEventListener('keydown', this.#onCtrlEnterKeyDown);
  };

  #onCtrlEnterKeyDown = (evt) => {
    if (evt.ctrlKey && evt.keyCode === 13) {
      evt.preventDefault();
      this.#commentSubmitHandler();
    }
  };

  #commentSubmitHandler = () => {
    const newComment = this._state;
    this._callback.submitComment(newComment);
  };

  #newCommentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      text: evt.target.value
    });
  };

  #emojiClickHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.updateElement({
      emoji: evt.target.value,
    });
  };

  _restoreHandlers = () => {
    this.setCommentSubmitHandler(this._callback.submitComment);
    this.#setInnerHandlers();
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#emojiClickHandler);

    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#newCommentInputHandler);
  };
}