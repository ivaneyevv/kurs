class Posts {
  constructor(postForm, postContainer) {
    this.postForm = postForm;
    this.postContainer = postContainer;
  }

  init = () => {
    this.postForm.addEventListener('submit', this.createPost);
    this.postContainer.addEventListener('click', this.deletePost);
    this.postContainer.addEventListener('click', this.editPost);
  }

  createPost = (event) => {
    event.preventDefault();

    if (event.target.querySelector('.form-submit').classList.contains('edit-submit')) {
      this.applyChanges();

      return;
    }

    const now = new Date();

    // use this.getFormElems() method
    const elems = {};
    const elemsArray = [...event.target.elements];
    elemsArray.forEach((element) => {
      if (!element.id) {
        return;
      }

      elems[element.id] = element.value;
    });

    const contentElem = this.createPostElement('div', 'post-container');
    const titleElem = this.createPostElement('h3', 'post-title');
    const bodyElem = this.createPostElement('p', 'post-body');
    const timeElem = this.createPostElement('p', 'post-time');
    const delButton = this.createPostElement('button', 'delete');
    const editButton = this.createPostElement('button', 'edit');

    titleElem.innerHTML = elems.title;
    bodyElem.innerHTML = elems.body;
    delButton.innerHTML = 'Удалить';

    const monthes = {
      0: 'Jen',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr'
    };
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    timeElem.innerHTML = `Created at: ${date}-${monthes[month]}-${year}`;

    contentElem.append(titleElem);
    contentElem.append(bodyElem);
    contentElem.append(timeElem);
    contentElem.append(delButton);

    this.postContainer.append(contentElem);
    this.postForm.reset();
  }

  editPost = (event) => {
    if (!event.target.classList.contains('edit')) {
      return;
    }

    event
      .target
      .parentNode.classList.add('post-to-edit');

    const postTitleValue =
      event
      .target
      .parentNode
      .querySelector('.post-title')
      .innerHTML;

    const postBodyValue =
      event
      .target
      .parentNode
      .querySelector('.post-body')
      .innerHTML;

    const formTitleElem =
      this
      .postForm
      .querySelector('input[name="title"]');

    const formBodyElem =
      this
      .postForm
      .querySelector('textarea[name="body"]');

    document
      .querySelector('.form-title')
      .innerHTML =
      `Edit Post with title ${postTitleValue}`;

    const button = document.querySelector('.form-submit');
    button.value = 'Save Post';

    formTitleElem.value = postTitleValue;
    formBodyElem.value = postBodyValue;
  }

  deletePost = (event) => {
    if (!event.target.classList.contains('delete')) {
      return;
    }

    event.target.parentNode.remove();
  }

  createPostElement = (tag, className) => {
    const elem = document.createElement(tag);
    if (className) {
      elem.classList.add(className);
    }

    return elem;
  }

  applyChanges = () => {
    const timeElem = postContainer.querySelector('.post-time');
    const title = postContainer.querySelector('.post-title');
    const body = postContainer.querySelector('.post-body');

    title.innerHTML = this.postForm.elements[0].value;
    body.innerHTML = this.postForm.elements[1].value;

    document
      .querySelector('.form-title')
      .innerHTML = 'Отправить';

    const button = document.querySelector('.form-submit');
    button.value = 'Отправить';
    const now = new Date();
    const monthes = {
      0: 'Jen',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr'
    };
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    timeElem.innerHTML = `Updated at: ${date}-${monthes[month]}-${year}`;

    this.postForm.reset();
  }

   getFormElems = (form) => {
   const elems = {};
   const elemsArray = [...event.target.elements];
   elemsArray.forEach((element) => {
   if (!element.id) {
     return;
    }

     elems[element.id] = element.value;
    });

    return elems;
   }
}

const posts = new Posts(
  document.querySelector('.post-form'),
  document.querySelector('.contain'),
);

posts.init();
